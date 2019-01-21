import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";

import AppNavbar from './components/AppNavbar';
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import InputForm from './pages/InputForm';
import GraphPage from './pages/GraphPage';

import { Provider } from 'react-redux';
import store from './store';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function onAuthRequired({history}) {
  history.push("/login");
}

class App extends Component {

	render() {

		return (
			<Router>
        <Security issuer="https://dev-406703.oktapreview.com/oauth2/default"
        client_id="0oaj1tgz24gpMjG5R0h7"
        redirect_uri={window.location.origin + "/implicit/callback"}
        onAuthRequired={onAuthRequired}>

  
          <div className="App">
            <Provider store={store}>
              <AppNavbar />

              <div className="container">

                <Route path="/" exact={true} component={Home} />
                <SecureRoute path="/inputform" exact={true} component={InputForm} />
                <SecureRoute path="/graphpage" exact={true} component={GraphPage} />
                
                <Route path="/login" exact={true} render={() => <Login baseUrl="https://dev-406703.oktapreview.com"/>} />
                <Route path="/implicit/callback" component={ImplicitCallback} />

              </div>
            
            </Provider>
          </div>

        </Security>
			</Router>
		);
	}
}

export default App;
