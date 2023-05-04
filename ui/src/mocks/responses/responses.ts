import { MockedResponse } from "@apollo/client/testing";
import {
  GET_CALLORDERS,
  GET_FEATURES,
  GetCallorders,
  GetFeatures,
  GetServiceCardsType,
  GetServiceCardType
} from "../../GraphQL/Query";
import { fakeFeatures } from "../features/features";
import { fakeCallorders } from "../callorders/callorders";
import { fakeCards } from "../serviceCards/serviceCards";
import { _GET_SERVICE_CARD, _GET_SERVICE_CARDS } from "../../GraphQL/TestQuery";

export class TestError extends Error {
  constructor() {
    super("Test Error");
  }
}

const allIcons = ["date", "price", "supp", "qual", "tech", "love"];
const mockData = fakeFeatures(allIcons);
export const featuresResp: MockedResponse<GetFeatures> = {
  request: {
    query: GET_FEATURES
  },
  result: {
    data: {
      getFeatures: mockData
    }
  }
};
export const callordersResp: MockedResponse<GetCallorders> = {
  request: {
    query: GET_CALLORDERS
  },
  result: {
    data: {
      getCallorders: fakeCallorders(5)
    }
  }
};
const sixCards = fakeCards(6).map((c, i) =>
  i === 0 ? { ...c, sku: "SKU001", name: "sku001" } : c
);
export const serviceCardsResp: MockedResponse<
  GetServiceCardsType["GetServiceCards"]
> = {
  request: {
    query: _GET_SERVICE_CARDS
  },
  result: {
    data: {
      getCards: sixCards
    }
  }
};
export const allServiceCardsResp: MockedResponse<
  GetServiceCardsType["GetServiceCards"]
> = {
  request: {
    query: _GET_SERVICE_CARDS,
    variables: {
      isAll: true
    }
  },
  result: {
    data: {
      getCards: [...sixCards, ...fakeCards(2)]
    }
  }
};
export const serviceCardResp: MockedResponse<
  GetServiceCardType["GetServiceCard"]
> = {
  request: {
    query: _GET_SERVICE_CARD,
    variables: {
      idx: "SKU001"
    }
  },
  result: {
    data: {
      getCards: [sixCards[0]]
    }
  }
};
export const globalMocks: MockedResponse[] = [
  allServiceCardsResp,
  featuresResp,
  callordersResp,
  serviceCardsResp,
  serviceCardResp
];
