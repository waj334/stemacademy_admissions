import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Container, Header, Segment} from 'semantic-ui-react';

import LoginComponent from '../components/LoginComponent.jsx';
import * as LoginActions from '../actions/LoginActions.jsx';

function MapStateToProps(state) {
    return {
        isAuthenticated: state.loginReducer.isAuthenticated, 
        error: state.loginReducer.error, 
        isFetching: state.loginReducer.isFetching,
    }
}

function MapDispatchToProps(dispatch, props) {
    return {
        onLogin: (creds) => {dispatch(LoginActions.login(creds))}
    }
}

@connect(MapStateToProps, MapDispatchToProps)
export default class LoginView extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container textAlign='center'>
                <LoginComponent onLogin={this.props.onLogin} error={this.props.error} isFetching={this.props.isFetching}/>
            </Container>
        )
    }
}