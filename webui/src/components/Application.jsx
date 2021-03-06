import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Segment, Container, Button, Header, Grid, Divider, Step, Icon, Form, Modal} from 'semantic-ui-react';

import * as ApplicationActions from '../actions/ApplicationActions.jsx';

import FormStepGroup from './FormStepGroup.jsx';

function mapStateToProps(state, ownProps) {
    return {
        page: state.applicationReducer.page,
        progress: state.applicationReducer.progress,
        isPosting: state.applicationReducer.isPosting,
        postFail: state.applicationReducer.postFail,
        err: state.applicationReducer.err,
        data: {
            ...ownProps.data,
            ...state.applicationReducer.data
        }
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        goto: (page, progress) => dispatch(ApplicationActions.actionApplicationGoto(page, progress)),
        next: (current, progress) => dispatch(ApplicationActions.nextPage(props.page, props.progress)),
        submit: (data, page, progress) => dispatch(ApplicationActions.submit(data, page, progress)),
        update: (data, page, progress) => dispatch(ApplicationActions.update(data, page, progress))
    }
}

@connect(mapStateToProps, mapDispatchToProps)
class Application extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            show: false
        };

        this.onStepToggle = this.onStepToggle.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onCommit = this.onCommit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.closeMessage = this.closeMessage.bind(this);
        this.displayForm = this.displayForm.bind(this);
        this.count = this.count.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.state.show = nextProps.postFail;
    }

    onCommit(id, data){
        var newData = {
            ...this.state.data,
            ...data
        }

        this.setState(
            {
                data: newData
            }
        )

        this.props.update(newData, this.props.page, this.props.progress)
    }

    onStepToggle(id) {
        this.props.goto(id, this.props.progress);
    }

    onNext() {
        if (this.props.forms.length-1) {
            var progress = this.props.progress;

            if (this.props.page == this.props.progress)
                progress = this.props.progress+1;

            this.props.goto(this.props.page+1, progress);
        }
    }

    onSubmit() {
        var data = {}

        /*for (var d in this.state.data) {
            for (var key in this.state.data[d]) {
                data[key] = this.state.data[d][key];
            }
        }*/

        this.props.submit(this.state.data, this.props.type, this.props.page, this.props.progress);
    }

    closeMessage() {
        this.state.show = false;
        this.setState(this.state);
    }

    count() {
        return this.props.forms.length
    }

    displayForm() {
        if (this.props.forms[this.props.page].page != null)
            this.state.form = React.createElement(
                this.props.forms[this.props.page].page, 
                {
                    data: this.state.data, 
                    onCommit:this.onCommit, 
                    id:this.props.page,
                    onNext:this.onNext,
                    onSubmit:this.onSubmit,
                    count: this.count
                },
                null)
        else
            this.state.form = <div/>

        return this.state.form;
    }

    render() {
        return (
        <div>
            <Modal open={this.state.show} onClose={this.closeMessage}>
                <Modal.Header>
                    <Container textAlign='center'>Error</Container>
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        {this.props.err}
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                        <Button onClick={this.closeMessage}>Ok</Button>
                    </Modal.Actions>
            </Modal>

            <Segment basic loading={this.props.isPosting} style={{height:'100vh', 'overflow-y':'hidden'}}>
                <Segment basic style={{'max-height':'6%', 'overflow-y':'hidden'}}>
                    <Header textAlign='center' size='large'>{this.props.header}</Header>
                </Segment>
                <Segment basic style={{'height':'15%', 'overflow-y':'hidden', 'padding-top':0}}>
                    <FormStepGroup steps={this.props.forms} onStepToggle={this.onStepToggle} current={this.props.page} progress={this.props.progress}/>
                </Segment>
                <Segment basic style={{'height':'66%', 'overflow-y':'auto', 'padding-top':0}}>
                    <Container>
                        <this.displayForm />
                    </Container>
                </Segment>
                <Segment basic style={{'height':'10%', 'padding-top':0}}>
                    <Container textAlign='center'>
                        (C) Department of Computer Science, Tuskegee University.
                    </Container>
                </Segment>
            </Segment>
        </div>  
    )}
}

export default Application;