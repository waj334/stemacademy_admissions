import React, {Component} from 'react';
import {connect} from 'react-redux';

export default function (comp) {
    class AuthComponent extends Component {
        static contextTypes = {
            router: React.PropTypes.object
        }

        componentWillMount() {
            //Check if authenticated
            if (!this.props.authenticated) {
                //Go back to front page
                //TODO: Notify user is unauthorized
                this.context.router.push('/');
            }
        }

        componentWillUpdate(nextProps) {
            //Check if authenticated
            if (!nextProps.authorized) {
                //Go back to front page
                //TODO: Notify user is unauthorized
                this.context.router.push('/');
            }
        }

        render() {
            return <comp {...this.props} />
        }
    }

    function mapStateToProps(state) {
        return {authenticated: state.authenticated}
    }

    return connect(mapStateToProps)(AuthComponent)
}