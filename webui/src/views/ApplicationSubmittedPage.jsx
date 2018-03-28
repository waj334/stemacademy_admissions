import React, { Component } from 'react';
import {Button, Header, Container, Icon, Segment} from 'semantic-ui-react';

class ApplicationSubmittedPage extends Component {
    render() {
        return (
            <Container textAlign='center'>
                <Segment basic>
                    <Header textAlign='center' size='huge'>Your Application Has Been Submitted!</Header>
                </Segment>
                <Segment basic>
                    <Icon name='check' size='huge' />
                </Segment>
            </Container>
        )}
}

export default ApplicationSubmittedPage;