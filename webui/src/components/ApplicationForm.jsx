import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';

class ApplicationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.data[this.props.id],
            err: []
        }

        this.onChange = this.onChange.bind(this);
        this.hasError = this.hasError.bind(this);
    }

    componentWillUnmount() {
        //Strip err list from state
        delete this.state['err'];

        this.props.onCommit(this.props.id, this.state);
    }

    hasError(field) {
        if (this.state.err.find((e) => {return e === field;}) != undefined)
            return true;

        return false;
    }

    validate(data) {
        return true;
    }

    onChange(e, {name,value}) {
        this.setState(
            {
                [name]: value
            }
        );
    }
}

export default ApplicationForm;