import React, { Component } from 'react';
import { Segment, Accordion, Table } from 'semantic-ui-react';

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
        return (
            <Table singleLine basic='very'>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>{props.id}</Table.Cell>
                        <Table.Cell>{props.lname}, {props.fname}</Table.Cell>
                        <Table.Cell>{props.email}</Table.Cell>
                        <Table.Cell>{props.date}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        )
    }

    content(id) {
        //Display body when done loading

        return (
            <div>
                This is test content
            </div>
        )
    }

    list() {
        return this.props.data.map( (v, i) => {
            return (
                <Accordion key={i} fluid styled>
                    <Accordion.Title active={i === this.state.activeIndex} index={i} onClick={this.onClick}>
                        <this.title id={v.id} type={v.type} fname={v.fname} lname={v.lname} email={v.email} date={v.date} />
                    </Accordion.Title>
                    <Accordion.Content active={i === this.state.activeIndex} index={i}>
                        <this.content id={v.id} />
                    </Accordion.Content>
                </Accordion>
            )
        }, this)
    }

    onClick(e, titleProps) {
        const { index } = titleProps;
        const { activeIndex } = this.state.activeIndex;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({
            activeIndex: newIndex
        });
    }

    render() {
        return (
            <this.list />
        )
    }
}