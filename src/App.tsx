import Circle from "./Circle";

function App() {
  return (
    <div>
      <Circle bgColor="teal" />
      <Circle bgColor="tomato" />
    </div>
  );
}

export default App;

/*
어떻게 type하는가
component를 type한다는 것은 component에게 type을 준다는 뜻
component에게 type을 준다는 것은 결국 TypeScript에게 뭐가 뭔지 설명해줄 수 있다는 것이다

TypeScript에게 내 component가 가져야 하는 prop을 설명해주려면 propTypes를 활용하면 좋다
propTypes을 사용하면, prop이 있는지 없는지 확인해주고 없으면 브라우저 콘솔에 경고표시를 해준다
하지만 코드를 실행한 후에나 확인이 가능하다
TypeScript를 사용하는 이유는 코드를 실행하기 전에 prop의 여부를 확인해주기 때문에 propTypes대신 TypeScript를 사용하면 된다
*/
