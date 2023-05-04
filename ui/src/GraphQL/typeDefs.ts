import { gql } from "graphql-tag";
export enum SortDirection {
  ASCENDING = "ASCENDING",
  DESCENDING = "DESCENDING"
}
export enum SortableOrderField {
  _id = "_id",
  orderNumber = "orderNumber",
  serviceId = "serviceId",
  serviceName = "serviceName",
  name = "name",
  phone = "phone",
  email = "email",
  subscriber = "subscriber",
  price = "price",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  status = "status",
  description = "description"
}
export enum StatusVars {
  accepted = "accepted",
  confirmed = "confirmed",
  inWork = "inWork",
  done = "done",
  cancel = "cancel"
}
export type Cardservice = {
  id: string;
  position: number;
  available: boolean;
  sku: string;
  name: string;
  srcImg?: string;
  slug: string;
  describe: string;
  price: number;
  tags: string[];
  orderCount: number;
  createdAt?: string;
  updatedAt?: string;
};
export type Order = {
  _id: string;
  orderNumber: string;
  service: Cardservice;
  name: string;
  phone: string;
  email: string;
  subscriber: boolean;
  description: string;
  status: StatusVars;
  createdAt: string;
  updatedAt: string;
  isHidden?: boolean;
};
export type OrderFeed = {
  orders: Order[];
  totalOrders: number;
};
export type UserInfo = {
  user: User;
  firstName?: string;
  secondName?: string;
  city?: string;
  workPlace?: string;
};
export type UserAccess = {
  level: number;
  group: string[];
};
export type User = {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  status: string;
  access: UserAccess;
  info: UserInfo;
};
export type Feature = {
  id: string;
  title: string;
  icon: string;
  description: string;
};
export type Callorder = {
  id: string;
  name: string;
  phone: string;
  email: string;
  subscriber: boolean;
  describe: string;
  createdAt: string;
};
export type Cite = {
  id: string;
  content: string;
  random: number;
};
export type DayVisitStat = {
  dayOfYear: number;
  year: number;
  hits: number;
  clients: number;
};
export type DayOrderStat = {
  dayOfYear: number;
  year: number;
  orders?: number;
  calls?: number;
};
export type ServerError = {
  id: string;
  message: string;
  place: string;
  stack: string;
  addition: string;
};

export const typeDefs = gql`
  scalar DateTime
  scalar Upload

  enum SortDirection {
    ASCENDING
    DESCENDING
  }

  enum SortableOrderField {
    orderNumber
    serviceId
    serviceName
    name
    phone
    email
    subscriber
    price
    createdAt
    updatedAt
    status
    description
  }

  enum StatusVars {
    accepted
    confirmed
    inWork
    done
    cancel
  }

  type Cardservice {
    id: ID!
    position: Int!
    available: Boolean!
    sku: String!
    name: String!
    srcImg: String
    slug: String!
    describe: String!
    price: Int!
    tags: [String]
    orderCount: Int!
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Feature {
    id: ID!
    title: String
    icon: String
    description: String
  }

  type Callorder {
    id: ID!
    name: String!
    phone: String!
    email: String
    subscriber: Boolean
    describe: String
    createdAt: DateTime
  }

  type Order {
    _id: ID!
    orderNumber: String!
    service: Cardservice!
    name: String!
    phone: String!
    email: String!
    subscriber: Boolean!
    description: String!
    status: StatusVars!
    createdAt: DateTime!
    updatedAt: DateTime!
    isHidden: Boolean
  }
  input OrderFilter {
    onPage: Int!
    textSearch: String
  }
  input OrderSort {
    sort: SortDirection = ASCENDING
    sortBy: SortableOrderField = orderNumber
  }
  type OrderFeed {
    orders: [Order]!
    totalOrders: Int!
  }
  type Cite {
    id: ID!
    content: String
    random: Int
  }

  type DayVisitStat {
    dayOfYear: Int!
    year: Int!
    hits: Int!
    clients: Int!
  }

  type VisitsStatistic {
    stat: [DayVisitStat]
    totalHits: Int!
    totalClients: Int!
  }

  type DayOrderStat {
    dayOfYear: Int!
    year: Int!
    orders: Int
    calls: Int
  }

  type OrdersStatistic {
    stat: [DayOrderStat]
    totalOrders: Int!
    totalCalls: Int!
  }

  input DateInput {
    year: Int!
    month: Int!
  }

  type ServerError {
    id: ID!
    message: String
    place: String
    stack: String
    addition: String
  }

  type User {
    id: ID!
    """
    The user's unique username
    """
    username: String!
    """
    The user's unique email
    """
    email: String
    """
    A url for the user's profile photo
    """
    avatar: String
    """
    Define user roles and accsses
    """
    access: UserAccess!
    """
    A ref for user informaton document
    """
    info: UserInfo
  }
  """
  User's access level and group
  """
  type UserAccess {
    level: Int
    group: [String]
  }
  """
  User's additionly information
  """
  type UserInfo {
    firstName: String
    secondName: String
    city: String
    workPlace: String
    birthday: DateTime
    skills: [String]
    hobbies: [String]
  }
  """
  Root Query type
  """
  type Query {
    getCards(idx: String, isAll: Boolean): [Cardservice]
    getFeatures: [Feature]
    getRandomCite: Cite!

    getCallorders: [Callorder]
    getSubscribers: [String]
    getOrdersFeed(
      cursor: Int
      sorting: OrderSort
      filter: OrderFilter!
    ): OrderFeed

    getVisits(from: DateInput!, to: DateInput!): VisitsStatistic
    getOrdersStat(from: DateInput!, to: DateInput!): OrdersStatistic

    user(username: String!): User
    me: User
    isLoggedIn: Boolean!
  }
  """
  Root Mutation type
  """
  type Mutation {
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String!, password: String!): String!
    changeUserPassword(newPassword: String!, password: String!): String!
    changeUserLogin(
      username: String
      email: String
      password: String!
    ): Boolean!
    changeUserInfo(
      firstName: String
      secondName: String
      city: String
      workPlace: String
      birthday: DateTime
      skills: [String]
      hobbies: [String]
    ): Boolean!
    changeUserAvatar(file: Upload!): User!
    deleteUser(password: String!): Boolean!

    addOrder(
      sku: String!
      name: String!
      email: String!
      subscriber: Boolean!
      phone: String!
      description: String!
      promocode: String
    ): Boolean!
    updateOrder(
      id: ID!
      sku: String!
      name: String!
      email: String!
      subscriber: Boolean!
      phone: String!
      description: String!
      promocode: String
    ): Order!
    changeOrderStatus(id: ID!, status: StatusVars!): Order!
    deleteOrder(id: ID!): Boolean!
    addCallorder(
      name: String!
      phone: String!
      email: String
      subscriber: Boolean
      describe: String
    ): Boolean!
    sendMailTo(describe: String!, mails: [String]): Boolean!

    upsertCard(
      file: Upload
      available: Boolean!
      name: String!
      slug: String!
      describe: String!
      price: Int!
      tags: [String]
      position: Int
    ): Cardservice!
    deleteCard(idx: ID!): Boolean!
    uploadImage(file: Upload!): String!
  }
`;
