import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { getRow } from "../../../../../../../../../mocks/ordersTable/row";
import { TableContext } from "../../../../../../TableContext/TableContext";
import { initValue } from "../../../../../../../../../mocks/ordersTable/context";
import { DateCell, getLocalDate } from "./DateCell";

describe("DateCell", () => {
  const row = getRow();
  const BaseComponent = ({
    isHidden,
    bgSpecial
  }: {
    isHidden?: boolean;
    bgSpecial?: "dark" | "light";
  }) => {
    return (
      <TableContext.Provider value={{ ...initValue, row }}>
        <DateCell
          name={"createdAt"}
          isHidden={isHidden}
          bgSpecial={bgSpecial}
        />
      </TableContext.Provider>
    );
  };
  it("getLocalDate function", () => {
    const date = "2022-06-07T01:35:44.407Z";
    const res = "07.06.2022, 04:35:44";
    expect(getLocalDate(date)).toEqual(res);
  });
  it.each`
    isHidden     | bgSpecial
    ${true}      | ${"dark"}
    ${undefined} | ${"light"}
    ${false}     | ${undefined}
  `("renders correct", ({ isHidden, bgSpecial }) => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    render(<BaseComponent isHidden={isHidden} bgSpecial={bgSpecial} />);
    const elt = screen.getByText(getLocalDate(row.createdAt));
    expect(elt).toBeInTheDocument();
    if (isHidden) expect(elt).not.toBeVisible();
    else expect(elt).toBeVisible();
    if (bgSpecial === "dark" && typeof isHidden === "boolean")
      expect(elt).toHaveStyle("background-color: hsla(152, 34%, 26%, .04)");
    else if (bgSpecial === "light" && typeof isHidden === "boolean")
      expect(elt).toHaveStyle("background-color: hsla(152, 34%, 26%, .02)");
  });
});
