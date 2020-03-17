//Basic React Imports
import React, { Component } from 'react';
import './css/App.css';
import axios from 'axios';


//Own Import
import LoginPage from './components/views/Login/LoginPage';
import SelectView from './components/views/Login/SelectView';
import RiderView from './components/views/RiderView/RiderView.jsx';

class App extends Component {
  state={
    msg: null
  }

  /*api request using axios upon mounting component*/
  componentDidMount() {
    axios.get('/hello').then(res => this.setState({msg: res.data}))
    .catch(err => console.log(err))
  }
  render() {
    
    return (
      <div className="App">
        <LoginPage /> 
        {/* test msg to connect to server */}
        <div style={{color: 'red'}}>{this.state.msg ? <p>{this.state.msg}</p>: null}</div>    
      </div>
    );
  }
  
}

export default App;
