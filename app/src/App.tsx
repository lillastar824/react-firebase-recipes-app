import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { RouteKey, RoutePath } from "./configs/routes";
import { NotFound } from "./components/NotFound";
import { Index } from "./pages/Index";
import { SingleRecipe } from "./pages/SingleRecipe";
import { ManageList } from "./pages/ManageList";
import { ManageCreate } from "./pages/ManageCreate";
import { ManageEdit } from "./pages/ManageEdit";

export const App = () => (
  <BrowserRouter>
    <Switch>
      <Route
        path={RoutePath[RouteKey.INDEX]}
        exact={true}
        component={Index}
      />
      <Route
        path={RoutePath[RouteKey.MANAGE_LIST]}
        exact={true}
        component={ManageList}
      />
      <Route
        path={RoutePath[RouteKey.MANAGE_CREATE]}
        exact={true}
        component={ManageCreate}
      />
      <Route
        path={RoutePath[RouteKey.MANAGE_EDIT]}
        exact={true}
        component={ManageEdit}
      />
      <Route
        path={RoutePath[RouteKey.RECIPE]}
        exact={true}
        component={SingleRecipe}
      />
      <Route
        component={NotFound}
      />
    </Switch>
  </BrowserRouter>
)