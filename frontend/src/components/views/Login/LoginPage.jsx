//Basic React Imports
import React, { Component } from 'react';

//Semantic
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

//Own Stuff
import SelectView from './SelectView';
import SignUp from './SignUp';
import Login from './Login';


// class Login extends Component {
//   constructor() {
//     super();
//     this.state = {};
//   }

//   render() {
//     return (

//     );
//   }
// }

// export default Login;

const LoginPage = () => (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <h1 class="ui center aligned icon header blue">
        <i class="circular users icon"></i>
                MoodPanda</h1>
  
      <Segment raised>
        {/* <SelectView /> */}

        {/* <SignUp /> */}
        <Login />
    
      </Segment>
    </Grid.Column>
  </Grid>
)

export default LoginPage
