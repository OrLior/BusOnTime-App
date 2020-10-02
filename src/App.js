import React, { useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={Page1} />
          <Route path="/Page2" component={Page2} />
          <Route path="/Page3" component={Page3} />
          <Route path="/Page4" component={Page4} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
