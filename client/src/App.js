import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppNavbar from './components/AppNavbar';
import Home from "./pages/Home";
import InputForm from './pages/InputForm';
import GraphPage from './pages/GraphPage';

import { Provider } from 'react-redux';
import store from './store';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

class App extends Component {

	render() {

		return (
			<Router>

          <div className="App">
            <Provider store={store}>
              <AppNavbar />

              <div className="container">

                <Route path="/" exact={true} component={Home} />

                <Route path="/inputform" exact={true} component={InputForm} />
                <Route path="/graphpage" exact={true} component={GraphPage} />

              </div>
            
            </Provider>
          </div>

			</Router>
		);
	}
}

export default App;
