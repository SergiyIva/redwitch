import { gql } from "@apollo/client";
import { Cardservice, Order, StatusVars } from "./typeDefs";
import { ORDER_DATA, SERVICE_CARD_DATA } from "./Query";

export type SignInType = {
  SignInVars: SignInVars;
  SignIn: SignIn;
};
type SignInVars = {
  username: string;
  password: string;
};
type SignIn = {
  signIn: string;
};
const SIGNIN_USER = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password)
  }
`;

export type AddCallorderType = {
  AddCallorder: AddCallorder;
  AddCallorderVars: AddCallorderVars;
};
type AddCallorder = {
  addCallorder: boolean;
};
type AddCallorderVars = {
  name: string;
  phone: string;
  email?: string;
  subscriber?: boolean;
  describe?: string;
};
const ADD_CALL_ORDER = gql`
  mutation AddCallorder(
    $name: String!
    $phone: String!
    $email: String
    $subscriber: Boolean
    $describe: String
  ) {
    addCallorder(
      name: $name
      phone: $phone
      email: $email
      subscriber: $subscriber
      describe: $describe
    )
  }
`;
export type AddOrderType = {
  AddOrder: AddOrder;
  AddOrderVars: AddOrderVars;
};
type AddOrder = {
  addOrder: boolean;
};
type AddOrderVars = {
  sku: string;
  name: string;
  phone: string;
  email: string;
  subscriber: boolean;
  description: string;
  promocode?: string;
};
const ADD_ORDER = gql`
  mutation AddOrder(
    $sku: String!
    $name: String!
    $phone: String!
    $email: String!
    $subscriber: Boolean!
    $description: String!
    $promocode: String
  ) {
    addOrder(
      sku: $sku
      name: $name
      phone: $phone
      email: $email
      subscriber: $subscriber
      description: $description
      promocode: $promocode
    )
  }
`;
export type UpdateOrderType = {
  UpdateOrder: UpdateOrder;
  UpdateOrderVars: UpdateOrderVars;
};
type UpdateOrder = {
  updateOrder: Order;
};
type UpdateOrderVars = {
  id: string;
  sku: string;
  name: string;
  phone: string;
  email: string;
  subscriber: boolean;
  description: string;
  promocode?: string;
};
const UPDATE_ORDER = gql`
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
      ...order
    }
  }
  ${ORDER_DATA}
`;
export type ChangeOrderStatusType = {
  ChangeOrderStatus: ChangeOrderStatus;
  ChangeOrderStatusVars: ChangeOrderStatusVars;
};
type ChangeOrderStatus = {
  changeOrderStatus: Order;
};
type ChangeOrderStatusVars = {
  id: string;
  status: StatusVars;
};
const CHANGE_ORDER_STATUS = gql`
  mutation ChangeOrderStatus($id: ID!, $status: StatusVars!) {
    changeOrderStatus(id: $id, status: $status) {
      ...order
    }
  }
  ${ORDER_DATA}
`;
export type DeleteOrderType = {
  DeleteOrder: DeleteOrder;
  DeleteOrderVars: DeleteOrderVars;
};
type DeleteOrder = {
  deleteOrder: boolean;
};
type DeleteOrderVars = {
  id: string;
};
const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(id: $id)
  }
`;

export type UpsertCardType = {
  UpsertCard: UpsertCard;
  UpsertCardVars: UpsertCardVars;
};
type UpsertCard = {
  upsertCard: Cardservice;
};
type UpsertCardVars = {
  file?: File;
  available: boolean;
  name: string;
  slug: string;
  describe: string;
  price: number;
  tags: string[];
  position?: number;
};
const UPSERT_CARD = gql`
  mutation UpsertCard(
    $file: Upload
    $available: Boolean!
    $name: String!
    $slug: String!
    $describe: String!
    $price: Int!
    $tags: [String]
    $position: Int
  ) {
    upsertCard(
      file: $file
      available: $available
      name: $name
      slug: $slug
      describe: $describe
      price: $price
      tags: $tags
      position: $position
    ) {
      ...serviceCard
      available
      price
      slug
      tags
    }
  }
  ${SERVICE_CARD_DATA}
`;

export type DeleteCardType = {
  DeleteCard: DeleteCard;
  DeleteCardVars: DeleteCardVars;
};
type DeleteCard = {
  deleteCard: boolean;
};
type DeleteCardVars = {
  idx: string;
};
const DELETE_CARD = gql`
  mutation DeleteCard($idx: ID!) {
    deleteCard(idx: $idx)
  }
`;

export {
  ADD_CALL_ORDER,
  ADD_ORDER,
  UPDATE_ORDER,
  CHANGE_ORDER_STATUS,
  DELETE_ORDER,
  UPSERT_CARD,
  DELETE_CARD,
  SIGNIN_USER
};
