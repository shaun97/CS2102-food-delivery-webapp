//Basic React Imports
import React from 'react';
import './css/App.css';


//Own Import
import LoginPage from './components/views/Login/LoginPage';
import SelectView from './components/views/Login/SelectView';
import RiderView from './components/views/RiderView/RiderView.jsx';

function App() {
  return (
    <div className="App">

      <LoginPage />
  
     
    </div>
  );
}

export default App;
