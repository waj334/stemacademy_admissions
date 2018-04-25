import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tab, { Table, Input, Button, Header, Container } from 'semantic-ui-react';
import TableCell from 'semantic-ui-react';

export default class RosterComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data
        }

        this.onChange = this.onChange.bind(this);
        this.onUpdate = this. onUpdate.bind(this);
        this.content = this.content.bind(this);
    }

    onChange(e, {name, value}) {
        var id = name.slice(1);
        var index =  this.state.data.findIndex((e) => {
            return e.id === id
        })

        if (index != -1) {
            if (name[0] === 'g') {
                this.state.data[index].group_name = value;
            } else {
                this.state.data[index].room = value;
            }
        }

        this.setState(this.state);
    }

    onUpdate() {
        this.props.onUpdate(this.state.data);
    }

    content() {
        if (this.state.data.length === 0) {
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
        return this.state.data.map( (v, i) => {
            return [
                <Table.Row>
                    <Table.Cell>
                        {v.lname+', '+v.fname}
                    </Table.Cell>
                    <Table.Cell>
                        <Input name={'g'+v.id} value={v.group_name} onChange={this.onChange} />
                    </Table.Cell>
                    <Table.Cell>
                        <Input name={'r'+v.id} value={v.room} onChange={this.onChange} />
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
                            <Button onClick={this.onUpdate}>Update</Button>
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