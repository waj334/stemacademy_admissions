import React, {Component} from 'react';
import {Sidebar, Menu, Icon, Segment, Header, Grid, Container} from 'semantic-ui-react';

import ApplicationListComponent from '../components/ApplicationListComponent.jsx';
import UserListComponent from '../components/UserListComponent.jsx';

const testData = [
    {
        id: 0,
        type: 'student',
        date: '09-03-1993',
        fname: 'Justin',
        lname: 'Wilson',
        email: 'waj334@gmail.com',
    },
    {
        id: 1,
        type: 'teacher',
        date: '09-03-1973',
        fname: 'Karen',
        lname: 'Craig',
        email: 'kcraig@gmail.com',
    }
]

class AdminMain extends Component {
    render() {
        return (
            <div>
                <Sidebar.Pushable as={Segment} fluid>

                    <Sidebar as={Menu} visible={true} animation='push' vertical inverted width='thin' icon='labeled'>
                        <Menu.Item name='home'>
                            <Icon name='home'/>
                            Home
                        </Menu.Item>
                        <Menu.Item name='Registration'>
                            Registration
                        </Menu.Item>
                        <Menu.Item name='Roster'>
                            Roster
                        </Menu.Item>
                        <Menu.Item name='settings'>
                            Settings
                        </Menu.Item>
                        <Menu.Item name='logout'>
                            <Icon name='sign out'/>
                            Logout
                        </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher>
                            <Segment.Group style={{minHeight:"100vh"}}>
                                <Segment padded>
                                    <Header dividing>Unnapproved Applicants</Header>
                                    <UserListComponent id='0' type={1} />
                                </Segment>
                                <Segment padded>
                                    <Header dividing>Applications</Header>
                                    <ApplicationListComponent data={testData} />
                                </Segment>
                            </Segment.Group>
                    </Sidebar.Pusher>

                </Sidebar.Pushable>
            </div>
        )
    }
}

export default AdminMain;