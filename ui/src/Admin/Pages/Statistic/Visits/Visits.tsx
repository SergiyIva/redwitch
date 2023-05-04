import { VisitsChart } from "./VisitsChart";
import { Spinner } from "../../../../Components/Spinner/Spinner";
import { ErrorQueryAdmin } from "../../../../Components/ErrorQuery/ErrorQueryAdmin";
import { useQuery } from "@apollo/client";
import { GET_VISITS_STAT, GetVisitsStatType } from "../../../../GraphQL/Query";

export type StatProps = {
  from: Date;
  to: Date;
  isGtMonth?: boolean;
};

export const Visits = ({ from, to, isGtMonth = true }: StatProps) => {
  const { data, loading, error } = useQuery<
    GetVisitsStatType["GetVisitsStat"],
    GetVisitsStatType["GetVisitsStatVars"]
  >(GET_VISITS_STAT, {
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

  if (loading) return <Spinner />;
  if (error) return <ErrorQueryAdmin error={error} />;
  if (!data || !data.getVisits.stat.length)
    return <div>Нет данных за данный временной период.</div>;
  return (
    <>
      <VisitsChart
        data={data.getVisits.stat}
        from={from}
        to={to}
        isGtMonth={isGtMonth}
      />
      <div>Всего посещений: {data.getVisits.totalHits}</div>
      <div>Всего уникальных пользователей: {data.getVisits.totalClients}</div>
    </>
  );
};
