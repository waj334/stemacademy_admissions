import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';

import ApplicationForm from '../components/ApplicationForm.jsx'

class HighSchoolInfoForm extends ApplicationForm {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input label='High School' placeholder='High School' name='hs_name' value={this.state.hs_name} onChange={this.onChange} />
                    <Form.Input label='County' placeholder='County' name='hs_county' value={this.state.hs_county} onChange={this.onChange} />
                </Form.Group>
                <Form.Input label='Phone Number' placeholder='Phone Number' name='hs_phone_no' value={this.state.hs_phone_no} onChange={this.onChange} />
                <Form.Input label='Street Address' name='hs_street_addr' placeholder='Street Address' value={this.state.hs_street_addr} onChange={this.onChange} />
                <Form.Group widths='equal'>
                    <Form.Input label='City' name='hs_city' placeholder='City' value={this.state.hs_city} onChange={this.onChange} />
                    <Form.Input label='State' name='hs_state' placeholder='State' value={this.state.hs_state} onChange={this.onChange} />
                    <Form.Input label='Zip Code' name='hs_zip' placeholder='Zip Code' value={this.state.hs_zip} onChange={this.onChange} />
                </Form.Group>
            </Form>
        )
    }
}

export default HighSchoolInfoForm;