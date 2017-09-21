import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';

class ApplicationForm extends Component {
    constructor(props) {
        super(props);

        this.state = props.data[this.props.id];

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e, {name,value}) {
        this.setState({[name]: value});
        this.props.onCommit(this.props.id, this.state);
    }

    onSubmit() {
        this.props.onCommit(this.props.id, this.state);
        this.props.onNext();
    }
}

export default ApplicationForm;