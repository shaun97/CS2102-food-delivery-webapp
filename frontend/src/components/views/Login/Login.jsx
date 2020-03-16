//Basic React Imports
import React, { Component } from 'react';

//Semantic
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'


const Login = () => (
    <>
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
                Login
          </Button>
        </Form>

        <Message>
            New to us? <a href='#'>Sign Up</a>
        </Message>
    </>

)

export default Login
