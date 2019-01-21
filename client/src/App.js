import React, { Component } from 'react';

import { HashRouter as Router, Route } from 'react-router-dom';
import Login from "./components/auth/Login"
import InputForm from './pages/InputForm';
import AppNavbar from './components/AppNavbar'
import GraphPage from './pages/GraphPage';

import { Provider } from 'react-redux';
import store from './store';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

class App extends Component {

	render() {

		return (
			<Router basename="/react-auth-ui/">
				<Provider store={store}>
					<div className="App">
						<div>

							<AppNavbar />

              <div className="container">

                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={InputForm} />
                <Route exact path="/" component={GraphPage} />

              </div>

						</div>
					</div>
				</Provider>
			</Router>
		);
	}
}

export default App;
