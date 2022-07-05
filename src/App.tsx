import React from "react";
import { createGlobalStyle } from "styled-components";
import Router from "./Router";

// createGlobalStyle는 한 컴포넌트를 만들 수 있게 한다
// 렌더링될때 만들어진 컴포넌트는 전역 스코프에 스타일을 적용시켜준다
// styled-components는 document의 head로 가서 GlobalStyle의 내용을 주입시켜줄 것이다

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
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
  font-family: 'Source Sans Pro', sans-serif;
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
}
* {
  box-sizing:border-box;
}
`;

function App() {
  return (
    // 최종적으로는 하나의 태그만 return되도록 해야되는데 여러 컴포넌트들을 감싸기 위해 <div>태그로 감싸게 되면
    // 결국 div태그들이 많아지기 때문에 ReactJS에서는 일종의 유령 컴포넌트인  Fragment를 제공한다
    // 이러한 Fragment는 부모태그없이 서로 붙어있는 많은 것들을 return할 수있게 해준다
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;

// reset css를 프로젝트 전체에서 적용시키기 위해
