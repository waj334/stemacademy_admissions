import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import ApplicationForm from '../components/ApplicationForm.jsx';
import * as ValidationHelper from '../ValidationHelper.jsx';

class PersonalInfoForm extends ApplicationForm {
    constructor(props) {
        super(props);

        this.validate = this.validate.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onDOB = this.onDOB.bind(this);
    }

validate() {
        var pass = true;

        //Discard old error list
        this.state.err = []

        if (this.state.dob === undefined) {
            this.state.err.push('dob');
            pass = false;
        }

        if (this.state.gender == -1) {
            this.state.err.push('gender');
            pass = false;
        }

        if (this.state.ethnicity == -1) {
            this.state.err.push('ethnicity');
            pass = false;
        }

        if (this.state.citizenship == -1) {
            this.state.err.push('citizenship');
            pass = false;
        }

        if (!ValidationHelper.checkInput(this.state.state, 'state')) {
            this.state.err.push('state');
            pass = false;
        }

        if (!ValidationHelper.checkInput(this.state.zip, 'zip')) {
            this.state.err.push('zip');
            pass = false;
        }

        if (this.state.city.length === 0) {
            this.state.err.push('city');
            pass = false;
        }

        if (this.state.street.length === 0) {
            this.state.err.push('street');
            pass = false;
        }

        if (this.state.state.length === 0) {
            this.state.err.push('state');
            pass = false;
        }

        if (!pass) {
            this.setState(this.state);
        }

        return pass;
    }

    onNext() {
        this.state.age = parseInt(this.state.age);
        ApplicationForm.prototype.onNext.call(this);
    }

    onDOB(date, e) {
        this.onChange(e, {name:'dob', value:date})
    }

    form() {
        const gender_opts = [
            {key: 'm', text:'Male', value: 0},
            {key: 'f', text:'Female', value: 1},
        ]

        const ethnicity_opts = [
            {key: 'aa', text:'African American', value:0},
            {key: 'a', text:'Asian', value:1},
            {key: 'c', text:'Caucaision', value:2},
            {key: 'l', text:'Hispanic/Latino', value:3},
            {key: 'na', text:'Native American/Alaskan Native', value:4},
            {key: 'nh', text:'Native Hawaiian', value:5},
            {key: 'o', text:'Other', value:6},
        ]

        const citizenship_opts = [
            {key: 'uc', text:'US Citizen', value:0},
            {key: 'dc', text:'Dual Citizenship', value:1},
            {key: 'nc', text:'Non US Citizen', value:2},
        ]

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
                <Form.Field readOnly={this.props.readOnly} error={this.state.err.includes('dob')} >
                    <label>Date Of Birth</label>
                    <DatePicker showYearDropdown onChange={this.onDOB} selected={this.state.dob} />
                </Form.Field>
                <Form.Select label='Gender' options={gender_opts} name='gender' placeholder='Choose One' value={this.state.gender} onChange={this.onChange} disabled={this.props.readOnly} error={this.state.err.includes('gender')} />
                <Form.Select label='Ethnicity' options={ethnicity_opts} name='ethnicity' placeholder='Choose One' value={this.state.ethnicity} onChange={this.onChange} disabled={this.props.readOnly} error={this.state.err.includes('ethnicity')}  />
                <Form.Select label='Citizenship Status' options={citizenship_opts} name='citizenship' placeholder='Choose One' value={this.state.citizenship} onChange={this.onChange} disabled={this.props.readOnly} error={this.state.err.includes('citizenship')}  />
            </Form.Group>
            <Form.Input label='Street Address' name='street' placeholder='Street Address' value={this.state.street} onChange={this.onChange} readOnly={this.props.readOnly} error={this.state.err.includes('street')} />
            <Form.Group widths='equal'>
                <Form.Input label='City' name='city' placeholder='City' value={this.state.city} onChange={this.onChange} readOnly={this.props.readOnly} error={this.state.err.includes('city')} />
                <Form.Select label='State' name='state' options={state_opts} placeholder='Select State' value={this.state.state} onChange={this.onChange} disabled={this.props.readOnly} error={this.state.err.includes('state')} />
                <Form.Input label='Zip Code' name='zip' placeholder='Zip Code' value={this.state.zip} onChange={this.onChange} readOnly={this.props.readOnly} error={this.state.err.includes('zip')} />
            </Form.Group>
        </Form>
    )}
}

export default PersonalInfoForm;