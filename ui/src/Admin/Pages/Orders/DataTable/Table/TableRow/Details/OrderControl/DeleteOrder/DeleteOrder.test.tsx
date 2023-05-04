import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider } from "@apollo/client/testing";
import { TableContext } from "../../../../../../TableContext/TableContext";
import { initValue } from "../../../../../../../../../mocks/ordersTable/context";
import { getRow } from "../../../../../../../../../mocks/ordersTable/row";
import { DeleteOrder } from "./DeleteOrder";

describe("DeleteOrder", () => {
  const row = getRow();
  it("correct renders", () => {
    render(
      <MockedProvider>
        <TableContext.Provider value={{ ...initValue, row }}>
          <DeleteOrder />
        </TableContext.Provider>
      </MockedProvider>
    );
    expect(
      screen.getByRole("button", { name: /удалить/i })
    ).toBeInTheDocument();
  });
});
