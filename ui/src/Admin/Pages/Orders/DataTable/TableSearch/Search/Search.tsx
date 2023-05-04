import * as S from "./Styles";
import { FaSearch } from "react-icons/fa";
import { useInput } from "../../../../../../Hooks/useInput";
import { useApolloClient } from "@apollo/client";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { GET_ORDERS, GetOrdersType } from "../../../../../../GraphQL/Query";
import { Order } from "../../../../../../GraphQL/typeDefs";
import { debounce } from "lodash";
import { getLocalDate } from "../../Table/TableRow/TableCell/Cells/DateCell/DateCell";
import { getStatus } from "../../Table/TableRow/TableCell/Cells/StatusCell/StatusCell";
import { TableContext } from "../../../TableContext/TableContext";
import { _GET_ORDERS } from "../../../../../../GraphQL/TestQuery";

const query = process.env.NODE_ENV === "test" ? _GET_ORDERS : GET_ORDERS;
export const Search = () => {
  const { varsObj } = useContext(TableContext);
  const [valueInput] = useInput("");
  const client = useApolloClient();
  const makeFilter = useCallback(
    (v: string) => {
      const data = client.readQuery<
        GetOrdersType["GetOrders"],
        GetOrdersType["GetOrdersVars"]
      >({
        query,
        variables: varsObj
      });
      if (!data) return;
      const pureData = data.getOrdersFeed.orders.map((o: Order) => {
        return {
          ...o,
          status: getStatus(o.status),
          createdAt: getLocalDate(o.createdAt),
          updatedAt: getLocalDate(o.updatedAt),
          subscriber: o.subscriber ? "Да" : "Нет",
          serviceId: o.service.sku,
          serviceName: o.service.name,
          price: o.service.price,
          service: null
        };
      });
      const filteredOrders = data.getOrdersFeed.orders.map(
        (o: Order, i: number) => {
          let orderData = Object.values(pureData[i]).toString();
          return orderData.toLowerCase().includes(v)
            ? { ...o, isHidden: false }
            : {
                ...o,
                isHidden: true
              };
        }
      );

      const newData = {
        getOrdersFeed: {
          ...data.getOrdersFeed,
          orders: filteredOrders
        }
      };
      client.cache.writeQuery({
        query,
        variables: varsObj,
        data: newData
      });
    },
    [varsObj]
  );
  // memorized знач. чтобы не создавалось новых сущностей ф-ии при каждом
  // новом обновлении (=> не сбрасывался счетчик задержки)
  const debouncedFn = useMemo(
    () =>
      debounce((v: string) => {
        makeFilter(v);
      }, 300),
    []
  );

  const onType = (e: React.ChangeEvent<HTMLInputElement>) => {
    valueInput.onChange(e);
    const v = e.target.value;
    debouncedFn(v);
  };

  useEffect(() => {
    return () => {
      const data = client.readQuery<
        GetOrdersType["GetOrders"],
        GetOrdersType["GetOrdersVars"]
      >({
        query,
        variables: varsObj
      });
      if (!data) {
        console.error(
          "Данные о заказах не были очищены от фильтра, так как не были получены из кэша!"
        );
        return;
      }
      const clearOrders = data.getOrdersFeed.orders.map((o: Order) => ({
        ...o,
        isHidden: false
      }));

      const newData = {
        getOrdersFeed: {
          ...data.getOrdersFeed,
          orders: clearOrders
        }
      };
      client.cache.writeQuery({
        query,
        variables: varsObj,
        data: newData
      });
    };
  }, []);

  return (
    <div className="col-sm-12 col-md-6 d-flex align-items-center justify-content-start">
      <div id="dt-basic-example_filter" className="dataTables_filter">
        <S.SearchWrapper className="input-group">
          <S.SpanSearch className="input-group-text">
            <FaSearch />
          </S.SpanSearch>
          <input
            type="search"
            className="form-control"
            placeholder="Поиск по результатам"
            aria-label="Search"
            name="SEARCH"
            value={valueInput.value}
            onChange={onType}
          />
        </S.SearchWrapper>
      </div>
    </div>
  );
};
