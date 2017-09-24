import React, { Component } from 'react';
import {Form, Button} from 'semantic-ui-react';

import ApplicationForm from '../ApplicationForm.jsx'

class SubjectField extends Component {
    constructor(props) {
        super(props);

        this.onRemove = this.onRemove.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onRemove() {
        this.props.onRemove(this.props.index)
    }

    onChange(e, {name,value}) {
        this.props.onChange(this.props.index, value);
    }
    render() {
        return (
        <Form.Group fluid>
            <Form.Input placeholder='Enter Subject Name' value={this.props.value} onChange={this.onChange} />
            {this.props.index != 0 ? <Form.Button circular icon='delete' onClick={this.onRemove} type='button'/>:<div />}
        </Form.Group>
        )
    }
}

class SubjectForm extends ApplicationForm {
    constructor(props) {
        super(props);

        this.onRemove = this.onRemove.bind(this);
        this.onAdd = this.onAdd.bind(this);
    }

    onRemove(index) {
        this.setState(prev => {
            subjects: prev.subjects.splice(index, 1);
        })
    }

    onAdd() {
        var newState = this.state;
        newState.subjects.push('');
        this.setState(newState);
    }

    onChange(index, value) {
        var newState = this.state;
        newState.subjects[index] = value;
        this.setState(newState);
    }

    build(data, i) {
        return <SubjectField value={data} index={i} onRemove={this.onRemove} onChange={this.onChange} />
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.onSubmit} fluid>
                    {this.state.subjects.map(this.build, this)}
                    <Form.Button content='Add Another' type='button' onClick={this.onAdd} />
                    <Form.Button content='Next' floated='right' />
                </Form>
            </div>
        )
    }
}

export default SubjectForm;