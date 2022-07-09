import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Main from "./routes/Main";
import Signup from "./routes/Signup";
import Todos from "./routes/Todos";
import Error from "./routes/Error";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/coins/:coinId">
          <Coin />
        </Route>
        <Route path="/coins">
          <Coins />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path='/todo'>
          <Todos />
        </Route>
        <Route path="/">
          <Main />
        </Route>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
