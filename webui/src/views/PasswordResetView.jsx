import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Container, Segment, Header, Form, Message } from 'semantic-ui-react';

import * as ApiActions from '../actions/ApiActions.jsx';
import * as API from '../api/Api.jsx';
import * as ValidationHelper from '../ValidationHelper.jsx';

function mapStateToProps(state, props) {
    return {
        apiData: {
            'pwd_reset': {
                error: null,
                state: null,
            },
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
export default class PasswordResetView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            err: null
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit() {
        if (ValidationHelper.checkInput(this.state.pwd, 'password')) {
            if (this.state.pwd === this.state.cpwd) {
                var token_data = {
                    token: this.props.match.params.token,
                    password:this.state.pwd
                };

                this.props.apiCall('pwd_reset', API.ResetPassword, token_data, (data) => {
                    this.props.history.push('/app');
                }, (e) => {
                    this.setState({
                        err: 'Invalid link or service could not be reached.'
                    });
                });
            } else {
                this.setState({
                    err: 'Passwords do not match!'
                });
            }
        } else {
            this.setState({
                err: 'Empty or invalid password entered! Must contain at least 1 number, capital letter and special character. Length must be 8 to 15 characters long.'
            });
        }
    }

    onChange(e, {name, value}) {
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <Message hidden={this.state.err == null} header='Error' content={this.state.err} />
                <Form loading={this.props.apiData['pwd_reset'].state === 'loading'} onSubmit={this.onSubmit}>
                    <Container>
                        <Header size='huge' textAlign='center' content='Password Reset' />
                        <Segment.Group>
                            <Segment>
                                <Form.Input name='pwd' placeholder='Password' label='Password' onChange={this.onChange} type='password' />
                            </Segment>
                            <Segment>
                                <Form.Input name='cpwd' placeholder='Confirm Password' label='Confirm Password' onChange={this.onChange} type='password'/>
                            </Segment>
                            <Segment>
                                <Form.Button type='submit' color='green'>Reset</Form.Button>
                            </Segment>
                        </Segment.Group>
                    </Container>
                </Form>
            </div>
        )
    }
}