import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';

import ApplicationForm from '../components/ApplicationForm.jsx'

class HighSchoolInfoForm extends ApplicationForm {
    constructor(props) {
        super(props);
    }

    form() {
        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input label='High School' placeholder='High School' name='school_name' value={this.state.school_name} onChange={this.onChange} readOnly={this.props.readOnly} />
                    <Form.Input label='County' placeholder='County' name='school_county' value={this.state.school_county} onChange={this.onChange} readOnly={this.props.readOnly} />
                </Form.Group>
                <Form.Input label='Phone Number' placeholder='Phone Number' name='school_phone_no' value={this.state.school_phone_no} onChange={this.onChange} readOnly={this.props.readOnly} />
                <Form.Input label='Street Address' name='school_street' placeholder='Street Address' value={this.state.school_street} onChange={this.onChange} readOnly={this.props.readOnly} />
                <Form.Group widths='equal'>
                    <Form.Input label='City' name='school_city' placeholder='City' value={this.state.school_city} onChange={this.onChange} readOnly={this.props.readOnly} />
                    <Form.Input label='State' name='school_state' placeholder='State' value={this.state.school_state} onChange={this.onChange} readOnly={this.props.readOnly} />
                    <Form.Input label='Zip Code' name='school_zip' placeholder='Zip Code' value={this.state.school_zip} onChange={this.onChange} readOnly={this.props.readOnly} />
                </Form.Group>
            </Form>
        )
    }
}

export default HighSchoolInfoForm;