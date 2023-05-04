import * as S from "./Styles";
import { Spinner } from "../../../Spinner/Spinner";
import { useQuery } from "@apollo/client";
import {
  GET_SERVICE_CARD,
  GetServiceCardType
} from "../../../../GraphQL/Query";
import { _GET_SERVICE_CARD } from "../../../../GraphQL/TestQuery";

type DescribeServiceProps = {
  idx: string;
};

const query =
  process.env.NODE_ENV === "test" ? _GET_SERVICE_CARD : GET_SERVICE_CARD;

export const DescribeService = ({ idx }: DescribeServiceProps) => {
  const { data, loading, error } = useQuery<
    GetServiceCardType["GetServiceCard"],
    GetServiceCardType["GetServiceCardVars"]
  >(query, {
    variables: { idx }
  });
  if (loading) return <Spinner />;
  if (error || !data || !data.getCards.length)
    return (
      <S.ErrorDescribe>
        <strong>Произошла ошибка.</strong> Данные не получены.
      </S.ErrorDescribe>
    );
  return (
    <>
      <S.HeadingTitle data-testid={idx + "title"}>
        {data.getCards[0].name}
      </S.HeadingTitle>
      <p>{data.getCards[0].slug}</p>
      <p>{data.getCards[0].describe}</p>
      <p>Цена от {data.getCards[0].price}$</p>
    </>
  );
};
