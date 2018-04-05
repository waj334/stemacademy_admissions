import { combineReducers } from 'redux';
import loginUpdate from './LoginReducer.jsx';
import ApplicationReducer from './ApplicationReducer.jsx';
import SignupReducer from './SignupReducer.jsx';
import UserListReducer from './UserListReducer.jsx';

const reducers = combineReducers({
    loginReducer: loginUpdate,
    applicationReducer: ApplicationReducer,
    signupReducer: SignupReducer,
    userListReducer: UserListReducer
})

export default reducers;