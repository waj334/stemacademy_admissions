import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export default function (comp) {
    class AuthComponent extends Component {
        static contextTypes = {
            router: PropTypes.object
        }

        componentWillMount() {
            //Check if authenticated
            if (!this.props.authenticated) {
                //Go back to front page
                //TODO: Notify user is unauthorized
                this.props.router.push('/');
            }
        }

        componentWillUpdate(nextProps) {
            //Check if authenticated
            if (!nextProps.authorized) {
                //Go back to front page
                //TODO: Notify user is unauthorized
                this.props.router.push('/');
            }
        }

        render() {
            return <comp {...this.props} />
        }
    }

    function mapStateToProps(state) {
        const {isAuthenticated} = state.loginUpdate;
        const {history} = state.loginUpdate.history;

        return {
            authenticated: isAuthenticated,
            router: history,
        }
    }
    return connect(mapStateToProps)(AuthComponent)
}