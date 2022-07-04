import { DefaultTheme } from "styled-components";
// 여기서 만들 테마는 styled.d.ts파일에서 정의한 속성들하고 동일해야 한다
// 만약 여기서 btnColor를 새로 지정하고 싶다면 styled.d.ts파일에서 아래와 같이 btnColor의 타입을 지정해주면 된다
/*
declare module 'styled-components' {
    export interface DefaultTheme {
        textColor: string;
        bgColor: string;
        btnColor: string; // 새로 기입
    }
}

*/
export const light: DefaultTheme = {
  bgColor: "white",
  textColor: "black",
  btnColor: "tomato",
};

export const dark: DefaultTheme = {
  bgColor: "black",
  textColor: "white",
  btnColor: "tomato",
};
