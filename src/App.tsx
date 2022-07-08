import { useState } from "react";
import { createGlobalStyle } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";
import { useRecoilValue } from "recoil";

import Router from "./Router";
import { dark, light } from "./theme";
import { isDarkAtom } from "./atom";

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
	font-family: 'Do Hyeon', sans-serif;
	background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a {
  text-decoration:none;
  color:inherit;
}
* {
  box-sizing:border-box;
}
`;

function App() {
  // RecoilRoot안에서 atom을 연결하는방법
  // atom이 변경되면 컴포넌트들도 변경된값으로 다시 리렌더링한다
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <ThemeProvider theme={isDark ? dark : light}>
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen />
    </ThemeProvider>
  );
}

export default App;
