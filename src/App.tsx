import { useState } from "react";
import { createGlobalStyle } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";

import Router from "./Router";
import { dark, light } from "./theme";

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
  const [isDark, setIsDark] = useState(false);

  // argument를 받지않고 return하지 않음: changeTheme의 signature
  const changeTheme = () => setIsDark((current) => !isDark);

  return (
    <ThemeProvider theme={isDark ? dark : light}>
      <GlobalStyle />
      <Router changeTheme={changeTheme} isDark={isDark} />
      <ReactQueryDevtools initialIsOpen />
    </ThemeProvider>
  );
}

export default App;

/*
global state는 어플리케이션이 무언가를 인지해야할때 사용한다
어플리케이션이 특정 value에 접근해야할때 사용한다
컴포넌트가 어디에 있던, 누가 접근하고자 하는지에 상관없이
여기서는 Coins나 Coin이나 Chart에서 isDark에 접근해야 할대
그래서 글로벌state는 어플리케이션 전체에서 접근이 가능한 state를 말한다

예를들어 로그인한 상태에서만 접근이 가능하거나 하는 등등

*/
