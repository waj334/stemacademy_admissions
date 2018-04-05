import { combineReducers } from 'redux';
import loginUpdate from './LoginReducer.jsx';
import ApplicationReducer from './ApplicationReducer.jsx';
import SignupReducer from './SignupReducer.jsx';

const reducers = combineReducers({
    loginReducer: loginUpdate,
    applicationReducer: ApplicationReducer,
    signupReducer: SignupReducer
})

export default reducers;