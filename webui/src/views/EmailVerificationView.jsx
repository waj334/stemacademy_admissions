import React, { Component } from 'react';
import { connect } from 'redux';
import { withRouter } from 'react-router';
import { Container, Segment, Header } from 'semantic-ui-react';

function mapStateToProps(state, props) {
    return {

    }
}

function mapDispatchToProps(dispatch, props) {
    return {

    }
}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class EmailVerificationView extends Component {
    constructor(props) {
        super(props);


    }

    render() {
        return (
            <Segment>
                <Container>

                </Container>
            </Segment>
        )
    }
}