import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Container, Table, Button } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

function mapStateToProps(state, props) {
    return {

    }
}

function mapDispatchToProps(dispatch, props) {
    return {

    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class FileListComponent extends Component {
    constructor(props) {
        super(props)

        this.fileTable = this.fileTable.bind(this);
        this.dropzoneRef = null;
    }

    fileTable() {
        return []
    }

    render() {
        return (
            <Segment>
                <Dropzone ref={(node) => {this.dropzoneRef = node;}} style={{width: '100%', minHeight: '200px'}}>
                    <Container>
                        Drag and drop files or click button below
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>File</Table.HeaderCell>
                                    <Table.HeaderCell>Path</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <this.fileTable />
                            </Table.Body>
                        </Table>
                    </Container>
                </Dropzone>
                <Button onClick={() => {this.dropzoneRef.open() }}>Choose a file</Button>
            </Segment>
        )
    }
}