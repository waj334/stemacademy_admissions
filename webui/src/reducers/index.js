import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer.jsx';
import ApplicationReducer from './ApplicationReducer.jsx';
import SignupReducer from './SignupReducer.jsx';
import UserListReducer from './UserListReducer.jsx';
import AppListReducer from './AppListReducer.jsx';
import ApiReducer from './ApiReducer.jsx';

const reducers = combineReducers({
    loginReducer: LoginReducer,
    applicationReducer: ApplicationReducer,
    signupReducer: SignupReducer,
    userListReducer: UserListReducer,
    appListReducer: AppListReducer,
    apiReducer: ApiReducer,
})

export default reducers;