import { FC, lazy, Suspense } from "react";
import { Switch, Route, Redirect, Router } from "wouter";
import { paths } from "./paths";
import { ScrollToTop } from "./components/ScrollToTop";

// Lazy load components
const Application = lazy(() =>
  import("./pages/application").then((module) => ({
    default: module.Application,
  })),
);
const ApplicationsList = lazy(() =>
  import("./pages/applications-list").then((module) => ({
    default: module.ApplicationsList,
  })),
);

export const Routes: FC = () => (
  <Router>
    <ScrollToTop />
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/">
          <Redirect to={paths.applications.list} />
        </Route>
        <Route path={paths.applications.list} component={ApplicationsList} />
        <Route path={paths.applications.view} component={Application} />
        <Route>404: No such page!</Route>
      </Switch>
    </Suspense>
  </Router>
);
