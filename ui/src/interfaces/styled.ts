// тип css фрагмента
import { FlattenSimpleInterpolation } from "styled-components";

export interface ITheme {
  colors: {
    brandGreen: string;
    brandGreenValue: string;
    lightGreen: string;
    darklyGreen: string;
    saturatlessGreen: string;
    saturatlessGreenValue: string;
    orange: string;
    lightOrange: string;
    lightBlue: string;
    lightRed: string;
    red: string;
    darkRed: string;
    darkRedValue: string;
    bgColor: string;
    font: string;
    fontValue: string;
    revert: string;
    revertValue: string;
  };
  media: {
    bigPC: "(min-width: 1200px)";
    PC: "(min-width: 992px)";
    iPad: "(min-width: 768px)";
    bigMobile: "(min-width: 576px)";
    minAnimate: "(prefers-reduced-motion: reduce)";
  };
  sizes: {
    //maxWidth: number;
  };
  durations: {};
  order: {
    minus: -1;
    one: 1;
    two: 2;
    three: 3;
    fixed: 20;
    height: 1000;
    action: 1100;
  };
  distances: {};
  // opacity: {
  //   main: 0.66;
  //   light: 0.3;
  // };

  variables: {
    [key: string]: any;
  };
}

export enum ThemeEnum {
  light = "light"
  // dark = "dark"
}

// E - элемент enum
export type StyledVariants<E extends string | number> = {
  [key in E]?: FlattenSimpleInterpolation;
};
