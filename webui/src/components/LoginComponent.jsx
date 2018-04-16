import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Form, Segment, Header, Container, Message} from 'semantic-ui-react';

import {connect} from 'react-redux';

import {checkInput} from '../ValidationHelper.jsx';

export default class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            err: [false, false],
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e, data) {
        if (data !== undefined) {
            this.setState(
                {
                    [data.name]: data.value
                }
            );
        }
    }

    onSubmit() {
        var fail = false;

        //Validate input
        if (!checkInput(this.state.email, 'email')) {
            fail = true;
            this.state.err[0] = true;
        }

        if (!checkInput(this.state.password, 'password')) {
            fail = true;
            this.state.err[1] = true;
        }

        //Try to get session token
        if (!fail) {
            const creds = {
                username: this.state.email,
                password: this.state.password
            }
            
            this.props.onLogin(creds);

        } else {
            this.setState(this.state);
        }
    }

    render() {
  
        return (
            <Form onSubmit={this.onSubmit} onChange={this.onChange} error={this.props.error ? true:false} loading={this.props.isFetching}>
                <Message error header="Error" content={this.props.error} />
                <Segment.Group compact>
                    <Segment>
                        <Header>Login</Header>
                    </Segment>
                    <Segment>
                        <Form.Input label='Username' placeholder='Email' name='email' value={this.state.email} onChange={this.onChange} error={this.state.err[0]} />
                    </Segment>
                    <Segment>
                        <Form.Input type='password' label='Password' placeholder='Password' name='password' value={this.state.password} onChange={this.onChange} error={this.state.err[1]} />
                    </Segment>
                    <Segment>
                        <Form.Button type='submit'>Login</Form.Button>
                    </Segment>
                </Segment.Group>
            </Form>
        )
    }
}