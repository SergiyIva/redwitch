import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { DataTable } from "./DataTable/DataTable";
import { JSXElementConstructor, useMemo } from "react";
import { OrderCell } from "./DataTable/Table/TableRow/TableCell/Cells/OrderCell/OrderCell";
import { SubscriberCell } from "./DataTable/Table/TableRow/TableCell/Cells/SubscriberCell/SubscriberCell";
import { PhoneCell } from "./DataTable/Table/TableRow/TableCell/Cells/PhoneCell/PhoneCell";
import { DateCell } from "./DataTable/Table/TableRow/TableCell/Cells/DateCell/DateCell";
import { StatusCell } from "./DataTable/Table/TableRow/TableCell/Cells/StatusCell/StatusCell";
import { useQuery } from "@apollo/client";
import { GET_ORDERS, GetOrdersType } from "../../../GraphQL/Query";
import { useParams, useSearchParams } from "react-router-dom";
import { Spinner } from "../../../Components/Spinner/Spinner";
import { ErrorQueryAdmin } from "../../../Components/ErrorQuery/ErrorQueryAdmin";
import {
  Cardservice,
  Order,
  SortableOrderField,
  SortDirection
} from "../../../GraphQL/typeDefs";
import { TableSearch } from "./DataTable/TableSearch/TableSearch";
import { TableContext } from "./TableContext/TableContext";
import { _GET_ORDERS } from "../../../GraphQL/TestQuery";
import { TitleAdmin } from "../../../Components/TitleAdmin/TitleAdmin";

export type ColType = {
  name: keyof RowType;
  title: string;
  label: string;
  width: number;
  Cell?: JSXElementConstructor<any>;
};
export type ColsType = ColType[];
export type RowType = {
  _id: Order["_id"];
  orderNumber: Order["orderNumber"];
  serviceId: Cardservice["sku"];
  serviceName: Cardservice["name"];
  name: Order["name"];
  phone: Order["phone"];
  email: Order["email"];
  subscriber: Order["subscriber"];
  price: Cardservice["price"];
  createdAt: Order["createdAt"];
  updatedAt: Order["updatedAt"];
  status: Order["status"];
  description: Order["description"];
};

export type RowsType = RowType[];

// название столбца и компонент ячейки
export const cols: ColsType = [
  {
    name: "orderNumber",
    label: "OrderID",
    title: "ЗаказID",
    width: 105,
    Cell: OrderCell
  },
  {
    name: "serviceId",
    label: "ServiceID",
    title: "УслугаID",
    width: 115
  },
  {
    name: "serviceName",
    label: "Name Service",
    title: "Услуга",
    width: 220
  },
  {
    name: "name",
    label: "Client Name",
    title: "Клиент",
    width: 150
  },
  {
    name: "phone",
    label: "Phone",
    title: "Телефон",
    width: 150,
    Cell: PhoneCell
  },
  {
    name: "email",
    label: "Email",
    title: "Email",
    width: 270
  },
  {
    name: "subscriber",
    label: "Subscriber",
    title: "Подписчик",
    width: 150,
    Cell: SubscriberCell
  },
  {
    name: "price",
    label: "Price",
    title: "Стоимость",
    width: 150
  },
  {
    name: "createdAt",
    label: "Created At",
    title: "Оформлен",
    width: 150,
    Cell: DateCell
  },
  {
    name: "updatedAt",
    label: "Updated At",
    title: "Обновлен",
    width: 150,
    Cell: DateCell
  },
  {
    name: "status",
    label: "Status",
    title: "Статус",
    width: 150,
    Cell: StatusCell
  },
  {
    name: "description",
    label: "Describe of work",
    title: "Описание",
    width: 150
  }
];

export type OnPageType = 10 | 15 | 25 | 50 | 100 | -1;

const query = process.env.NODE_ENV === "test" ? _GET_ORDERS : GET_ORDERS;

const Orders = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const ordersOnPage = (Number(params.onpage) as OnPageType) || 10;
  const textSearch = searchParams.get("search")
    ? (searchParams.get("search") as string)
    : undefined;
  const cursor = Number(params.page) - 1 || 0;
  const sorting = searchParams.get("sortby")
    ? {
        sort:
          searchParams.get("sort") === "dsc"
            ? SortDirection.DESCENDING
            : SortDirection.ASCENDING,
        sortBy: SortableOrderField[searchParams.get("sortby") as keyof RowType]
      }
    : {};

  const varsObj = useMemo(
    () => ({
      cursor,
      sorting,
      filter: {
        onPage: ordersOnPage,
        textSearch
      }
    }),
    [cursor, sorting, ordersOnPage, textSearch]
  );
  const value = { rows: [], cols: [], varsObj };
  const { data, loading, error } = useQuery<
    GetOrdersType["GetOrders"],
    GetOrdersType["GetOrdersVars"]
  >(query, {
    variables: varsObj
  });

  const currentPage = Number(params.page) || 1;
  // data is not empty cos function calls from body of datafull state
  const onPage = () =>
    ordersOnPage < 0 ? data!.getOrdersFeed.totalOrders : ordersOnPage;
  const getFrom = () => {
    const onPageCount = onPage();
    return currentPage * onPageCount - onPageCount + 1;
  };

  if (error) return <ErrorQueryAdmin error={error} />;
  return (
    <>
      <TitleAdmin>Все заказы</TitleAdmin>
      <div className="panel-container show">
        <div className="panel-content">
          <div
            id="dt-basic-example_wrapper"
            className="dataTables_wrapper dt-bootstrap4"
          >
            <TableContext.Provider value={value}>
              <Header />
              <TableSearch />
              {loading ? (
                <Spinner isFullScreen={true} />
              ) : data && data.getOrdersFeed.orders.length ? (
                <>
                  <DataTable
                    rows={data.getOrdersFeed.orders
                      .filter(({ isHidden }) => !isHidden)
                      .map((order) => ({
                        ...order,
                        serviceId: order.service.sku,
                        serviceName: order.service.name,
                        price: order.service.price
                      }))}
                    nonFilterLength={data.getOrdersFeed.orders.length}
                    cols={cols}
                  />
                  <Footer
                    onPage={ordersOnPage}
                    onPageFrom={getFrom()}
                    onPageToMax={currentPage * onPage()}
                    total={data.getOrdersFeed.totalOrders}
                    currentPage={currentPage}
                  />
                </>
              ) : (
                <div>Данные не получены.</div>
              )}
            </TableContext.Provider>
          </div>
        </div>
      </div>
    </>
  );
};
export default Orders;
