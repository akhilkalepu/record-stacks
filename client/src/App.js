import React, { Component } from 'react';

import { HashRouter as Router, Route } from 'react-router-dom';
import InputForm from './pages/InputForm';
import AppNavbar from './components/AppNavbar'
import GenrePieChart from './pages/GenrePieChart';

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

							<GenrePieChart />

						</div>
					</div>
				</Provider>
			</Router>
		);
	}
}

export default App;
