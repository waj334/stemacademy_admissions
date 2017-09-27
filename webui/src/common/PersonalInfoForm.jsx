import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';

import ApplicationForm from '../ApplicationForm.jsx'

class PersonalInfoForm extends ApplicationForm {
    constructor(props) {
        super(props);
    }

validate(data) {
        var pass = true;

        //Discard old error list
        this.state.err = []

        if (!checkInput(data.fname, 'name')) {
            this.state.err.push('fname');
            pass = false;
        }

        if (!checkInput(data.lname, 'name')) {
            this.state.err.push('lname');
            pass = false;
        }

        if (!checkInput(data.age, 'age')) {
            this.state.err.push('age');
            pass = false;
        }

        if (!checkInput(data.gender, 'gender')) {
            this.state.err.push('gender');
            pass = false;
        }

        if (!checkInput(data.ethnicity, 'ethnicity')) {
            this.state.err.push('ethnicity');
            pass = false;
        }

        if (!checkInput(data.citizenship, 'citizenship')) {
            this.state.err.push('citizenship');
            pass = false;
        }

        if (!checkInput(data.email, 'email')) {
            this.state.err.push('email');
            pass = false;
        }

        if (!checkPhoneNo(data.phone_no)) {
            this.state.err.push('phone_no');
            pass = false;
        }

        if (!pass) {
            this.setState(this.state);
        }

        return pass;
    }

    render() {
        const gender_opts = [
            {key: 'm', text:'Male', value:'m'},
            {key: 'f', text:'Female', value:'f'},
        ]

        const ethnicity_opts = [
            {key: 'aa', text:'African American', value:'aa'},
            {key: 'a', text:'Asian', value:'a'},
            {key: 'c', text:'Caucaision', value:'c'},
            {key: 'l', text:'Hispanic/Latino', value:'l'},
            {key: 'na', text:'Native American/Alaskan Native', value:'na'},
            {key: 'nh', text:'Native Hawaiian', value:'nh'},
            {key: 'o', text:'Other', value:'o'},
        ]

        const citizenship_opts = [
            {key: 'uc', text:'US Citizen', value:'uc'},
            {key: 'dc', text:'Dual Citizenship', value:'dc'},
            {key: 'nc', text:'Non US Citizen', value:'nc'},
        ]

        return (
        <Form onSubmit={this.onSubmit}>
            <Form.Group widths='equal'>
                <Form.Input label='First Name' placeholder='First Name' name='fname' value={this.state.fname} onChange={this.onChange} />
                <Form.Input label='Last Name' placeholder='Last Name' name='lname' value={this.state.lname} onChange={this.onChange} />
                <Form.Input width={4} label='Age' placeholder='Age' name='age' value={this.state.age} onChange={this.onChange} />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Select label='Gender' options={gender_opts} name='gender' placeholder='Choose One' value={this.state.gender} onChange={this.onChange} />
                <Form.Select label='Ethnicity' options={ethnicity_opts} name='ethnicity' placeholder='Choose One' value={this.state.ethnicity} onChange={this.onChange} />
                <Form.Select label='Citizenship Status' options={citizenship_opts} name='citizenship' placeholder='Choose One' value={this.state.citizenship} onChange={this.onChange} />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input label='Email' name='email' placeholder='Email' value={this.state.email} onChange={this.onChange} />
                <Form.Input label='Phone Number' name='phone_no' placeholder='Phone Number' value={this.state.phone_no} onChange={this.onChange} />
            </Form.Group>
            <Form.Input label='Street Address' name='street_addr' placeholder='Street Address' value={this.state.street_addr} onChange={this.onChange} />
            <Form.Group widths='equal'>
                <Form.Input label='City' name='city' placeholder='City' value={this.state.city} onChange={this.onChange} />
                <Form.Input label='State' name='state' placeholder='State' value={this.state.state} onChange={this.onChange} />
                <Form.Input label='Zip Code' name='zip' placeholder='Zip Code' value={this.state.zip} onChange={this.onChange} />
            </Form.Group>
            <Form.Button content='Next' floated='right' />
        </Form>
    )}
}

export default PersonalInfoForm;