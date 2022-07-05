import React from "react";
import Router from "./Router";

function App() {
  return <Router />;
}

export default App;

// coinpaprika api
// react query: 편리한 방식으로 데이터를 fetch할 수 있다
// 리액트 쿼리를 하기 전에 직접 fetch를 하면서 왜 리액트쿼리를 쓰는지 알아보자

/*
/: All coins
/:id /btc coin detail
nested router: 중첩된 라우터
한스크린 내에서 또다른 라우터를 가질 수 있다

/btc/information
/btc/chart
*/
