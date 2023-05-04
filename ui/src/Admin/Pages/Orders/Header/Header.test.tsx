import { act, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { Header } from "./Header";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const WithRouter = ({ search }: { search: string }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`orders?search=${search}`);
  }, []);
  return (
    <Routes>
      <Route index element={<div />} />
      <Route path={"orders"} element={<Header />} />
    </Routes>
  );
};
const BaseComponent = ({ search }: { search: string }) => {
  return (
    <BrowserRouter>
      <WithRouter search={search} />
    </BrowserRouter>
  );
};

describe("Header of Table Orders", () => {
  it("renders correct", async () => {
    render(<BaseComponent search={""} />);
    const searchInput = await screen.findByRole("searchbox", {
      name: /search/i
    });
    expect(searchInput).not.toHaveValue();
  });
  it("change search with hold another search values", async () => {
    // не ясно почему, но сохраняются параметры search из предыдущего рендеринга в тесте
    // нашел такое решение - ререндер компонента
    render(
      <BaseComponent search={"12345&sort=asc&sortby=serviceId"} />
    ).rerender(BaseComponent({ search: "12345&sort=asc&sortby=serviceId" }));

    const searchInput = await screen.findByRole("searchbox", {
      name: /search/i
    });
    expect(searchInput).toHaveValue("12345");
    user.clear(searchInput);
    await act(() => new Promise((res) => setTimeout(res, 1600)));
    expect(searchInput).not.toHaveValue();
    user.type(searchInput, "plus");
    await act(() => new Promise((res) => setTimeout(res, 1600)));
    expect(searchInput).toHaveValue("plus");
    expect(window.location.search).toBe(
      "?search=plus&sort=asc&sortby=serviceId"
    );
  });
});
