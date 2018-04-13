import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import LoginView from '../views/LoginView.jsx'

function mapStateToProps(state) {
    return {
        isAuthenticated: state.loginReducer.isAuthenticated,
    }
}

@connect(mapStateToProps)
export default class AuthComponent extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    componentWillMount() {
        /*Check if authenticated
        if (!this.props.isAuthenticated) {
            //Go back to front page
            //TODO: Notify user is unauthorized
            history.push('/');
        }*/
    }

    componentWillUpdate(nextProps) {
        //Check if authenticated
        /*if (!nextProps.authorized) {
            //Go back to front page
            //TODO: Notify user is unauthorized
            history.push('/');
        }*/
    }

    render() {
        if (!this.props.isAuthenticated) {
            return <LoginView />
        } else {
            return <this.props.view {...this.props} history={history} />
        }
    }
}