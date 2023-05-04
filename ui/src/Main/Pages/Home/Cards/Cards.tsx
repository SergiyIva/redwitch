import { useQuery } from "@apollo/client";
import {
  GET_SERVICE_CARDS,
  GetServiceCardsType
} from "../../../../GraphQL/Query";
import { Spinner } from "../../../../Components/Spinner/Spinner";
import { CardsWrapper } from "./CardsWrapper";
import { _GET_SERVICE_CARDS } from "../../../../GraphQL/TestQuery";

const query =
  process.env.NODE_ENV === "test" ? _GET_SERVICE_CARDS : GET_SERVICE_CARDS;
export const Cards = () => {
  const { data, error, loading } =
    useQuery<GetServiceCardsType["GetServiceCards"]>(query);

  if (loading) return <Spinner />;
  //TODO экран ошибки запроса пользователя
  if (error) return <div>{error.message}</div>;
  if (!data || !data.getCards.length) return <div>Нет доступных услуг!</div>;
  return <CardsWrapper cards={data.getCards} />;
};
