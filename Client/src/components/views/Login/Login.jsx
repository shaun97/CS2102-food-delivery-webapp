//Basic React Imports
import React, { Component } from 'react';

//Semantic
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import axios from 'axios';

import { LoginContext } from '../../LoginContext';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleSignupClick = this.handleSignupClick.bind(this);

        this.handleChange = (event) => {
            const { name, value } = event.target;
            this.setState({
                [name]: value
            });
        };
    }

    handleClick() {
        let context = this.context;

        const userEmail = this.state.email;
        const userPassword = this.state.password;

        axios.get('/api/get/userprofilefromdb', { params: { email: userEmail, password: userPassword} })
            .then(res => context.signIn(res.data[0]));
    }


    handleSignupClick() {
        this.props.viewSelector('viewSignUp');
    }

    render() {
        let page = null;
        switch (this.props.userType) {
            case 'customer':
                page = "/customer";
                break;
            case 'staff':
                page = "/staff";
                break;
            case 'rider':
                page = "/rider";
                break;
            case 'manager':
                page = "/manager";
                break;

        }
        return (
            <>

                <Segment raised>
                    <Form size='large'>
                        <Form.Input
                            fluid
                            icon='mail'
                            iconPosition='left'
                            placeholder='E-mail address'
                            name='email'
                            required={true}
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name='password'
                            required={true}
                            onChange={this.handleChange}
                        />
                        {/* <Link to={page}> */}


                            <Button color='blue' fluid size='large' onClick={this.handleClick}>
                                Login
                             </Button>
                        {/* </Link> */}

                    </Form>
                </Segment>
                <Message>
                    New to us? <a href='#' onClick={this.handleSignupClick}>Sign Up</a>
                </Message>
            </>
        );
    }
}

Login.contextType = LoginContext;

export default Login;
