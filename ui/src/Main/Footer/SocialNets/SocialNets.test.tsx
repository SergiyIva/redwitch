import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { SocialNets, SocialNetsProps } from "./SocialNets";
import { lightTheme } from "../../../Styles/theme";
import { ThemeProvider } from "styled-components";

it("Description rendering without crashing", () => {
  const data: SocialNetsProps["links"] = [
    {
      name: "testName",
      svg: "vk",
      href: "#"
    },
    {
      name: "youtube",
      svg: "youtube",
      href: "/"
    }
  ];
  const screen = render(
    <ThemeProvider theme={lightTheme}>
      <SocialNets links={data} />
    </ThemeProvider>
  );
  expect(screen.getByRole("heading", { name: /мы в соцсетях/i }));
  expect(screen.getByRole("link", { name: /testname/i }));
  expect(screen.getByRole("link", { name: /youtube/i }));
});
