import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
// @ts-ignore
import Month, { prevMonth } from "./Month";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { DayVisitStat } from "../../../../GraphQL/typeDefs";
import { faker } from "@faker-js/faker";
import _ from "lodash";
import { GET_VISITS_STAT, GetVisitsStatType } from "../../../../GraphQL/Query";

describe("Month", () => {
  const makeStat = (): DayVisitStat => ({
    // @ts-ignore
    dayOfYear: _.uniqueId(),
    clients: faker.datatype.number(),
    hits: faker.datatype.number()
  });
  const getStats = () => _.range(30).map(() => makeStat());
  const stat = getStats();
  const totalHits = _(stat).map(_.property("hits")).sum();
  const totalClients = _(stat).map(_.property("clients")).sum();
  const vars = {
    from: {
      year: new Date().getFullYear(),
      month: new Date().getMonth()
    },
    to: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1
    }
  };
  const mocks: MockedResponse<GetVisitsStatType["GetVisitsStat"]>[] = [
    {
      request: {
        query: GET_VISITS_STAT,
        variables: vars
      },
      result: {
        data: {
          getVisits: {
            stat,
            totalClients,
            totalHits
          }
        }
      }
    },
    {
      request: {
        query: GET_VISITS_STAT,
        variables: { ...vars, month: prevMonth() }
      },
      result: {
        data: {
          getVisits: {
            stat: [],
            totalClients: 0,
            totalHits: 0
          }
        }
      }
    }
  ];
  const BaseComponent = () => (
    <MockedProvider mocks={mocks}>
      <Month />
    </MockedProvider>
  );
  it("renders correct", async () => {
    render(<BaseComponent />);
    expect(
      screen.getByRole("status", { name: /spinner/i })
    ).toBeInTheDocument();
    const toggler = await screen.findByRole("switch");
    expect(toggler).toBeChecked();
    expect(screen.getByText(totalClients.toString())).toBeInTheDocument();
  });
});
