import './App.css';
import { HomePage } from './app/containers/HomePage';
import {Resurrect} from './app/containers/Resurrect';
import React from "react";
import { BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import { Upgrade } from './app/containers/Upgrade';



function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/resurrect">
            <Resurrect />
          </Route>
          <Route exact path="/upgrade">
            <Upgrade />
          </Route>
        </Switch>
      </div>
    </Router>
  );     
}

export default App;
