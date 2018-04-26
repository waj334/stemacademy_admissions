import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Container, Segment, Header, Loader, Button } from 'semantic-ui-react';

import * as API from '../api/Api.jsx';
import * as ApiActions from '../actions/ApiActions.jsx';

function mapStateToProps(state, props) {
    return {
        apiData: {
            ...props.apiData,
            ...state.apiReducer,
        }
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        apiCall: (id, apiFunc, payload, thenFunc=(data) => {}, catchFunc=(e) => {return 'error'}) => dispatch(ApiActions.APICall(id, apiFunc, payload, thenFunc, catchFunc)),
    }
}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class EmailVerificationView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: 'loading',
        }

        this.success = this.success.bind(this);
        this.fail = this.fail.bind(this);
        this.view = this.view.bind(this);
    }

    componentDidMount() {
        this.props.apiCall('ev_1', API.VerifyUser, this.props.match.params.token, this.success, this.fail)
    }

    success() {
        this.setState({
            status: 'verified'
        })
    }

    fail() {
        this.setState({
            status: 'unverified'
        })
    }

    view() {
        switch (this.state.status) {
            case 'loading':
                return (
                    <Loader active />
                )
            case 'verified':
                return (
                    <div>
                        <Header size='huge' content='Your email address has been verified!' />
                        <Header content='Please click below to login' />
                        <Button onClick={() => {
                            this.props.history.push('/app');
                        }}>Login</Button>
                    </div>
                )
            case 'unverified':
                return (
                    <div>
                        <Header size='huge' content='There was a problem' />
                        <Header content='We could not verify your email address at this time.' />
                    </div>
                )
            default:
                return <div />
        }
    }

    render() {
        return (
            <div>
                <Segment>
                    <Container>
                        <Header size='huge' textAlign='center' content='Email Verification' />
                    </Container>
                </Segment>
                <Segment basic>
                    <Container>
                        <this.view />
                    </Container>
                </Segment>
            </div>
        )
    }
}