// 해당 파일은 우리가 이전에 설치해 놓은 styled.d.ts파일에 overwrite한다 (=덮어쓴다)
// 내가 테마에 사용할 타입들을 포함시키기 위해
import "styled-components";

// @types/styled-components 패키지를 설치하지 않으면 여기서 에러가 발생한다
declare module "styled-components" {
  export interface DefaultTheme {
    // 내가 만든 테마가 어떻게 보여질지 타입스크립트에게 설명해준다
    // 아래내용들은 기본적으로 복사되지만 지워서 내가 사용할것을 적어주면 된다
    // borderRadius: string;

    // color: {
    //   main: string;
    //   secondary: string;
    // };

    // 내가 사용할 속성
    textColor: string;
    bgColor: string;
    btnColor: string;
  }
}

// 이 파일에서 한 것은
// styled-components를 import하고
// 나의 styled-components의 테마 정의를 확장한 것이다
// 여기서 theme.ts파일을 새로 생성해준다
