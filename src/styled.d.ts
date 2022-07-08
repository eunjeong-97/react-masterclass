import "styled-components";

declare module "styled-components" {
  export interface ColorTheme {
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

  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    btnColor: string;
    titleColor: string;
    btnTextColor: string;
    accentColor: string;
  }
}
