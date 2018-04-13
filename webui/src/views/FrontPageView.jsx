import React, { Component } from 'react';
import { Container, Header, Button, Segment, Image, Icon, Grid, Divider, List } from 'semantic-ui-react';

import SlideshowComponent from '../components/SlideshowComponent.jsx';

export default class FrontPageView extends Component {
    constructor(props) {
        super(props);
        this.onApply = this.onApply.bind(this);
    }

    onApply() {
        this.props.history.push('/signup');
    }

    render() {
        var images = [
            'https://picsum.photos/1024/768/?image=0',
            'https://picsum.photos/1024/768/?image=1',
            'https://picsum.photos/1024/768/?image=2',
            'https://picsum.photos/1024/768/?image=3',
            'https://picsum.photos/1024/768/?image=4',
            'https://picsum.photos/1024/768/?image=5',
            'https://picsum.photos/1024/768/?image=6',
            'https://picsum.photos/1024/768/?image=7',
        ]

        var headerSegmentStyle = {
            paddingTop: '75px',
            minHeight: '100vh',
            border: '0px',
            borderRadius: '0px'
        };

        return (
            <Segment.Group>
                <Segment basic inverted style={headerSegmentStyle}>
                    <SlideshowComponent images={images} />
                    <Grid relaxed stretched style={{height:'100vh', marginTop:'-5vh', fontSize:'20pt'}}>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header as='h1' size='huge' textAlign='center' inverted>STEM Summer Academy</Header>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Container>
                                        <Header size='tiny' textAlign='center' inverted> 
                                            A free Summer Program for high school students and
                                            teachers on the Campus of Tuskegee University to Explore,
                                            and discover STEM through Aerial Drones Technology.
                                        </Header>
                                    </Container>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Container textAlign='center'>
                                        <Icon name='chevron down' size='big'/>
                                    </Container>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                </Segment>
                <Segment basic>
                        <Segment basic>
                            <Container>
                                <Header>
                                    The STEM Summer Academy is a summer enrichment
                                    program on the campus of Tuskegee University to engage
                                    high school students in activities to gain technology
                                    experiences and build problem solving skills through the
                                    use of aerial drones.
                                </Header>
                            </Container>
                        </Segment>
                        <Segment basic>
                            <Container>
                                <Header>
                                    Under the guidance of Tuskegee
                                    faculty mentors, students will work in teams to:
                                </Header>
                                <List bulleted>
                                    <List.Item>Investigate and design solutions to community-based problems using aerial drones.</List.Item>
                                    <List.Item>Learn Math, Science and Technology concepts through Project Based Learning.</List.Item>
                                    <List.Item>Learn about technology-related career opportunities.</List.Item>
                                    <List.Item>Develop professional and leadership skills.</List.Item>
                                    <List.Item>Communicate their experiments and work with others.</List.Item>
                                </List>
                            </Container>
                        </Segment>
                        <Segment basic>
                            <Container>
                                <Header>
                                    The Academy features a collaborative setting for
                                    participants to learn technology concepts and have fun at
                                    the same time!
                                    As students perform their investigations, participating
                                    teachers will write lesson plans based on their Academy
                                    observations to infuse in their instruction during the
                                    school year.
                                </Header>
                            </Container>
                        </Segment>
                        <Segment basic>
                            <Container>
                                <Header>
                                    Academy Benefits:
                                </Header>
                                <List bulleted>
                                    <List.Item>Students will gain problem solving skills and valuable academic and career knowledge.</List.Item>
                                    <List.Item>Teachers will learn innovative ways to teach Math, Science and Technology skills.</List.Item>
                                    <List.Item>Each student will receive a stipend up to $1,000 for the full Academy.</List.Item>
                                    <List.Item>Each teacher will receive a stipend up to $2,000 after
                                        completion of the full Academy, additional $1,000 after
                                        submission and approval of lesson plan implementations
                                        during following school year.
                                    </List.Item>
                                </List>
                            </Container>
                        </Segment>
                </Segment>
                <Segment basic>
                    <Container>
                        <Segment.Group basic style={{border:0}}>
                            <Segment basic>
                                <Segment.Group horizontal>
                                    <Segment>
                                        <Container>
                                            <Header>
                                                Eligibility:
                                            </Header>
                                            <List bulleted>
                                                <List.Header><Header>Students:</Header></List.Header>
                                                <List.Item>Be a U.S. citizen, national or permanent resident.</List.Item>
                                                <List.Item>Be a rising 10th, 11th or 12th grader.</List.Item>
                                                <List.Item>Have a High School GPA of 3.00 or higher.</List.Item>
                                                <List.Item>Be committed to participate in all Academy activities</List.Item>
                                                <List.Item>Must not have participated in 2016, 2017 Drone Academy.</List.Item>
                                                <List.Item>Students on the Tuskegee University dual enrollment track
                                                    exceed the qualifications for this program and are 
                                                    ineligible to apply.
                                                </List.Item>
                                            </List>
                                            <List bulleted>
                                                <List.Header><Header>Teachers:</Header></List.Header>
                                                <List.Item>Be a certified Math or Science teacher.</List.Item>
                                            </List>
                                        </Container>
                                    </Segment>
                                    <Segment>
                                        <Container>
                                            <Header>
                                                Schedule:
                                            </Header>
                                            <List bulleted>
                                                <List.Item>The Academy will be held at Tuskegee University July 2 - 27, 2018.</List.Item>
                                                <List.Item>Students will participate in the Academy Monday - Friday, 9AM – 4PM.</List.Item>
                                                <List.Item>Timely pick-ups and drop-offs of students are the responsibility of parents and guardians.</List.Item>
                                                <List.Item>Drop-Off: 8:45AM; Pick-Up: 4:15 - 4:45PM.</List.Item>
                                                <List.Item>Location: Andrew F. Brimmer Hall, Room 306</List.Item>
                                            </List>
                                        </Container>
                                    </Segment>
                                </Segment.Group>
                            </Segment>
                            <Segment>
                                <Grid relaxed stretched verticalAlign='middle' style={{height:'100%'}}>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Button onClick={this.onApply}>
                                                <Icon fitted name='signup'/>
                                                Apply now!
                                            </Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                        </Segment.Group>
                    </Container>
                </Segment>
                <Segment basic>
                    <Container>
                        <Header as='h1' size='big'>Questions?</Header>
                        <Container textAlign='center'>
                            <Header>Contact:</Header>
                            <Header>Dr. Hira Narang, Head, Dept. of Computer Science, Tuskegee University</Header>
                            <p>hnarang@tuskegee.edu</p>
                            <p>334-727-8021</p>
                        </Container>
                    </Container>
                </Segment>
                <Segment basic style={{'height':'10%', 'padding-top':30}}>
                    <Container textAlign='center'>
                        (C) Department of Computer Science, Tuskegee University.
                    </Container>
                </Segment>
            </Segment.Group>
        )
    }
}