import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Container, Table, Button, Icon, Message } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

function mapStateToProps(state, props) {
    return {

    }
}

function mapDispatchToProps(dispatch, props) {
    return {

    }
}

class RemoveButton extends Component {
    constructor(props) {
        super(props);
        this.onRemove = this.onRemove.bind(this);
    }

    onRemove() {
        this.props.onRemove(this.props.index);
    }

    render() {
        return (
            <Button circular onClick={this.onRemove}>
                <Icon name='delete'/>
                Remove
            </Button>
        )
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class FileListComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            files: []
        };

        this.fileTable = this.fileTable.bind(this);
        this.dropzoneRef = null;
    }

    filetypes() {
        return 'image/jpeg, application/pdf, application/msword'
    }

    fileTable() {
        var list = [];
        var i = 0;

        for (var file in this.props.files) {
            list.push(
                <Table.Row>
                    <Table.Cell>{this.props.files[file].name}</Table.Cell>
                    {this.props.readOnly == false ? <Table.Cell content={<RemoveButton index={i++} onRemove={this.props.onRemove}/>} />  : <div/> } 
                </Table.Row>                    
            )
        }

        return list
    }

    render() {
        return (
            <Segment>
                <Dropzone accept={this.filetypes()} onDrop={this.props.onDrop} disableClick={true} ref={(node) => {this.dropzoneRef = node;}} style={{width: '100%', minHeight: '200px'}}>
                    <Container>
                    {this.props.readOnly == false ? <Message info>Drag and drop files or click button below. Only doc, docx, pdf and jpeg files are allowed.</Message> : <div /> }
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>File</Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <this.fileTable />
                            </Table.Body>
                        </Table>
                    </Container>
                </Dropzone>
                {this.props.readOnly == false ? <Segment basic><Button onClick={() => {this.dropzoneRef.open() }}>Choose a file</Button></Segment> : <div /> }
            </Segment>
        )
    }
}

FileListComponent.defaultProps = {
    readOnly: false
}