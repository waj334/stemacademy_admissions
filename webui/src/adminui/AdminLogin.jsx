import React, {Component} from 'react';
import {Form, Segment, Header, Container} from 'semantic-ui-react';

import {checkInput} from '../ValidationHelper.jsx';

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
        if (!checkInput(this.state.username, 'username')) {
            fail = true;
            this.state.err[0] = true;
        }

        if (!checkInput(this.state.password, 'password')) {
            fail = true;
            this.state.err[1] = true;
        }

        //Try to get session token
        if (!fail) {
            //fetch ...

            //Goto admin view if successful
        } else {
            this.setState( this.state);
        }
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
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

export default AdminLogin;