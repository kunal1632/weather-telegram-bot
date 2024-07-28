import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/admin" component={Dashboard} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
