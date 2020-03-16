//Basic React Imports
import React, { Component } from 'react';

//Semantic
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

//Own Stuff
import SelectView from './SelectView';
import SignUp from './SignUp';


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

const Login = () => (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <h1 class="ui center aligned icon header blue">
        <i class="circular users icon"></i>
                MoodPanda</h1>
  
      <Segment raised>
        <SelectView />

        {/* <SignUp /> */}
    {/* <Form size='large'> */}
        {/* <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />

          <Button color='blue' fluid size='large'>
            Login
          </Button>
               </Form>
        </Segment>
      <Message>
        New to us? <a href='#'>Sign Up</a>
      </Message> */}
      </Segment>
    </Grid.Column>
  </Grid>
)

export default Login
