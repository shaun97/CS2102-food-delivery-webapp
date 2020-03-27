import React, { Component } from 'react';
import history from './history';
import * ACTIONS from '../actions/actions';
import { connect } from 'react-redux';

class AuthCheck extends Component {
    componentDidMount() {
        if(this.props.auth.isAuthenticated()) {
            this.props.login_success()
            this.props.add_profile(this.props.auth.userProfile)
            history.replace('/')
        } else {
            this.props.login_failure()
            this.props.remove_profile()
            history.replace('/')
        }
    }

    render() {
        return(
            <div></div>
        )
    }
}

