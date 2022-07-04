import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { dark, light } from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    {/* theme.ts에서 지정한 theme을 실제로 적용시키기 위해 ThemePrvider 컴포넌트로 감싼다 */}
    <ThemeProvider theme={light}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// 배운것 정리
// Provider에서 theme을 하위 컴포넌트로 전달하고 싶다면 theme.ts에서 object타입의 theme을 불러오면 되고
// 이러한 theme.ts에서 theme을 지정하기 위해서는 styled.d.ts파일에서 theme의 property의 type을 지정을 해줘야 한다
