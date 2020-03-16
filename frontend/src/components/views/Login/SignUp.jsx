//Basic React Imports
import React, { Component } from 'react';

//Semantic
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'


const SignUp = () => (

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
)

export default SignUp
