//Basic React Imports
import React, { Component } from 'react';
import { Link } from "react-router-dom";

//Semantic
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

//Own css styling
import './Login.css';

class SelectView extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {

        this.props.viewSelector();

    }

    render() {
        return (
            <Segment raised>
                <Header as='h3' color='blue' textAlign='center'>
                    Please select your view
                </Header>

                <span className="selectViewButton">
                    <Button onClick={this.handleClick} size='massive' color='blue' circular icon='user'></Button>
                </span>
                <span className="selectViewButton">
                    <Button size='massive' color='blue' circular icon='settings'></Button>
                </span>
                <span className="selectViewButton">
                    <Link to="/rider"><Button size='massive' color='blue' circular icon='motorcycle'></Button></Link>
                </span>
                <span className="selectViewButton">
                    <Button size='massive' color='blue' circular icon='settings'></Button>
                </span>
            </Segment>
        )
    }
}

export default SelectView
