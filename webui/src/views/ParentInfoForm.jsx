import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';

import ApplicationForm from '../components/ApplicationForm.jsx';

class ParentInfoForm extends ApplicationForm {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input label='First Name' placeholder='First Name' name='contact_fname' value={this.state.contact_fname} onChange={this.onChange} readOnly={this.props.readOnly} />
                    <Form.Input label='Last Name' placeholder='Last Name' name='contact_lname' value={this.state.contact_lname} onChange={this.onChange} readOnly={this.props.readOnly} />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input label='Phone Number' placeholder='Phone Number' name='contact_phone_no' value={this.state.contact_phone_no} onChange={this.onChange} readOnly={this.props.readOnly} />
                    <Form.Input label='Email' placeholder='Email' name='contact_email' value={this.state.contact_email} onChange={this.onChange} readOnly={this.props.readOnly} />
                </Form.Group>
            </Form>
        )
    }
}

export default ParentInfoForm;