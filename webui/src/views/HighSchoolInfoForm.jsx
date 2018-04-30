import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';

import ApplicationForm from '../components/ApplicationForm.jsx'
import * as ValidationHelper from '../ValidationHelper.jsx';

class HighSchoolInfoForm extends ApplicationForm {
    constructor(props) {
        super(props);
    }

    validate() {
        var pass = true;

        //Discard old error list
        this.state.err = []

        if (this.state.school_name.length === 0) {
            this.state.err.push('school_name');
            pass = false;
        }

        if (this.state.school_county.length === 0) {
            this.state.err.push('school_county');
            pass = false;
        }

        if (!ValidationHelper.checkPhoneNo(this.state.school_phone_no)) {
            this.state.err.push('school_phone_no');
            pass = false;
        }

        if (this.state.school_street.length === 0) {
            this.state.err.push('school_street');
            pass = false;
        }

        if (this.state.school_city.length === 0) {
            this.state.err.push('school_city');
            pass = false;
        }

        if (this.state.school_state.length === 0) {
            this.state.err.push('school_state');
            pass = false;
        }

        if (!ValidationHelper.checkInput(this.state.school_zip, 'zip')) {
            this.state.err.push('school_zip');
            pass = false;
        }

        if (!pass) {
            this.setState(this.state);
        }

        return pass;
    }
    form() {
        const state_opts = [
            {text:'Alabama', value:'AL'},
            {text:'Alaska', value:'AK'},
            {text:'Arizona', value:'AZ'},
            {text:'Arkansas', value:'AR'},
            {text:'California', value:'CA'},
            {text:'Colorado', value:'CO'},
            {text:'Connecticut', value:'CT'},
            {text:'Delaware', value:'DE'},
            {text:'District of Columbia', value:'DC'},
            {text:'Florida', value:'FL'},
            {text:'Georgia', value:'GA'},
            {text:'Hawaii', value:'HI'},
            {text:'Idaho', value:'ID'},
            {text:'Illinois', value:'IL'},
            {text:'Indiana', value:'IN'},
            {text:'Iowa', value:'IA'},
            {text:'Kansas', value:'KS'},
            {text:'Kentucky', value:'KY'},
            {text:'Louisiana', value:'LA'},
            {text:'Maine', value:'ME'},
            {text:'Maryland', value:'MD'},
            {text:'Massachusetts', value:'MA'},
            {text:'Michigan', value:'MI'},
            {text:'Minnesota', value:'MN'},
            {text:'Mississippi', value:'MS'},
            {text:'Missouri', value:'MO'},
            {text:'Montana', value:'MT'},
            {text:'Nebraska', value:'NE'},
            {text:'Nevada', value:'NV'},
            {text:'New Hampshire', value:'NH'},
            {text:'New Jersey', value:'NJ'},
            {text:'New Mexico', value:'NM'},
            {text:'New York', value:'NY'},
            {text:'North Carolina', value:'NC'},
            {text:'North Dakota', value:'ND'},
            {text:'Ohio', value:'OH'},
            {text:'Oklahoma', value:'OK'},
            {text:'Oregon', value:'OR'},
            {text:'Pennsylvania', value:'PA'},
            {text:'Rhode Island', value:'RI'},
            {text:'South Carolina', value:'SC'},
            {text:'South Dakota', value:'SD'},
            {text:'Tennessee', value:'TN'},
            {text:'Texas', value:'TX'},
            {text:'Utah', value:'UT'},
            {text:'Vermont', value:'VT'},
            {text:'Virginia', value:'VA'},
            {text:'Washington', value:'WA'},
            {text:'West Viginia', value:'WV'},
            {text:'Wisconsin', values:'WI'},
            {text:'Wyoming', value:'WY'}
        ]

        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input label='High School' placeholder='High School' name='school_name' value={this.state.school_name} onChange={this.onChange} readOnly={this.props.readOnly} error={this.state.err.includes('school_name')} />
                    <Form.Input label='County' placeholder='County' name='school_county' value={this.state.school_county} onChange={this.onChange} readOnly={this.props.readOnly} error={this.state.err.includes('school_county')} />
                </Form.Group>
                <Form.Input label='Phone Number' placeholder='Phone Number' name='school_phone_no' value={this.state.school_phone_no} onChange={this.onChange} readOnly={this.props.readOnly} error={this.state.err.includes('school_phone_no')} />
                <Form.Input label='Street Address' name='school_street' placeholder='Street Address' value={this.state.school_street} onChange={this.onChange} readOnly={this.props.readOnly} error={this.state.err.includes('school_street')} />
                <Form.Group widths='equal'>
                    <Form.Input label='City' name='school_city' placeholder='City' value={this.state.school_city} onChange={this.onChange} readOnly={this.props.readOnly} error={this.state.err.includes('school_city')} />
                    <Form.Select label='State' name='school_state' options={state_opts} placeholder='Select State' value={this.state.school_state} onChange={this.onChange} disabled={this.props.readOnly} error={this.state.err.includes('school_state')} />
                    <Form.Input label='Zip Code' name='school_zip' placeholder='Zip Code' value={this.state.school_zip} onChange={this.onChange} readOnly={this.props.readOnly} error={this.state.err.includes('school_zip')} />
                </Form.Group>
            </Form>
        )
    }
}

export default HighSchoolInfoForm;