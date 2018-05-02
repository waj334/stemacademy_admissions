import React, { Component } from 'react';
import {connect} from 'react-redux';
import TableHeader, { Segment, Accordion, Table, Button, Select, Loader, Header, Form, Container } from 'semantic-ui-react';
import StudentConfirmationForm from '../views/StudentConfirmationForm.jsx';
import TeachConfirmationForm from '../views/TeacherConfirmationForm.jsx';

import * as Helpers from '../Helpers.jsx';
import TableRow from 'semantic-ui-react';

class UpdateField extends Component {
    constructor(props) {
        super(props);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onMouseOver() {
        this.props.onMouseOver(this.props.id);
    }

    onChange(e, {name,value}) {
        this.props.onSetAction(this.props.id, value);
    }

    options(status) {
        var opts = [
            {
                key: 'null',
                value: '',
                text: '(none)'
            }
        ]

        if (status.toUpperCase() === 'REJECTED' || status === '') {
            opts.push(
                {
                    key: 'accept',
                    value: 'accepted',
                    text: 'Accept'
                }
            )
        }

        if (status.toUpperCase() === 'ACCEPTED' || status === '') {
            opts.push(
                {
                    key: 'reject',
                    value: 'rejected',
                    text: 'Reject'
                }
            )
        }

        return opts
    }

    render() {
        return (
            <div>
                <Select placeholder='Select Action' options={this.options(this.props.status)} onChange={this.onChange}/>
                <Button primary onClick={this.onClick} onMouseOver={this.onMouseOver} onMouseLeave={this.props.onMouseLeave}>Update</Button>
            </div>
        )
    }
}
export default class ApplicationListComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeIndex: -1,
            buttonId: -1,
            actions:{}
        }

        this.title = this.title.bind(this);
        this.form = this.form.bind(this);
        this.content = this.content.bind(this);
        this.list = this.list.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onSetAction = this.onSetAction.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onUpdateAll = this.onUpdateAll.bind(this);
    }

    title(props) {
        var date = new Date(props.date);

        return [
                <Table.Cell>{props.id}</Table.Cell>,
                <Table.Cell>{props.lname}, {props.fname}</Table.Cell>,
                <Table.Cell>{props.email}</Table.Cell>,
                <Table.Cell>{date.toLocaleString()}</Table.Cell>,
                <Table.Cell>{Helpers.Cap(props.status)}</Table.Cell>,
                <Table.Cell><UpdateField id={props.id} status={props.status} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave} onSetAction={this.onSetAction}/></Table.Cell>
            ]
    }

    form(props) {
        switch (props.type) {
            case 0:
                return <StudentConfirmationForm data={this.props.appData.data} disableButton disableMessage />
            case 1:
                return <TeachConfirmationForm data={this.props.appData.data} disableButton disableMessage />
            default:
                return <div />
        } 
    }

    content(props) {
        //Display body when done loading
        if (this.props.appData !== undefined) {
            if (this.props.appData.state === 'success') {
                return (
                    <Accordion.Content style={{backgroundColor:'#FFFFFF'}} as={Table.Row} active={props.index === this.state.activeIndex} index={props.index} style={{display:props.index === this.state.activeIndex ? 'table-row':'none'}}>
                        <Table.Cell colspan="6">
                            <this.form type={props.type} />
                        </Table.Cell>
                    </Accordion.Content>
                )
            } else if (this.props.appData.state === 'fetching') {
                return (
                    <Accordion.Content style={{backgroundColor:'#FFFFFF'}} as={Table.Row} active={props.index === this.state.activeIndex} index={props.index} style={{display:props.index === this.state.activeIndex ? 'table-row':'none'}}>
                        <Table.Cell colspan="6">
                            <Loader active />
                        </Table.Cell>
                    </Accordion.Content>
                )
            }
        }

        return (
            <Accordion.Content style={{backgroundColor:'#FFFFFF'}} as={Table.Row} active={props.index === this.state.activeIndex} index={props.index} style={{display:props.index === this.state.activeIndex ? 'table-row':'none'}}>
                <Table.Cell colspan="6">
                    <Header centered size='small'>No Data</Header>
                </Table.Cell>
            </Accordion.Content>
        )
    }

    list() {
        if (this.props.data.length === 0) {
            return (
                <Table.Row>
                    <Table.Cell colspan='3'>
                        <Container textAlign='center'>
                            <Header>Empty</Header>
                        </Container>
                    </Table.Cell>
                </Table.Row>
            )
        }
        return this.props.data.map( (v, i) => {
            return [ 
                <Accordion.Title key={i} as={Table.Row} active={i === this.state.activeIndex} index={i} onClick={this.onClick}>
                    <this.title id={v.id} type={v.type} fname={v.fname} lname={v.lname} email={v.email} date={v.date} status={v.status} />
                </Accordion.Title>,
                <this.content index={i} id={v.id} type={v.type} />
            ]
        }, this)
    }

    onClick(e, titleProps) {
        if (this.state.buttonId == -1) {
            const { index } = titleProps;
            const { activeIndex } = this.state;
            const newIndex = activeIndex === index ? -1 : index;

            if (newIndex != -1) {
                this.props.getApp(this.props.data[newIndex].id);
            }

            this.setState({
                activeIndex: newIndex
            });
        } else {
            //Perform action
            this.onUpdate(this.state.buttonId);
        }
    }

    onMouseOver(id) {
        this.setState({
            buttonId: id
        });
    }

    onMouseLeave() {
        this.setState({
            buttonId: -1
        });
    }

    onSetAction(id, action) {
        this.setState({
            actions: {
                ...this.state.actions,
                [id]: action},
        })
    }

    onUpdate(id) {
        this.props.updateApp([
            {
                id: id,
                status: this.state.actions[id],
            }
        ])
    }

    onUpdateAll() {
        var list = [];

        Object.keys(this.state.actions).map((k) => {
            list.push({
                id: k,
                status: this.state.actions[k]
            });
        })

        this.props.updateApp(list);
    }

    render() {
        return (
            <Table singleLine structured basic='very' columns="6">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Application ID</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Date Submitted</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Accordion as={Table.Body} fluid styled>
                    <this.list />
                </Accordion>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='6'>
                            <Button floated='right' primary onClick={this.onUpdateAll}>Update All</Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        )
    }
}

ApplicationListComponent.defaultProps = {
    data: []
}