import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import InputForm from './pages/InputForm';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router basename="/react-auth-ui/">
        <div className="App">
          <div className="App__Aside"></div>
          <div className="App__Form">
            
            <Route exact path="/" component={InputForm}>
            </Route>

          </div>

        </div>
      </Router>
    );
  }
}

export default App;
