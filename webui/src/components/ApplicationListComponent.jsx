import React, { Component } from 'react';
import TableHeader, { Segment, Accordion, Table } from 'semantic-ui-react';

export default class ApplicationListComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeIndex: -1
        }

        this.title = this.title.bind(this);
        this.content = this.content.bind(this);
        this.list = this.list.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    title(props) {
        return [
                <Table.Cell>{props.id}</Table.Cell>,
                <Table.Cell>{props.lname}, {props.fname}</Table.Cell>,
                <Table.Cell>{props.email}</Table.Cell>,
                <Table.Cell>{props.date}</Table.Cell>
            ]
    }

    content(props) {
        //Display body when done loading

        return (
            <Accordion.Content as={Table.Row} active={props.index === this.state.activeIndex} index={props.index} style={{display:props.index === this.state.activeIndex ? 'table-row':'none'}}>
                <Table.Cell colspan="4">
                    This is test content hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
                </Table.Cell>
            </Accordion.Content>
        )
    }

    list() {
        return this.props.data.map( (v, i) => {
            return [ 
                <Accordion.Title key={i} as={Table.Row} active={i === this.state.activeIndex} index={i} onClick={this.onClick}>
                    <this.title id={v.id} type={v.type} fname={v.fname} lname={v.lname} email={v.email} date={v.date} />
                </Accordion.Title>,
                <this.content index={i} id={v.id} />
            ]
        }, this)
    }

    onClick(e, titleProps) {
        const { index } = titleProps;
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({
            activeIndex: newIndex
        });
    }

    render() {
        return (
            <Table singleLine structured basic='very' columns="4">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Application ID</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>DOB</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Accordion as={Table.Body} fluid styled>
                    <this.list />
                </Accordion>
            </Table>
        )
    }
}