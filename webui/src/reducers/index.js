import { combineReducers } from 'redux';
import loginUpdate from './LoginReducer.jsx';
import ApplicationReducer from './ApplicationReducer.jsx';

const reducers = combineReducers({
    loginReducer: loginUpdate,
    applicationReducer: ApplicationReducer,
})

export default reducers;