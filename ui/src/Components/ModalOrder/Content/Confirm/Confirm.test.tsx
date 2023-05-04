import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { GetServiceCardType } from "../../../../GraphQL/Query";
import { serviceCardResp } from "../../../../mocks/responses/responses";
import { Confirm, ConfirmProps } from "./Confirm";

describe("Confirm", () => {
  const mocks: MockedResponse<GetServiceCardType["GetServiceCard"]>[] = [
    serviceCardResp
  ];
  const values: ConfirmProps["values"] = {
    content: "test content",
    checkbox: "true",
    email: "test@mail.com",
    phone: "89995556644",
    name: "Test Name"
  };
  const BaseComponent = ({ isCheck }: { isCheck: boolean }) => (
    <MockedProvider mocks={mocks}>
      <Confirm
        values={isCheck ? values : { ...values, checkbox: "false" }}
        sku={"SKU001"}
      />
    </MockedProvider>
  );
  it("renders correct", async () => {
    render(<BaseComponent isCheck={true} />);
    expect(await screen.getByText(/подтвердите/i)).toBeInTheDocument();
    expect(screen.getByText(values.name, { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText(values.phone, { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByText("да", { exact: false })).toBeInTheDocument();
  });
  it("not checked state", async () => {
    render(<BaseComponent isCheck={false} />);
    expect(await screen.getByText("нет", { exact: false })).toBeInTheDocument();
  });
});
