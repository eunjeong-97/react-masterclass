import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Main from "./routes/Main";
import ToDoList from "./routes/ToDoList";

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
        <Route path="/todos">
          <ToDoList />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
