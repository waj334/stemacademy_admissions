import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';

import ApplicationForm from '../components/ApplicationForm.jsx';
import * as ValidationHelper from '../ValidationHelper.jsx';

class PersonalInfoForm extends ApplicationForm {
    constructor(props) {
        super(props);

        this.validate = this.validate.bind(this);
        this.onNext = this.onNext.bind(this);
    }

validate(data) {
        var pass = true;

        //Discard old error list
        this.state.err = []

        if (!ValidationHelper.checkInput(data.fname, 'name')) {
            this.state.err.push('fname');
            pass = false;
        }

        if (!ValidationHelper.checkInput(data.lname, 'name')) {
            this.state.err.push('lname');
            pass = false;
        }

        if (!ValidationHelper.checkInput(data.age, 'age')) {
            this.state.err.push('age');
            pass = false;
        }

        if (!ValidationHelper.checkInput(data.gender, 'gender')) {
            this.state.err.push('gender');
            pass = false;
        }

        if (!ValidationHelper.checkInput(data.ethnicity, 'ethnicity')) {
            this.state.err.push('ethnicity');
            pass = false;
        }

        if (!ValidationHelper.checkInput(data.citizenship, 'citizenship')) {
            this.state.err.push('citizenship');
            pass = false;
        }

        if (!ValidationHelper.checkInput(data.email, 'email')) {
            this.state.err.push('email');
            pass = false;
        }

        if (!ValidationHelper.checkPhoneNo(data.phone_no)) {
            this.state.err.push('phone_no');
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

        return (
        <Form>
            <Form.Group widths='equal'>
                <Form.Input label='First Name' placeholder='First Name' name='fname' value={this.state.fname} onChange={this.onChange} readOnly={this.props.readOnly} />
                <Form.Input label='Last Name' placeholder='Last Name' name='lname' value={this.state.lname} onChange={this.onChange} readOnly={this.props.readOnly} />
                <Form.Input width={4} label='Age' placeholder='Age' name='age' value={this.state.age} onChange={this.onChange} readOnly={this.props.readOnly} />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Select label='Gender' options={gender_opts} name='gender' placeholder='Choose One' value={this.state.gender} onChange={this.onChange} disabled={this.props.readOnly} />
                <Form.Select label='Ethnicity' options={ethnicity_opts} name='ethnicity' placeholder='Choose One' value={this.state.ethnicity} onChange={this.onChange} disabled={this.props.readOnly} />
                <Form.Select label='Citizenship Status' options={citizenship_opts} name='citizenship' placeholder='Choose One' value={this.state.citizenship} onChange={this.onChange} disabled={this.props.readOnly} />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input label='Email' name='email' placeholder='Email' value={this.state.email} onChange={this.onChange} readOnly={this.props.readOnly} />
                <Form.Input label='Phone Number' name='phone_no' placeholder='Phone Number' value={this.state.phone_no} onChange={this.onChange} readOnly={this.props.readOnly} />
            </Form.Group>
            <Form.Input label='Street Address' name='street' placeholder='Street Address' value={this.state.street} onChange={this.onChange} readOnly={this.props.readOnly} />
            <Form.Group widths='equal'>
                <Form.Input label='City' name='city' placeholder='City' value={this.state.city} onChange={this.onChange} readOnly={this.props.readOnly} />
                <Form.Input label='State' name='state' placeholder='State' value={this.state.state} onChange={this.onChange} readOnly={this.props.readOnly} />
                <Form.Input label='Zip Code' name='zip' placeholder='Zip Code' value={this.state.zip} onChange={this.onChange} readOnly={this.props.readOnly} />
            </Form.Group>
        </Form>
    )}
}

export default PersonalInfoForm;