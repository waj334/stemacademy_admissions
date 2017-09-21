import React, { Component } from 'react';
import {Step, Icon} from 'semantic-ui-react';

import FormStep from './FormStep.jsx';

export default class FormStepGroup extends Component {
    constructor(props){
        super(props);

        this.build = this.build.bind(this);
    }

    build(data, i) {
        return <FormStep id={i} icon={data.icon} title={data.title} desc={data.desc} onToggle={this.props.onStepToggle} 
            active={this.props.current == i} 
            disabled={this.props.progress < i} />;
    }

    render() {
        return (
            <Step.Group fluid>
                {this.props.steps.map(this.build, this)}
            </Step.Group>
    )}
}