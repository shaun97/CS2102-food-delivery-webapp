//Basic React Imports
import React, { Component } from 'react';

//Semantic
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

//Own Stuff
import SelectView from './SelectView';
import SignUp from './SignUp';
import Login from './Login';
let counter = 0;
class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      loginStage: 'viewSelect',
    };
  }
changeView() {
  counter++;
  console.log('clickeds');
  console.log(counter);
}

  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <h1 className="ui center aligned icon header blue">
            <i className="circular users icon"></i>
                    MoodPanda</h1>

          <Segment raised>
            <SelectView viewSelector={this.changeView}/>
            {/* <SignUp /> */}
            {/* <Login /> */}

          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}


export default LoginPage
