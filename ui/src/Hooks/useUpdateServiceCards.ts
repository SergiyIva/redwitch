import { Cardservice } from "../GraphQL/typeDefs";
import { useApolloClient } from "@apollo/client";
import { GET_SERVICE_CARDS, GetServiceCardsType } from "../GraphQL/Query";

export const useUpdateServiceCards = () => {
  const client = useApolloClient();
  const cards = client.readQuery<
    GetServiceCardsType["GetServiceCards"],
    GetServiceCardsType["GetServiceCardsVars"]
  >({
    query: GET_SERVICE_CARDS,
    variables: {
      isAll: true
    }
  });
  const setCards = (card: Cardservice) => {
    if (!cards) return;
    const newCards: Cardservice[] = [...cards.getCards, card];
    client.cache.writeQuery<
      GetServiceCardsType["GetServiceCards"],
      GetServiceCardsType["GetServiceCardsVars"]
    >({
      query: GET_SERVICE_CARDS,
      data: { getCards: newCards },
      variables: {
        isAll: true
      }
    });
  };
  return setCards;
};
