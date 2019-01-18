import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import InputForm from './pages/InputForm';
import AppNavbar from './components/AppNavbar'
import List from './components/List';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

class App extends Component {
	render() {
			return (
					<Router basename="/react-auth-ui/">
							<div className="App">
									<div>
											
											<AppNavbar/>

											<Route exact path="/" component={InputForm}>
											</Route>

											<br/>

											<List/>

									</div>

							</div>
					</Router>
			);
	}
}

export default App;
