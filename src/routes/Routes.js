import React from "react";
import { Switch, Route } from "react-router-dom";

//Pages

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact>
        <h1>Home</h1>
      </Route>
      <Route path="/artist" exact>
        <h1>Artist</h1>
      </Route>
      <Route path="/settings" exact>
        <h1>Configuracion de App</h1>
      </Route>
    </Switch>
  );
}
