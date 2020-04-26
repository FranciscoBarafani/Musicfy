import React from "react";
import { Switch, Route } from "react-router-dom";

import Settings from "../pages/Settings";
import Home from "../pages/Home";

//Pages

export default function Routes(props) {
  const { user, setReloadApp } = props;

  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/artist" exact>
        <h1>Artist</h1>
      </Route>
      <Route path="/settings" exact>
        <Settings user={user} setReloadApp={setReloadApp} />
      </Route>
    </Switch>
  );
}
