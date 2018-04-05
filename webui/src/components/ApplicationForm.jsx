import React, { Component } from 'react';
import {Form, Button} from 'semantic-ui-react';

class ApplicationForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            ...props.data,
            err: []
        }

        this.form = this.form.bind(this);

        this.onChange = this.onChange.bind(this);
        this.onNext = this.onNext.bind(this);

        this.hasError = this.hasError.bind(this);
        this.displayButton = this.displayButton.bind(this);
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

    onNext() {
        if (this.props.readOnly == false) {
            delete this.state['err'];   //Strip err list from state
            this.props.onCommit(this.props.id, this.state);
        }

        this.props.onNext();
    }

    form() {
        return (
            <div/>
        )
    }

    displayButton() {
        if (!this.props.disableButton) {
            if (this.props.count()-1 == this.props.id)
                return  <Container textAlign='center'>
                            <Button content='Finish' floated='center' /> //Go to home page
                        </Container>
            if (this.props.count()-2 == this.props.id)
                return <Button content='Submit' floated='right' onClick={this.props.onSubmit} />

            return <Button content='Next' floated='right' onClick={this.onNext} />
        }

        return <div />
    }

    render() {
        return (
            <div>
                <this.form />
                <this.displayButton />
            </div>
        )
    }
}

ApplicationForm.defaultProps = {
    readOnly: false,
    disableButton: false
}

export default ApplicationForm;