import "styled-components";

import { ITheme } from "./interfaces/styled";

declare module "styled-components" {
  import { ThemeEnum } from "./interfaces/styled";

  export interface DefaultTheme extends ITheme {
    type: ThemeEnum;
  }
}
