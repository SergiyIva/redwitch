import { useQuery } from "@apollo/client";
import {
  GET_SERVICE_CARD,
  GetServiceCardType
} from "../../../../GraphQL/Query";
import * as S from "./Styles";

export type ConfirmProps = {
  values: {
    phone: string;
    name: string;
    checkbox: string;
    email: string;
    content: string;
  };
  sku: string;
};
export const Confirm = ({ values, sku }: ConfirmProps) => {
  const { data } = useQuery<
    GetServiceCardType["GetServiceCard"],
    GetServiceCardType["GetServiceCardVars"]
  >(GET_SERVICE_CARD, {
    variables: { idx: sku },
    fetchPolicy: "cache-first"
  });
  return (
    <div>
      <S.Heading>Подтвердите введенную информацию</S.Heading>
      <p>
        Выбранная услуга: <br />
        {data?.getCards[0].name}
      </p>
      <p>
        Имя: <br />
        {values.name}
      </p>
      <p>
        Телефон: <br />
        {values.phone}
      </p>
      <p>
        Email: <br />
        {values.email}
      </p>
      <p>
        Подписка на рассылку: <br />
        {values.checkbox === "true" ? "да" : "нет"}
      </p>
      <p>
        Описание работы: <br />
        {values.content}
      </p>
    </div>
  );
};
