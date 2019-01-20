import React, { Component } from 'react';
import {
  Button,
} from 'reactstrap';

import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import InputForm from './pages/InputForm';
import AppNavbar from './components/AppNavbar'
import GraphPage from './components/GenrePieChart';

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

							<Route exact path="/" component={InputForm} />
							
							<Button
                color="dark"
                style={{margin: "2rem"}}
                onChange={this.visualizeData}
              >Get Data</Button>

              <Button
                color="secondary"
                style={{margin: "2rem"}}
                onChange={this.visualizeData}
              >Visualize</Button>

              <div className="App">
                <GraphPage
                  data={this.state.data}
                  width={this.state.width}
                  height={this.state.height}
                />
              </div>
						</div>
					</div>
					
					

				</Provider>
			</Router>
		);
	}
}

export default App;
