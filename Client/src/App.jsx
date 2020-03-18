//Basic React Imports
import React, { Component } from 'react';
import './css/App.css';

//Own Import
import LoginPage from './components/views/Login/LoginPage';
import SelectView from './components/views/Login/SelectView';
import RiderView from './components/views/RiderView/RiderView.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginPage />      
      </div>
    );
  } 
}

export default App;
