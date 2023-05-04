import { gql } from "@apollo/client";

//TODO на данный момент для тестов лучшей альтернативы фрагментам не нашел
export const _GET_SERVICE_CARD = gql`
  query GetServiceCard($idx: String!) {
    getCards(idx: $idx) {
      id
      position
      sku
      name
      srcImg
      describe
      orderCount
      createdAt
      updatedAt
      available
      price
      tags
      slug
    }
  }
`;

export const _GET_SERVICE_CARDS = gql`
  query GetServiceCards($isAll: Boolean) {
    getCards(isAll: $isAll) {
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
  }
`;

export const _GET_ORDERS = gql`
  query GetOrders($cursor: Int, $sorting: OrderSort, $filter: OrderFilter!) {
    getOrdersFeed(cursor: $cursor, sorting: $sorting, filter: $filter) {
      orders {
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
      totalOrders
    }
  }
`;
