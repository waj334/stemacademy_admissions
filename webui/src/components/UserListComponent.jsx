import React, { Component } from 'react';
import { Segment, Button, Table } from 'semantic-ui-react';

export default class UserListComponent extends Component {
    constructor(props) {
        super(props)

        this.row = this.title.bind(this);
        this.list = this.list.bind(this);
        this.onClick = this.onClick.bind(this);
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
}