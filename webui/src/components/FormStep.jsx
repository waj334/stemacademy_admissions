import React, { Component } from 'react';
import {Step, Icon} from 'semantic-ui-react';

export default class FormStep extends Component {
    constructor(props){
        super(props);

        this.onToggle = this.onToggle.bind(this);
    }

    onToggle(){
        this.props.onToggle(this.props.id);
    }

    render() {
        return (
        <Step active={this.props.active} disabled={this.props.disabled} onClick={this.onToggle}>
            <Icon name={this.props.icon} />
            <Step.Content>
                <Step.Title>{this.props.title}</Step.Title>
                <Step.Description>{this.props.desc}</Step.Description>
            </Step.Content>
        </Step>
    )}
}