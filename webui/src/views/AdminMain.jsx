import React, {Component} from 'react';
import { withRouter } from 'react-router';
import { connect} from 'react-redux';
import { Route, Link, Switch } from 'react-router-dom';
import { Sidebar, Menu, Icon, Segment, Header, Grid, Container, Divider, Loader } from 'semantic-ui-react';

import ApplicationListComponent from '../components/ApplicationListComponent.jsx';
import UserListComponent from '../components/UserListComponent.jsx';
import RosterComponent from '../components/RosterComponent.jsx';

import * as API from '../api/Api.jsx';
import * as ApiActions from '../actions/ApiActions.jsx';
import * as LoginActions from '../actions/LoginActions.jsx';

function mapStateToProps(state, props) {
    return {
        apiData: {
            ...props.apiData,
            ...state.apiReducer,
        }
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        apiCall: (id, apiFunc, payload, thenFunc=(data) => {}, catchFunc=(e) => {return 'error'}) => dispatch(ApiActions.APICall(id, apiFunc, payload, thenFunc, catchFunc)),
        logout: () => dispatch(LoginActions.logout()),

    }
}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
class AdminMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeView: 'apps'
        }

        this.AppList = this.AppList.bind(this);
        this.UpdateApp = this.UpdateApp.bind(this);
        this.GetApp = this.GetApp.bind(this);
        this.UpdateAssignments = this.UpdateAssignments.bind(this);

        this.AppView = this.AppView.bind(this);
        this.RosterView = this.RosterView.bind(this);
        this.UserView = this.UserView.bind(this);
        this.View = this.View.bind(this);

        this.onSelectView = this.onSelectView.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    AppList() {
        if (this.props.apiData["0"] !== undefined) {
            if (this.props.apiData["0"].state === 'success') {
                return <ApplicationListComponent getApp={this.GetApp} updateApp={this.UpdateApp} appData={this.props.apiData["2"]} data={this.props.apiData["0"].data} />
            }
        }

        return <div />
    }

    UpdateApp(list) {
        this.props.apiCall("1", API.UpdateApplicationStatus, list, (data) => {
            this.props.apiCall("0", API.GetApplicationList, null)
        });
    }

    GetApp(id) {
        this.props.apiCall("2", API.GetApplicationData, id);
    }

    UpdateAssignments(list) {
        this.props.apiCall('4', API.postAssignments, list, (data) => {
            this.props.apiCall('3', API.GetRoster, null);
        });
    }

    AppView() {
        return (
            <div>
                <this.AppList />
            </div>
        )
    }

    RosterView() {
        if (this.props.apiData['3'] !== undefined) {
            if (this.props.apiData['3'].state === 'success') {
                return (
                    <div>
                        <RosterComponent data={this.props.apiData['3'].data} onUpdate={this.UpdateAssignments}/>
                    </div>
                )
            }
        } else {
            this.props.apiCall('3', API.GetRoster, null);
        }

        return <Loader active />
    }

    UserView() {
        if (this.props.apiData['5'] !== undefined) {
            if (this.props.apiData['5'].state === 'success') {
                return (
                    <div>
                        <UserListComponent data={this.props.apiData['5'].data} onDelete={this.onDelete} onReset={this.onReset}/>
                    </div>
                )
            }
        } else {
            this.props.apiCall('5', API.GetUsers, -1);
        }

        return <Loader active />
    }

    View() {
        switch (this.state.activeView) {
            case 'apps':
                return (
                <div>
                    <Header dividing>Applications</Header>
                    <this.AppView />
                </div>
                )
            case 'roster':
                return (
                <div>
                    <Header dividing>Roster</Header>
                    <this.RosterView />
                </div>
            )
            case 'users':
                return (
                <div>
                    <Header dividing>Users</Header>
                    <this.UserView />
                </div>
            )
            default:
                return <div />
        }
    }

    onSelectView(e, { name }) {
        this.props.apiCall('3', API.GetRoster, null);
        this.setState({
            activeView: name
        })
    }

    onDelete(email) {
        this.props.apiCall('6', API.DeleteUser, email);
    }

    onReset(email) {
        this.props.apiCall('7', API.RequestPasswordReset, email);
    }

    onLogout() {
        this.props.logout();
    }
    
    componentDidMount() {
        this.props.apiCall("0", API.GetApplicationList, null)
    }
    render() {
        return (
            <div>
                <Sidebar.Pushable as={Segment} fluid>

                    <Sidebar as={Menu} visible={true} animation='push' vertical inverted width='thin' icon='labeled'>
                        <Menu.Item name='apps' active={this.state.activeView === 'apps'} onClick={this.onSelectView} >
                            <Icon name='wordpress forms'/>
                            Applications
                        </Menu.Item>

                        <Menu.Item name='roster' active={this.state.activeView === 'roster'} onClick={this.onSelectView} >
                            <Icon name='users' />
                            Roster
                        </Menu.Item>

                        <Menu.Item name='users' active={this.state.activeView === 'users'} onClick={this.onSelectView} >
                            <Icon name='user' />
                            Users
                        </Menu.Item>
                        <Menu.Item name='logout' onClick={this.onLogout}>
                            <Icon name='sign out'/>
                            Logout
                        </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher>
                            <Segment.Group style={{minHeight:"100vh", marginRight: 150}}>
                                <Segment padded loading={this.props.isFetchingAppData}>
                                    <Switch>
                                        <this.View />
                                    </Switch>
                                </Segment>
                            </Segment.Group>
                    </Sidebar.Pusher>

                </Sidebar.Pushable>
            </div>
        )
    }
}

export default AdminMain;