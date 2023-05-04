import { ITheme, ThemeEnum } from "../interfaces/styled";
import { DefaultTheme } from "styled-components";

const baseTheme: ITheme = {
  colors: {
    brandGreen: "hsl(152, 69%, 31%)",
    brandGreenValue: "152, 69%, 31%",
    lightGreen: "hsl(152, 69%, 41%)",
    darklyGreen: "hsl(152, 69%, 27%)",
    saturatlessGreen: "hsl(152, 15%, 84%)",
    saturatlessGreenValue: "152, 15%, 84%",
    orange: "hsl(25, 85%, 51%)",
    lightOrange: "hsl(25, 95%, 62%)",
    //blue: "hsl(205, 80%, 42%)",
    lightBlue: "hsl(205, 80%, 59%)",
    // darklyBlue: "hsl(205, 90%, 37%)",
    // darkBlue: "hsl(205, 90%, 15%)",
    // blueShadow: "hsla(205, 80%, 55%, 0.5)",
    lightRed: "hsl(354, 72%, 86%)",
    // lightRedValue: "345, 90%, 65%",
    red: "hsl(355, 61%, 32%)",
    darkRed: "hsl(355, 61%, 26%)",
    darkRedValue: "355, 61%, 26%",
    bgColor: "hsl(152, 0%, 13%)",

    // greyShadow: "hsla(0, 0%, 100%, 0.1)",
    // blackShadow: "hsla(0, 0%, 0%, 0.3)",
    revert: "hsl(0, 0%, 98%)",
    revertValue: "0, 0%, 98%",
    font: "hsl(0, 0%, 5%)",
    fontValue: "0, 0%, 5%"
  },
  media: {
    bigPC: "(min-width: 1200px)",
    PC: "(min-width: 992px)",
    iPad: "(min-width: 768px)",
    bigMobile: "(min-width: 576px)",
    minAnimate: "(prefers-reduced-motion: reduce)"
  },
  durations: {},
  sizes: {},
  order: {
    minus: -1,
    one: 1,
    two: 2,
    three: 3,
    fixed: 20,
    height: 1000,
    action: 1100
  },
  distances: {},

  variables: {}
};

export const lightTheme: DefaultTheme = {
  ...baseTheme,
  type: ThemeEnum.light
};

// TODO добавить темную тему
// export const darkTheme = {
//   ...baseTheme,
//
//   colors: {
//     ...baseTheme.colors,
//     revert: "hsl(0, 0%, 0%)",
//     revertValue: "0, 0%, 0%",
//     font: "hsl(0, 0%, 100%)",
//     fontValue: "0, 0%, 100%"
//   },
//   type: ThemeEnum.dark
// };
