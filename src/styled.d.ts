import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    blue: {
      light: string;
      normal: string;
      dark: string;
    };
    purple: string;
    gray: {
      light: string;
      normal: string;
      dark: string;
    };
  }
}
