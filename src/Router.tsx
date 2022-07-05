import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;

// path에 /:coinId라고 적으면 라우터에게 우리의 URL이 변수값을 가진다고 말하는 것이다
// 그리고 우리는 이러한 coinId값을 잡아내면 된다
