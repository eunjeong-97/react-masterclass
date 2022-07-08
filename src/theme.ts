import { DefaultTheme, ColorTheme } from "styled-components";

const color: ColorTheme = {
  // https://flatuicolors.com/palette/ca
  blue: {
    light: "#48dbfb",
    normal: "#54a0ff",
    dark: "#2e86de",
  },
  purple: "#5f27cd",
  gray: {
    light: "#c8d6e5",
    normal: "#8395a7",
    dark: "#222f3e",
  },
};

export const dark: DefaultTheme = {
  bgColor: color.gray.dark,
  textColor: color.gray.light,
  btnColor: color.blue.dark,
  titleColor: color.blue.normal,
  btnTextColor: color.blue.light,
  accentColor: color.purple,
};

export const light: DefaultTheme = {
  bgColor: color.gray.light,
  textColor: color.gray.dark,
  btnColor: color.gray.dark,
  titleColor: color.gray.dark,
  btnTextColor: color.gray.dark,
  accentColor: color.blue.dark,
};
