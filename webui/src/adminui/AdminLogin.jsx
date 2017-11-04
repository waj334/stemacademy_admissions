import React, {Component, PropTypes} from 'react';
import {Form, Segment, Header, Container, Message} from 'semantic-ui-react';

import {connect} from 'react-redux';

import {checkInput} from '../ValidationHelper.jsx';

import {LoginActions} from '../actions';

class AdminLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            err: [false, false],
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e, {name, value}) {
        this.setState({[name]:value});
    }

    onSubmit() {
        var fail = false;

        //Validate input
        if (!(checkInput(this.state.username, 'username') || checkInput(this.state.username, 'email'))) {
            fail = true;
            this.state.err[0] = true;
        }

        if (!checkInput(this.state.password, 'password')) {
            fail = true;
            this.state.err[1] = true;
        }

        //Try to get session token
        if (!fail) {
            const {dispatch} = this.props;
            const creds = {
                username: this.state.username,
                password: this.state.password
            }
            dispatch(
                LoginActions.loginUser(creds, this.props.history)
            );
        } else {
            this.setState(this.state);
        }
    }

    render() {
        console.log(this.props);
        const {isAuthenticated, err, dispatch, isFetching} = this.props;
        return (
            <Form onSubmit={this.onSubmit} error={err ? true:false} loading={isFetching}>
                <Message error header="Error" content={err} />
                <Segment.Group compact>
                    <Segment>
                        <Header>Login</Header>
                    </Segment>
                    <Segment>
                        <Form.Input label='Username' placeholder='Username' name='username' value={this.state.username} onChange={this.onChange} error={this.state.err[0]} />
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

AdminLogin.PropTypes = {
    dispatch: PropTypes.func.isRequired,
    err: PropTypes.string,
    history: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    console.log(state);
    const {loginUpdate} = state;
    const {isAuthenticated, err, isFetching} = loginUpdate;

    return {
        isAuthenticated, 
        err, 
        isFetching,
    }
}

export default connect(mapStateToProps)(AdminLogin);