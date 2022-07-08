import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

interface IRouterProps {
  // 아무 argument도 받지 않고, void를 return하는 함수를 받는다
  changeTheme: () => void;
  isDark: boolean;
}

function Router({ changeTheme, isDark }: IRouterProps) {
  return (
    <BrowserRouter>
      <Switch>
        {/* / path를 위로 하면작동되지 않는다 */}
        <Route path="/:coinId">
          <Coin changeTheme={changeTheme} isDark={isDark} />
        </Route>
        <Route path="/">
          <Coins changeTheme={changeTheme} isDark={isDark} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
