import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios'

import AppNavbar from './components/AppNavbar';
import Home from "./pages/Home";
import InputForm from './pages/InputForm';
import GraphPage from './pages/GraphPage';

import Login from "./components/Login";
import Signup from "./components/Signup";

import { Provider } from 'react-redux';
import store from './store';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

	render() {

		return (
			<Router>

          <div className="App">
            <Provider store={store}>
              <AppNavbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
              {/* greet user if logged in: */}
              {this.state.loggedIn &&
                <p id="inputForm">Welcome to Record Stacks, {this.state.username}!</p>
              }

              <div className="container">

                <Route path="/" exact={true} component={Home} />

                <Route path="/login" render={() =>
                  <Login
                    updateUser={this.updateUser}
                  />}
                />
                <Route path="/signup" render={() => 
                  <Signup/>}
                />

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
