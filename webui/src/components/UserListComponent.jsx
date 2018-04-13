import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Segment, Button, Table, Loader, Message } from 'semantic-ui-react';

import * as UserListActions from '../actions/UserListActions.jsx';

function mapStateToProps(state, props) {
    if (props.id in state.userListReducer)
        return {
            isFetching: state.userListReducer[props.id].isFetching,
            isDone: state.userListReducer[props.id].isDone,
            error: state.userListReducer[props.id].error,
            data: state.userListReducer[props.id].data
        }
    else
        return {
            isFetching: true,
            isDone: false,
            error: null,
            data: {}
        }
}

function mapDispatchToProps(dispatch, props) {
    return {
        getList: (id, type) => dispatch(UserListActions.getUserList(id, type))
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class UserListComponent extends Component {
    constructor(props) {
        super(props)

        this.row = this.row.bind(this);
        this.list = this.list.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        this.props.getList(this.props.id, this.props.type);
    }

    row(props) {
        return (
            <Table.Row>
                <Table.Cell>{props.email}</Table.Cell>
                <Table.Cell>{props.fname}</Table.Cell>
                <Table.Cell>{props.lname}</Table.Cell>
                <Table.Cell><Button>Approve</Button></Table.Cell>
            </Table.Row>
        )
    }

    list() {
        return this.props.data.map( (v, i) => {
            return (
                <this.row email={v.email} fname={v.fname} lname={v.lname} />
            )
        }, this)
    }

    onClick(e, titleProps) {

    }

    render() {
        if (this.props.isFetching == true) {
            return (
                <Loader active/>
            )
        }
        else if (this.props.isDone) {
            return (
                <Table singleLine basic='very'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>First Name</Table.HeaderCell>
                            <Table.HeaderCell>Last Name</Table.HeaderCell>
                            <Table.HeaderCell/>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <this.list />
                    </Table.Body>
                </Table>
            )
        }

        //There was some error
        return <Message error content={this.props.error} />
    }
}