import React, {Component} from 'react';
import {Sidebar, Menu, Icon, Segment, Header, Grid} from 'semantic-ui-react';

import ApplicationListComponent from '../components/ApplicationListComponent.jsx';

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
                <Grid stretched columns='2'>
                    <Grid.Column width='2'>
                        <Menu vertical inverted width='thin' icon='labeled' fixed='left'>
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
                        </Menu>
                    </Grid.Column>
                    <Grid.Column fluid>
                        <Segment>
                            <Header>Applications</Header>
                            <ApplicationListComponent data={testData} />
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default AdminMain;