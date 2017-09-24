import React, { Component } from 'react';
import {Segment, Container, Button, Header, Grid, Divider} from 'semantic-ui-react';
import {Link} from 'react-router-dom'

const MainPage = () => (
  <div>
        <Segment basic>
          <Header textAlign='center' size='huge'>Drone Academy Online Application</Header>
        </Segment>
        <Segment basic>
          <Grid columns='3' verticalAlign='middle'>
            <Grid.Column textAlign='right'>
              <Button><Link to='/app/student/'>Students Application</Link></Button>
            </Grid.Column>
            <Grid.Column>
                <Divider vertical/>
            </Grid.Column>
            <Grid.Column textAlign='left'>
              <Button><Link to='/app/teacher/'>Teacher Application</Link></Button>
            </Grid.Column>
          </Grid>
        </Segment>
    </div>
);

export default MainPage;