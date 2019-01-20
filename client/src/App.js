import React, { Component } from 'react';

import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
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

							<Route exact path="/" component={InputForm} />

							<GraphPage />

						</div>
					</div>
				</Provider>
			</Router>
		);
	}
}

export default App;
