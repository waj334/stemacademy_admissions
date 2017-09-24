import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Segment, Container, Button, Header, Grid, Divider, Step, Icon, Form} from 'semantic-ui-react';

import FormStepGroup from './FormStepGroup.jsx';

class Application extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current: 0,
            progress: 0,
            data: props.data
        }

        this.onStepToggle = this.onStepToggle.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onCommit = this.onCommit.bind(this);
    }

    onCommit(id, data){
        var newState = this.state;

        newState.data[id] = data;
        this.setState(newState);
    }

    onStepToggle(id) {
        console.log(id, 'activated');
        this.setState(prev => ({
            current: id,
            progress: prev.progress,
            data: prev.data
        }))
    }

    onNext() {
        var newState = this.state;
        this.setState(prev => {

            newState.current = prev.current < (this.props.forms.length-1) ? prev.current+1:prev.current;
            newState.progress = prev.current == prev.progress ? ++prev.progress:prev.progress;

            return newState;
        });
    }

    render() {
        return (
        <div style={{height:'100vh', 'overflow-y':'hidden'}}>
            <Segment basic style={{'max-height':'6%', 'overflow-y':'hidden'}}>
                <Header textAlign='center' size='large'>{this.props.header}</Header>
            </Segment>
            <Segment basic style={{'height':'15%', 'overflow-y':'hidden', 'padding-top':0}}>
                <FormStepGroup steps={this.props.forms} onStepToggle={this.onStepToggle} current={this.state.current} progress={this.state.progress}/>
            </Segment>
            <Segment basic style={{'height':'66%', 'overflow-y':'auto', 'padding-top':0}}>
                <Container>
                    {this.props.forms[this.state.current].page != null ? React.createElement(this.props.forms[this.state.current].page, 
                            {
                                data: this.state.data, 
                                onCommit:this.onCommit, 
                                id:this.state.current,
                                onNext:this.onNext
                                },
                                null):<div/>
                    }
                </Container>
            </Segment>
            <Segment basic style={{'height':'10%', 'padding-top':0}}>
                <Container textAlign='center'>
                    (C) Department of Computer Science, Tuskegee University.
                </Container>
            </Segment>
        </div>   
    )}
}

export default Application;