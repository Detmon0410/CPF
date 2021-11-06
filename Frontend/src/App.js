import { BrowserRouter, Switch, Route } from "react-router-dom";
import { EmployeePage, VerifyPage, SignInPage,ManagerPage } from "./views";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={EmployeePage} />
        <Route exact path="/manager" component={ManagerPage} />
        <Route exact path="/sign-in" component={SignInPage} />
        <Route exact path="/verify" component={VerifyPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
