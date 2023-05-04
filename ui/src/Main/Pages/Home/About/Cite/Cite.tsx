import { useQuery } from "@apollo/client";
import { GET_RANDOM_CITE, GetRandomCite } from "../../../../../GraphQL/Query";
import { Spinner } from "../../../../../Components/Spinner/Spinner";

export const Cite = () => {
  const { data, loading, error } = useQuery<GetRandomCite>(GET_RANDOM_CITE, {
    fetchPolicy: "network-only"
  });
  if (loading) return <Spinner />;
  if (error) return <div>{error.message}</div>;
  return (
    <div className="pt-3 text-center">
      <h5>Мы сегодня говорим тебе:</h5>
      <blockquote className="blockquote mx-4 pt-3">
        {data && (
          <p key={data.getRandomCite.id}>{data.getRandomCite.content}</p>
        )}
        <footer className="blockquote-footer">
          Немного мудрости от <cite title="Source Title">Finevideo</cite>
        </footer>
      </blockquote>
    </div>
  );
};
