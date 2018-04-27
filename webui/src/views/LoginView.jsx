import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Container, Header, Segment, Message} from 'semantic-ui-react';

import LoginComponent from '../components/LoginComponent.jsx';
import * as LoginActions from '../actions/LoginActions.jsx';
import * as ApiActions from '../actions/ApiActions.jsx';
import * as API from '../api/Api.jsx';

function MapStateToProps(state, props) {
    return {
        isAuthenticated: state.loginReducer.isAuthenticated, 
        error: state.loginReducer.error, 
        isFetching: state.loginReducer.isFetching,
        apiData: {
            'reset_request': {
                err: null,
                state: null
            },
            ...props.apiData,
            ...state.apiReducer,
        },
    }
}

function MapDispatchToProps(dispatch, props) {
    return {
        onLogin: (creds) => {dispatch(LoginActions.login(creds))},
        apiCall: (id, apiFunc, payload, thenFunc=(data) => {}, catchFunc=(e) => {return 'error'}) => dispatch(ApiActions.APICall(id, apiFunc, payload, thenFunc, catchFunc)),
    }
}

@connect(MapStateToProps, MapDispatchToProps)
export default class LoginView extends Component {
    constructor(props) {
        super(props)

        this.onReset = this.onReset.bind(this);
    }

    onReset(email) {
        this.props.apiCall('reset_request', API.RequestPasswordReset, email)
    }

    render() {
        if (this.props.apiData['reset_request'].state === 'fail') {
            return <Message error header='Error' content='Password reset request failed.' />
        } else if (this.props.apiData['reset_request'].state === 'success') {
            return <Message header='Password Reset Link Sent' content='A password reset link has been sent to the given email.' />
        } else {
            return (
                <Container textAlign='center'>
                    <LoginComponent onLogin={this.props.onLogin} onReset={this.onReset} error={this.props.error} isFetching={this.props.isFetching}/>
                </Container>
            )
        }
    }
}