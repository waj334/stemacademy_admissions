import React, { Component } from 'react';
import { Segment, Button, Table, Loader, Message, Icon, Modal, Header } from 'semantic-ui-react';
export default class UserListComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showDeleteModal: false,
            showResetModal: false,
            index: -1
        }

        this.row = this.row.bind(this);
        this.list = this.list.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    row(props) {
        var icon;

        if (props.type === 0)
            icon = 'student';
        else if (props.type === 1)
            icon = 'book';
        else
            icon = 'user';

        return (
            <Table.Row>
                <Table.Cell><Icon name={icon} /></Table.Cell>
                <Table.Cell>{props.email}</Table.Cell>
                <Table.Cell>{props.fname}</Table.Cell>
                <Table.Cell>{props.lname}</Table.Cell>
                <Table.Cell>
                    <Button color='blue' onClick={() => {this.setState({showResetModal:true, index: props.index})}}>Reset Password</Button>
                    <Button color='red' onClick={() => {this.setState({showDeleteModal:true, index: props.index})}}>Delete</Button>
                </Table.Cell>
            </Table.Row>
        )
    }

    list() {
        return this.props.data.map( (v, i) => {
            if (v.email !== localStorage.getItem('user-id')) {
                return (<this.row index={i} email={v.email} fname={v.fname} lname={v.lname} type={v.type}/>)
            }
        }, this)
    }

    onDelete() {
        this.props.onDelete(this.props.data[this.state.index].email);
        this.setState({showDeleteModal: false, index: -1});
    }

    onReset() {
        this.props.onReset(this.props.data[this.state.index].email);
        this.setState({showResetModal: false, index: -1});
    }

    render() {
        return (
            <div>
                <Modal open={this.state.showDeleteModal} onClose={()=>{this.setState({showDeleteModal: false, index: -1})}}>
                    <Header content='Delete user?' />
                    <Modal.Content>
                        <p>This action cannot be undone. All application data associated with this user will be deleted as well.</p>
                        <p>Do you wish to continue?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' onClick={()=>{this.setState({showDeleteModal: false, index: -1})}}>No</Button>
                        <Button color='green' onClick={this.onDelete}>Yes</Button>
                    </Modal.Actions>
                </Modal>
                <Modal open={this.state.showResetModal} onClose={()=>{this.setState({showResetModal: false, index: -1})}}>
                    <Header content='Reset password?' />
                    <Modal.Content>
                        <p>Send this user a password reset link?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' onClick={()=>{this.setState({showResetModal: false, index: -1})}}>No</Button>
                        <Button color='green' onClick={this.onReset}>Yes</Button>
                    </Modal.Actions>
                </Modal>
                <Table singleLine basic='very'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell />
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
            </div>
        )
    }
}

UserListComponent.defaultProps = {
    data: []
}