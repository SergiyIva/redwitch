import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { ItemsWrapper } from "./ItemsWrapper";
import { fakeFeatures } from "../../../../../mocks/features/features";

beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

it("ItemsWrapper render correct", () => {
  const allIcons = ["date", "price", "supp", "qual", "tech", "love"];
  const mockData = fakeFeatures(allIcons);
  const screen = render(<ItemsWrapper items={mockData} />);
  allIcons.forEach((icon) => {
    expect(screen.getByTestId(icon)).toBeInTheDocument();
  });
});
