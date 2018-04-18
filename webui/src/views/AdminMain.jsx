import React, {Component} from 'react';
import { withRouter } from 'react-router';
import { connect} from 'react-redux';
import { Route, Link, Switch } from 'react-router-dom';
import {Sidebar, Menu, Icon, Segment, Header, Grid, Container, Divider } from 'semantic-ui-react';

import ApplicationListComponent from '../components/ApplicationListComponent.jsx';
import UserListComponent from '../components/UserListComponent.jsx';

import * as API from '../api/Api.jsx';
import * as ApiActions from '../actions/ApiActions.jsx';

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
    }
}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
class AdminMain extends Component {
    constructor(props) {
        super(props);

        this.AppList = this.AppList.bind(this);
        this.UpdateApp = this.UpdateApp.bind(this);
        this.GetApp = this.GetApp.bind(this);

        this.AppView = this.AppView.bind(this);
        this.RosterView = this.RosterView.bind(this);
        this.UserView = this.UserView.bind(this);
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
        })
    }

    GetApp(id) {
        this.props.apiCall("2", API.GetApplicationData, id)
    }

    AppView() {
        return (
            <div>
                <Header dividing>Applications</Header>
                <this.AppList />
            </div>
        )
    }

    RosterView() {
        return (
            <div>
                Roster View
            </div>
        )
    }

    UserView() {
        return (
            <div>
                User AppView
            </div>
        )
    }
    
    componentDidMount() {
        this.props.apiCall("0", API.GetApplicationList, null)
    }
    render() {
        return (
            <div>
                <Sidebar.Pushable as={Segment} fluid>

                    <Sidebar as={Menu} visible={true} animation='push' vertical inverted width='thin' icon='labeled'>
                        <Link to={this.props.match.url}>
                            <Menu.Item name='apps'>
                                <Icon name='wordpress forms'/>
                                Applications
                            </Menu.Item>
                        </Link>
                        <Divider/>
                        <Link to={this.props.match.url+'/roster'}>
                            <Menu.Item name='roster'>
                                <Icon name='users' />
                                Roster
                            </Menu.Item>
                        </Link>
                        <Divider/>
                        <Link to={this.props.match.url+'/users'}>
                            <Menu.Item name='users'>
                                <Icon name='user' />
                                Users
                            </Menu.Item>
                        </Link>
                        <Divider/>
                        <Menu.Item name='logout'>
                            <Icon name='sign out'/>
                            Logout
                        </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher>
                            <Segment.Group style={{minHeight:"100vh", marginRight: 150}}>
                                <Segment padded loading={this.props.isFetchingAppData}>
                                    <Switch>
                                        <Route exact path={this.props.match.url+'/roster'} component={this.RosterView} />
                                        <Route exact path={this.props.match.url+'/users'} component={this.UserView} />
                                        <Route exact path={this.props.match.url+'/'} component={this.AppView} />
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