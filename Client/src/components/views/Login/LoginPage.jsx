//Basic React Imports
import React, { Component } from 'react';
//Semantic
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

//Own Stuff
import SelectView from './SelectView';
import SignUp from './SignUp';
import Login from './Login';


class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      loginStage: 'viewSelect'
    };
    this.changeToLoginView = this.changeToLoginView.bind(this);
    this.changeToSignUpView = this.changeToSignUpView.bind(this);
  }

  changeToLoginView() {
    this.setState({ loginStage: 'viewLogin' });
  }

  changeToSignUpView() {
    this.setState({ loginStage: 'viewSignUp' });
  }
  
  render() {
    let view;
    if (this.state.loginStage == 'viewSelect') {
      view = <SelectView viewSelector={this.changeToLoginView} />;
    } else if (this.state.loginStage == 'viewLogin') {
      view = <Login viewSelector={this.changeToSignUpView} />;
    } else {
      view = <SignUp viewSelector={this.changeToLoginView} />;
    }

    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <h1 className="ui center aligned icon header blue">
            <i className="circular users icon"></i>
                    MoodPanda</h1>
          {view}
        </Grid.Column>
      </Grid>
    );
  }
}


export default LoginPage
