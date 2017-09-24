import React, { Component } from 'react';
import {Form, Header} from 'semantic-ui-react';

import ApplicationForm from '../ApplicationForm.jsx'

class TeacherConfirmationForm extends ApplicationForm {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        //API call to process application data
        console.log(this.props.data);

        //Move to completion page
        this.props.onNext();
    }

    buildSubject(data, i) {
        return <Form.Input value={data} readOnly />
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
        <Header dividing>Your Personal Information</Header>
        <Form.Group widths='equal'>
            <Form.Input label='First Name' value={this.props.data[0].fname} readOnly/>
            <Form.Input label='Last Name' value={this.props.data[0].lname} readOnly/>
            <Form.Input width={4} label='Age' value={this.props.data[0].age} readOnly/>
        </Form.Group>
        <Form.Group widths='equal'>
            <Form.Select label='Gender' options={gender_opts} value={this.props.data[0].gender} readOnly />
            <Form.Select label='Ethnicity' options={ethnicity_opts} value={this.props.data[0].ethnicity} readOnly />
            <Form.Select label='Citizenship Status' options={citizenship_opts} value={this.props.data[0].citizenship} readOnly />
        </Form.Group>
        <Form.Group widths='equal'>
            <Form.Input label='Email' value={this.props.data[0].email} readOnly />
            <Form.Input label='Phone Number' value={this.props.data[0].phone_no} readOnly />
        </Form.Group>
        <Form.Input label='Street Address' value={this.props.data[0].street_addr} readOnly />
        <Form.Group widths='equal'>
            <Form.Input label='City' value={this.props.data[0].city} readOnly />
            <Form.Input label='State' value={this.props.data[0].state} readOnly />
            <Form.Input label='Zip Code' value={this.props.data[0].zip} readOnly />
        </Form.Group>
        <Header dividing>Emergency Contact</Header>
        <Form.Group widths='equal'>
            <Form.Input label='First Name' value={this.props.data[1].em_fname} onChange={this.onChange} readOnly />
            <Form.Input label='Last Name' value={this.props.data[1].em_lname} onChange={this.onChange} readOnly />
        </Form.Group>
        <Form.Group widths='equal'>
            <Form.Input label='Phone Number' value={this.props.data[1].em_phone_no} onChange={this.onChange} readOnly />
            <Form.Input label='Email' value={this.props.data[1].em_email} onChange={this.onChange} readOnly />
        </Form.Group>
        <Header dividing>High School Information</Header>
        <Form.Group widths='equal'>
            <Form.Input label='High School' value={this.props.data[2].hs_name} readOnly />
            <Form.Input label='County' value={this.props.data[2].hs_county} readOnly />
        </Form.Group>
        <Form.Input label='Phone Number' value={this.props.data[2].hs_phone_no} readOnly />
        <Form.Input label='Street Address' value={this.props.data[2].hs_street_addr} readOnly />
        <Form.Group widths='equal'>
            <Form.Input label='City' value={this.props.data[2].hs_city} readOnly />
            <Form.Input label='State' value={this.props.data[2].hs_state} readOnly />
            <Form.Input label='Zip Code' value={this.props.data[2].hs_zip} readOnly />
        </Form.Group>
        <Header dividing>Subjects Taught</Header>
        {this.props.data[3].subjects.map(this.buildSubject, this)}
        <Form.Button content='Submit' floated='right' />
    </Form>
    )}
}

export default TeacherConfirmationForm;