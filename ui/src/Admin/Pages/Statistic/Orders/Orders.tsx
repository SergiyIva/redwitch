import { StatProps } from "../Visits/Visits";
import { useQuery } from "@apollo/client";
import { GET_ORDERS_STAT, GetOrdersStatType } from "../../../../GraphQL/Query";
import { Spinner } from "../../../../Components/Spinner/Spinner";
import { ErrorQueryAdmin } from "../../../../Components/ErrorQuery/ErrorQueryAdmin";
import { useEffect } from "react";

export const Orders = ({ from, to, isGtMonth = true }: StatProps) => {
  const { data, loading, error } = useQuery<
    GetOrdersStatType["GetOrdersStat"],
    GetOrdersStatType["GetOrdersStatVars"]
  >(GET_ORDERS_STAT, {
    variables: {
      from: {
        year: from.getFullYear(),
        month: from.getMonth()
      },
      to: {
        year: to.getFullYear(),
        month: to.getMonth()
      }
    }
  });

  useEffect(() => console.log(data), [data]);

  if (loading) return <Spinner />;
  if (error) return <ErrorQueryAdmin error={error} />;
  if (!data || !data.getOrdersStat.stat.length)
    return <div>Нет данных за данный временной период.</div>;
  return (
    <>
      <div>Всего заявок: {data.getOrdersStat.totalCalls}</div>
      <div>Всего заказов: {data.getOrdersStat.totalOrders}</div>
    </>
  );
};
