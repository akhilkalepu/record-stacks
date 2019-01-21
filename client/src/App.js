import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";

import Login from "./components/auth/Login"
import InputForm from './pages/InputForm';
import AppNavbar from './components/AppNavbar'
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

          <Provider store={store}>
            <div className="App">
              <div>

                <AppNavbar />

                <div className="container">

                  <Route path="/login" exact={true} render={(InputForm) => <Login baseUrl="https://dev-406703.oktapreview.com"/>} />
                  <Route path="/implicit/callback" exact={true} component={ImplicitCallback} />

                  <SecureRoute exact path="/" component={InputForm} />
                  <SecureRoute exact path="/" component={GraphPage} />

                </div>

              </div>
            </div>
          </Provider>

        </Security>
			</Router>
		);
	}
}

export default App;
