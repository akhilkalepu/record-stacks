import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import InputForm from './pages/InputForm';
import AppNavbar from './components/AppNavbar'
import GenrePieChart from './components/GenrePieChart';

import AppList from './components/AppList';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

class App extends Component {

	state = {
		data: [12, 5, 6, 6, 9, 10],
		width: 700,
		height: 200,
		id: root
	}

	render() {

		return (
			<Router basename="/react-auth-ui/">
				<Provider store={store}>
					<div className="App">
						<div>
							<AppNavbar/>
							<Route exact path="/" component={InputForm}>
							</Route>
							<br/>

							<Container>
								<div className="App">
									<GenrePieChart
										data={this.state.data}
										width={this.state.width}
										height={this.state.height}
									/>
								</div>
							</Container>
						</div>
					</div>
					
					

				</Provider>
			</Router>
		);
	}
}

export default App;
