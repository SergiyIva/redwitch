import { gql } from "@apollo/client";
import {
  Callorder,
  Cardservice,
  Cite,
  DayOrderStat,
  DayVisitStat,
  Feature,
  Order,
  SortableOrderField,
  SortDirection
} from "./typeDefs";

export const SERVICE_CARD_DATA = gql`
  fragment serviceCard on Cardservice {
    id
    position
    sku
    name
    srcImg
    describe
    orderCount
    createdAt
    updatedAt
  }
`;

export type IsUserLoggedIn = {
  isLoggedIn: boolean;
};
export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
export type GetServiceCardType = {
  GetServiceCard: GetServiceCard;
  GetServiceCardVars: GetServiceCardVars;
};
type GetServiceCard = {
  getCards: Cardservice[];
};
type GetServiceCardVars = {
  idx: string;
};
export const GET_SERVICE_CARD = gql`
  query GetServiceCard($idx: String!) {
    getCards(idx: $idx) {
      ...serviceCard
      available
      price
      tags
      slug
    }
  }
  ${SERVICE_CARD_DATA}
`;

export type GetServiceCardsType = {
  GetServiceCards: GetServiceCards;
  GetServiceCardsVars: GetServiceCardsVars;
};
type GetServiceCards = {
  getCards: Cardservice[];
};
type GetServiceCardsVars = {
  isAll?: boolean;
};

export const GET_SERVICE_CARDS = gql`
  query GetServiceCards($isAll: Boolean) {
    getCards(isAll: $isAll) {
      ...serviceCard
    }
  }
  ${SERVICE_CARD_DATA}
`;

export type GetFeatures = {
  getFeatures: Feature[];
};
export const GET_FEATURES = gql`
  query GetFeatures {
    getFeatures {
      id
      icon
      description
      title
    }
  }
`;

export type GetRandomCite = {
  getRandomCite: Cite;
};
export const GET_RANDOM_CITE = gql`
  query GetRandomCite {
    getRandomCite {
      id
      content
    }
  }
`;

export type GetCallorders = {
  getCallorders: Callorder[];
};
export const GET_CALLORDERS = gql`
  query GetCallorders {
    getCallorders {
      id
      phone
      describe
      createdAt
      email
      name
    }
  }
`;
export const ORDER_DATA = gql`
  fragment order on Order {
    _id
    orderNumber
    service {
      id
      sku
      name
      price
    }
    name
    phone
    email
    subscriber
    createdAt
    updatedAt
    status
    description
    isHidden @client
  }
`;
export type GetOrdersType = {
  GetOrders: GetOrders;
  GetOrdersVars: GetOrdersVars;
};
type GetOrders = {
  getOrdersFeed: {
    orders: Order[];
    totalOrders: number;
  };
};
type GetOrdersVars = {
  cursor?: number;
  sorting?: {
    sort?: SortDirection;
    sortBy?: SortableOrderField;
  };
  filter: {
    onPage: number;
    textSearch?: string;
  };
};
export const GET_ORDERS = gql`
  query GetOrders($cursor: Int, $sorting: OrderSort, $filter: OrderFilter!) {
    getOrdersFeed(cursor: $cursor, sorting: $sorting, filter: $filter) {
      orders {
        ...order
      }
      totalOrders
    }
  }
  ${ORDER_DATA}
`;

export type GetVisitsStatType = {
  GetVisitsStat: GetVisitsStat;
  GetVisitsStatVars: GetStatVars;
};
type GetStatVars = {
  from: {
    year: number;
    month: number;
  };
  to?: {
    year: number;
    month: number;
  };
};
type GetVisitsStat = {
  getVisits: {
    stat: DayVisitStat[];
    totalHits: number;
    totalClients: number;
  };
};
export const GET_VISITS_STAT = gql`
  query GetVisits($from: DateInput!, $to: DateInput!) {
    getVisits(from: $from, to: $to) {
      stat {
        dayOfYear
        year
        clients
        hits
      }
      totalClients
      totalHits
    }
  }
`;

export type GetOrdersStatType = {
  GetOrdersStat: GetOrdersStat;
  GetOrdersStatVars: GetStatVars;
};
type GetOrdersStat = {
  getOrdersStat: {
    stat: DayOrderStat[];
    totalOrders: number;
    totalCalls: number;
  };
};
export const GET_ORDERS_STAT = gql`
  query GetOrdersStat($from: DateInput!, $to: DateInput!) {
    getOrdersStat(from: $from, to: $to) {
      stat {
        dayOfYear
        year
        calls
        orders
      }
      totalCalls
      totalOrders
    }
  }
`;
