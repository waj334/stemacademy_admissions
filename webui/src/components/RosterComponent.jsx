import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tab, { Table, Input, Button, Header, Container } from 'semantic-ui-react';
import TableCell from 'semantic-ui-react';

export default class RosterComponent extends Component {
    constructor(props) {
        super(props);

        this.content = this.content.bind(this);
    }

    content() {
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
                <Table.Row>
                    <Table.Cell>
                        {v.lname+', '+v.fname}
                    </Table.Cell>
                    <Table.Cell>
                        <Input name={'g'+v.id} value={v.group_name} />
                    </Table.Cell>
                    <Table.Cell>
                        <Input name={'r'+v.id} value={v.room} />
                    </Table.Cell>
                </Table.Row>
            ]
        }, this)
    }

    render() {
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            Name
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Group
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Room
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <this.content />
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.Cell colspan='3'>
                            <Button>Update</Button>
                        </Table.Cell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        )
    }
}

RosterComponent.defaultProps = {
    data: []
}