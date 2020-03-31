//Basic React Imports
import React, { Component } from 'react';
import './css/App.css';

//Own Import
import LoginPage from './components/views/Login/LoginPage';
import StaffView from './components/views/StaffView/StaffView';
import RiderView from './components/views/RiderView/RiderView.jsx';
import CustomerView from './components/views/CustomerView/CustomerView';
import FDSManagerView from './components/views/FDSManagerView/FDSManagerView';
import { Route, Switch } from "react-router-dom";
import { LoginContext } from './components/LoginContext';

class App extends Component {
  constructor() {
    super();

    this.signIn = (user) => {
      console.log(user);
      if (user != null) {
        this.setState((state) => ({
          isLoggedIn: true,
          user: user
        }));
      } else {
        alert("Password or username is wrong!");
      }
    };

    this.state = {
      isLoggedIn: false,
      user: {},
      signIn: this.signIn,
    };
  }

  render() {
    return (
      <div className="App">
        <LoginContext.Provider value={this.state}>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route path="/customer" component={CustomerView} />
            <Route path="/staff" component={StaffView} />
            <Route path="/rider" component={RiderView} />
            <Route path="/manager" component={FDSManagerView} />
          </Switch>
        </LoginContext.Provider>
      </div>
    );
  }
}

export default App;
