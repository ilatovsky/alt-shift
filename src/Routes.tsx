import { FC } from "react";
import { Switch, Route, Redirect } from "wouter";
import { ApplicationAi } from "./pages/application-ai";
import { Application } from "./pages/application";
import { ApplicationsList } from "./pages/applications-list";
import { paths } from "./paths";

export const Routes: FC = () => (
  <Switch>
    <Route path="/">
      <Redirect to={paths.applications.list} />
    </Route>
    <Route path={paths.applications.list} component={ApplicationsList} />
    <Route path={paths.applications.ai} component={ApplicationAi} />
    <Route path={paths.applications.view} component={Application} />
    <Route>404: No such page!</Route>
  </Switch>
);
