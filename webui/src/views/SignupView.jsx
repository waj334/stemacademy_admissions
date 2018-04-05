import React, { Component } from 'react';
import {Segment, Container, Header, Grid} from 'semantic-ui-react';

import SignupComponent from '../components/SignupComponent.jsx';

export default class SignupView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Segment>
                    <Header>Sign up</Header>
                </Segment>

                <Segment basic padded='very'>
                    <Grid centered>
                        <SignupComponent />
                    </Grid>
                </Segment>
            </div>
        )
    }
}