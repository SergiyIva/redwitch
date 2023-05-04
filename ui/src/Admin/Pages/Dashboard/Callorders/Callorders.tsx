import { useQuery } from "@apollo/client";
import { GET_CALLORDERS, GetCallorders } from "../../../../GraphQL/Query";
import { Spinner } from "../../../../Components/Spinner/Spinner";
import { Callorder } from "./Callorder/Callorder";
import { ErrorQueryAdmin } from "../../../../Components/ErrorQuery/ErrorQueryAdmin";

export const Callorders = () => {
  const { data, loading, error } = useQuery<GetCallorders>(GET_CALLORDERS);

  if (loading) return <Spinner />;
  if (error) return <ErrorQueryAdmin error={error} />;
  return (
    <>
      <h2>Последние контакты</h2>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Дата</th>
              <th scope="col">Имя</th>
              <th scope="col">Телефон</th>
              <th scope="col">Email</th>
              <th scope="col">Описание</th>
            </tr>
          </thead>
          <tbody>
            {data && data.getCallorders.length ? (
              data.getCallorders.map((o) => <Callorder order={o} key={o.id} />)
            ) : (
              <tr>
                <td colSpan={5}>Нет контактов.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
