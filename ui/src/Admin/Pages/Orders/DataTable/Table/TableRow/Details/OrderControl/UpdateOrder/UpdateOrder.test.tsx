import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { TableContext } from "../../../../../../TableContext/TableContext";
import { initValue } from "../../../../../../../../../mocks/ordersTable/context";
import { allServiceCardsResp } from "../../../../../../../../../mocks/responses/responses";
import { getRow } from "../../../../../../../../../mocks/ordersTable/row";
import { UpdateOrder } from "./UpdateOrder";

describe("UpdateOrder", () => {
  const row = getRow();
  const BaseComponent = () => {
    return (
      <BrowserRouter>
        <MockedProvider mocks={[allServiceCardsResp]}>
          <TableContext.Provider value={{ ...initValue, row }}>
            <UpdateOrder />
          </TableContext.Provider>
        </MockedProvider>
      </BrowserRouter>
    );
  };
  it("renders correct", () => {
    render(<BaseComponent />);
    expect(
      screen.getByRole("button", { name: /изменить/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /изменение данных/i, hidden: true })
    ).toBeInTheDocument();
  });
});
