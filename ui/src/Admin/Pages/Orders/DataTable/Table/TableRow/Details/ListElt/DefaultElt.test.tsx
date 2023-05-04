import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { TableContext } from "../../../../../TableContext/TableContext";
import { RowType } from "../../../../../Orders";
import { DefaultElt } from "./DefaultElt";
import { initValue } from "../../../../../../../../mocks/ordersTable/context";
import { getRow } from "../../../../../../../../mocks/ordersTable/row";

const row = getRow();

it.each`
  name
  ${"orderNumber"}
  ${"serviceName"}
  ${"name"}
  ${"email"}
  ${"serviceId"}
  ${"description"}
`("DefaultElt correct renders", ({ name }: { name: keyof RowType }) => {
  render(
    <TableContext.Provider value={{ ...initValue, row }}>
      <DefaultElt name={name} />
    </TableContext.Provider>
  );
  expect(screen.getByText(row[name].toString())).toBeInTheDocument();
});
