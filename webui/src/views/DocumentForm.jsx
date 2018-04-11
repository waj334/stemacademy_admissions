import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';

import ApplicationForm from '../components/ApplicationForm.jsx'

import FileListComponent from '../components/FileListComponent.jsx';

export default class DocumentForm extends ApplicationForm {
    constructor(props) {
        super(props);

        this.onDrop = this.onDrop.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    onDrop(accepted, rejected) {
        if (!this.props.readOnly)
            this.setState(
                {
                    files: [
                        ...this.state.files,
                        ...accepted
                    ]
                }
            )
    }

    onRemove(index) {
        if (!this.props.readOnly) {
            this.state.files.splice(index, 1);
            this.setState({
                files: [
                    ...this.state.files
                ]
            })
        }
    }

    form() {
        return (
            <FileListComponent files={this.state.files} onDrop={this.onDrop} onRemove={this.onRemove} readOnly={this.props.readOnly}/>
        )
    }
}