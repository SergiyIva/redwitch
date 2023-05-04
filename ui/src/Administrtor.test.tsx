import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Administrator from "./Administrator";
import { MockedProvider } from "@apollo/client/testing";
import { IS_LOGGED_IN, IsUserLoggedIn } from "./GraphQL/Query";
import { BrowserRouter } from "react-router-dom";
import { ApolloCache, InMemoryCache } from "@apollo/client";

describe("Administrator", () => {
  const logCache = new InMemoryCache();
  const notLogCache = new InMemoryCache();
  logCache.writeQuery<IsUserLoggedIn>({
    query: IS_LOGGED_IN,
    data: {
      isLoggedIn: true
    }
  });
  notLogCache.writeQuery<IsUserLoggedIn>({
    query: IS_LOGGED_IN,
    data: {
      isLoggedIn: false
    }
  });
  const BaseComponent = ({ cache }: { cache: ApolloCache<any> }) => {
    return (
      <MockedProvider cache={cache}>
        <BrowserRouter>
          <Administrator />
        </BrowserRouter>
      </MockedProvider>
    );
  };
  it("renders correct", async () => {
    render(<BaseComponent cache={notLogCache} />);
    expect(document.title).toBe("Управление | Finevideo");
    expect(
      await screen.findByRole("heading", { name: /выполните вход/i })
    ).toBeInTheDocument();
  });
  it("renders with logged in state", async () => {
    render(<BaseComponent cache={logCache} />);
    expect(
      await screen.findByRole("link", { name: /администрирование/i })
    ).toBeInTheDocument();
  });
});
