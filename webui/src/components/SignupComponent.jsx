import React, { Component } from 'react';
import { Divider, Segment, Form, Container, Header, Icon, Message } from 'semantic-ui-react';
import {connect} from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha';

import * as Constants from '../Constants';
import * as Validation from '../ValidationHelper.jsx';
import * as SignupActions from '../actions/SignupActions.jsx';

function mapStateToProps(state) {
    return {
        isPosting: state.signupReducer.isPosting,
        isSuccessful: state.signupReducer.isSuccessful,
        error: state.signupReducer.error
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        signup: (data) => dispatch(SignupActions.signup(data))
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SignupForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fname: '',
            lname: '',
            teacher: false,
            email: '',
            password: '',
            cpassword: '',
            invalid: [],
            recaptcha: null
        }

        this.onChange = this.onChange.bind(this);
        this.onRecaptcha = this.onRecaptcha.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.error = this.error.bind(this);
    }

    onChange(e, {name,value}) {
        this.setState(
            {
                [name]: value
            }
        );
    }

    onRecaptcha(value) {
        this.setState({
            recaptcha: value
        });
    }

    onSubmit() {
        //Validate data
        var invalid = [];

        if (!Validation.checkInput(this.state.fname, 'name')) {
            invalid.push('fname')
        }

        if (!Validation.checkInput(this.state.lname, 'name')) {
            invalid.push('lname')
        }

        if (!Validation.checkInput(this.state.email, 'email')) {
            invalid.push('email')
        }

        if (!Validation.checkPhoneNo(this.state.phone_no)) {
            invalid.push('phone_no')
        }

        if (!Validation.checkInput(this.state.password, 'password')) {
            invalid.push('password')
        } else {
            //POST if passwords match and valid
            if (this.state.password === this.state.cpassword) {

                if (invalid.indexOf('password') == -1) {
                    var payload = {
                        user: {
                            fname: this.state.fname,
                            lname: this.state.lname,
                            email: this.state.email,
                            phone_no: this.state.phone_no,
                            type: this.state.teacher == true ? Constants.AccountTypes.Teacher:Constants.AccountTypes.Student,
                            password: this.state.password
                        },
                        recaptcha: this.state.recaptcha
                    }

                    this.props.signup(payload)
                }
            } else {
                invalid.push('cpassword')
            }
        }

        if (invalid.length > 0)
            this.setState(
                {
                    ...this.state,
                    invalid: invalid
                }
            )
    }

    error(props) {
        if (this.state.invalid.indexOf(props.name) != -1)
            return (
                <Message compact error header="Error" content={props.message} />
            )
        
        return <div />
    }

    render() {
        const opts = [
            {key: 'no', text:'No', value: false},
            {key: 'yes', text:'Yes', value: true}
        ]

        if (!this.props.isSuccessful)
            return (
                <div>
                    {this.props.error != null ? <Message compact error header="Error" content={this.props.error} />:<div/>}
                    <Form onSubmit={this.onSubmit} loading={this.props.isPosting} error={this.state.invalid.length > 0}>
                        <Segment compact>
                            <Form.Input name='fname' placeholder='John' label='First Name' onChange={this.onChange} error={this.state.invalid.indexOf('fname') != -1} />
                            <this.error name='fname' message='Empty or invalid name entered!' />
                            <Form.Input name='lname' placeholder='Doe' label ='Last Name' onChange={this.onChange} error={this.state.invalid.indexOf('lname') != -1} />
                            <this.error name='lname' message='Empty or invalid name entered!' />
                            {this.props.admin ? <div />:                        
                            <Form.Select name='teacher' options={opts} label='Are you a teacher?' onChange={this.onChange} />
                            }
                            <Form.Input name='email' placeholder='email@example.com' label='Email' onChange={this.onChange} error={this.state.invalid.indexOf('email') != -1} />
                            <this.error name='email' message='Empty or invalid email entered!' />
                            <Form.Input name='phone_no' placeholder='(123) 456-9123' label='Phone Number' onChange={this.onChange} error={this.state.invalid.indexOf('phone_no') != -1} />
                            <this.error name='phone_no' message='Empty or invalid phone number entered!' />
                            <Form.Input name='password' placeholder='Password' label='Password' type='password' onChange={this.onChange} error={this.state.invalid.indexOf('password') != -1} />
                            <this.error name='password' message='Empty or invalid password entered! Must contain at least 1 number, capital letter and special character. Length must be 8 to 15 characters long.' />
                            <Form.Input name='cpassword' placeholder='Confirm Password' label='Confirm Password' type='password' onChange={this.onChange} error={this.state.invalid.indexOf('cpassword') != -1} />
                            <this.error name='cpassword' message='Passwords do not match!' />
                            
                            {this.props.admin ? <div />: <div>
                            <Divider dividing> Please check the box below </Divider>
                            <ReCAPTCHA ref='recaptcha' sitekey='6Lc7XlEUAAAAAEL3vtJka2Uxhs_AzUEyaX7UlfFM' onChange={this.onRecaptcha} />
                            <Divider dividing />
                            </div>
                            }
                            
                            <Form.Button disabled={this.props.admin ? false:this.state.recaptcha == null}>Sign Up</Form.Button>
                        </Segment>
                    </Form>
                </div>
            )
        else
            if (!this.props.admin)
                return (
                    <Container textAlign='center'>
                        <Segment basic>
                            <Header textAlign='center' size='huge'>Email verification sent.</Header>
                        </Segment>
                        <Segment basic>
                            <Icon name='check' size='huge' />
                        </Segment>
                        <Segment basic>
                            <Header textAlign='center' size='huge'>You will be contacted shortly!</Header>
                        </Segment>
                    </Container>
                )
            else
                return (
                    <div />
                )
    }
}

SignupForm.defaultProps = {
    admin: false
}