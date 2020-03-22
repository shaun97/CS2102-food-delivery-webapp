//Basic React Imports
import React, { Component } from 'react';

//Semantic
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import axios from 'axios';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
    };

    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);

    this.handleChange = (event) => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
    };
  }



  handleLoginClick() {
    this.props.viewSelector('viewLogin');
  }

  handleSubmitClick() {
    const profile = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }
    axios.post('/api/posts/userprofiletodb', profile).then(res => console.log("success"))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <>
        <Segment raised>
          <Form size='large'>

            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='Name'
              required={true}
              name='name'
              onChange={this.handleChange} />
            <Form.Input
              fluid
              icon='mail'
              iconPosition='left'
              placeholder='E-mail address'
              required={true}
              name='email'
              onChange={this.handleChange} />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              required={true}
              name='password'
              onChange={this.handleChange}
            />
            <Button color='blue' fluid size='large' onClick={this.handleSubmitClick}>
              Sign Up
          </Button>
          </Form >
        </Segment>
        <Message>
          Already with us? <a href='#' onClick={this.handleLoginClick}>Login</a>
        </Message>
      </>
    )
  }
}

export default SignUp
