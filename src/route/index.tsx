import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import "./index.less";
import { createBrowserHistory } from "history";
import { routeMethod } from './getRoute'

export const history = createBrowserHistory();
const RouteComponent: React.FC = () => {
  const routes = routeMethod.requirePage();
  console.log(routes);
  return (
    <Router history={history}>
      <Switch>
        {routes.map(({ url, component, exact }) => (
          <Route key={url} path={url} component={component} exact={exact} />
        ))}
      </Switch>
    </Router>
  );
}


export default RouteComponent;
