import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Step, Icon} from 'semantic-ui-react';

import FormStep from './FormStep.jsx';

export default class FormStepGroup extends Component {
    constructor(props){
        super(props);

        this.build = this.build.bind(this);
    }

    componentDidUpdate() {
        const thisDom = ReactDOM.findDOMNode(this);
        const stepDom = ReactDOM.findDOMNode(this.refs[this.props.current]);

        const thisRect = thisDom.getBoundingClientRect()
        const stepRect = stepDom.getBoundingClientRect()

        stepDom.scrollIntoView({behavior:'smooth', block:'center'});

        console.log(thisRect,stepRect,stepRect.x - thisRect.x);
    }

    build(data, i) {
        return <FormStep id={i} icon={data.icon} title={data.title} desc={data.desc} onToggle={this.props.onStepToggle} 
            active={this.props.current == i} 
            disabled={this.props.progress < i} 
            ref={i} />;
    }

    render() {
        console.log('steps renderd');

        return (
            <Step.Group fluid unstackable style={{'overflow-x':'scroll'}}>
                {this.props.steps.map(this.build, this)}
            </Step.Group>
    )}
}