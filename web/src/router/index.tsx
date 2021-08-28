import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';
import LoginComponent from '../pages/login/index'
import ChatComponent from '../pages/chat'
const IndexRoute = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={LoginComponent}></Route>
        <Route path="/chat" component={ChatComponent}></Route>
        <Redirect from="/" exact to="/chat" />
      </Switch>
    </HashRouter>
  );
};

export default IndexRoute;
