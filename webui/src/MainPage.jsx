import React, { Component } from 'react';
import {Segment, Container, Button, Header, Grid, Divider} from 'semantic-ui-react';
import {Link} from 'react-router-dom'

const MainPage = () => (
  <div>
        <Segment basic>
          <Header textAlign='center'>Drone Academy Online Application</Header>
        </Segment>
        <Segment>
          <Grid columns='3'>
            <Grid.Column>
              <Button><Link to='/app/student/'>Students Application</Link></Button>
            </Grid.Column>
            <Grid.Column>
                <Divider vertical/>
            </Grid.Column>
            <Grid.Column>
              <Button>Teacher Application</Button>
            </Grid.Column>
          </Grid>
        </Segment>
    </div>
);

export default MainPage;