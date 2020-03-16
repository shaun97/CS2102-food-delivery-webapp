//Basic React Imports
import React, { Component } from 'react';
import { Link } from "react-router-dom";

//Semantic
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'


const SelectView = () => (
  
            <>
                <Header as='h3' color='blue' textAlign='center'>
                    Please select your view
                </Header>
                <Button size='large' color='blue' circular icon='user'></Button>
                <Button size='large' color='blue' circular icon='settings'></Button>
                <Link to="/rider"><Button size='large' color='blue' circular icon='motorcycle'></Button></Link>
                <Button size='large' color='blue' circular icon='settings'></Button>
            </>

)
export default SelectView
