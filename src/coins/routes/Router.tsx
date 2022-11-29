import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coins from "./Coins";
import Coin from "./Coin";

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
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
