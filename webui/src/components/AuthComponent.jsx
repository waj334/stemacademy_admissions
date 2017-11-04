import React, {Component} from 'react';
import {connect} from 'react-redux';

export default function (comp) {
    class AuthComponent extends Component {
        static contextTypes = {
            router: React.PropTypes.object
        }

        componentWillMount() {
            //Check if authenticated
            console.log(this.props);
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
            console.log("AuthComponent.render", this.props);
            return <comp {...this.props} />
        }
    }

    function mapStateToProps(state) {
        console.log("AuthComponent", state);
        const {isAuthenticated} = state.loginUpdate;
        const {history} = state.loginUpdate.history;

        return {
            authenticated: isAuthenticated,
            router: history,
        }
    }
    return connect(mapStateToProps)(AuthComponent)
}