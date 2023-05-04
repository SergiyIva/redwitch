import { gql } from "@apollo/client";

export const _UPDATE_ORDER = gql`
  mutation UpdateOrder(
    $id: ID!
    $sku: String!
    $name: String!
    $phone: String!
    $email: String!
    $subscriber: Boolean!
    $description: String!
    $promocode: String
  ) {
    updateOrder(
      id: $id
      sku: $sku
      name: $name
      phone: $phone
      email: $email
      subscriber: $subscriber
      description: $description
      promocode: $promocode
    ) {
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
  }
`;
