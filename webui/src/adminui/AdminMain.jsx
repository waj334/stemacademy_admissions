import React, {Component} from 'react';
import {Sidebar, Menu, Icon, Segment, Header, Grid} from 'semantic-ui-react';
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
                            <Header>Top</Header>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default AdminMain;