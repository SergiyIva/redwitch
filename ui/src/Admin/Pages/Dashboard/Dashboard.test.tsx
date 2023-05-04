import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "./Dashboard";
import { MockedProvider } from "@apollo/client/testing";
import { callordersResp } from "../../../mocks/responses/responses";
import { BrowserRouter } from "react-router-dom";

describe("Dashboard component", () => {
  it("should renders without crashing", () => {
    render(
      <MockedProvider mocks={[callordersResp]}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </MockedProvider>
    );
    expect(
      screen.getByRole("heading", { name: /панель управления/i })
    ).toBeInTheDocument();
  });
});
