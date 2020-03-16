//Basic React Imports
import React, { Component } from 'react';

//Semantic
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.viewSelector('viewLogin');
}

  render() {
    return (
      <>
        <Segment raised>
          <Form size='large'>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />

            <Button color='blue' fluid size='large'>
              Sign Up
          </Button>
          </Form >
        </Segment>
        <Message>
          Already with us? <a href='#' onClick={this.handleClick}>Login</a>
        </Message>
      </>
    )
  }
}

export default SignUp
