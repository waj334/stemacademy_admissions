import * as Constants from '../Constants'
import Login from '../auth/Login.jsx';
import {ApiLogin} from '../api/Api.jsx';

export const LoginActions = {
    loginUser,
}

// Possible login actions
function requestLogin(creds) {
    return {
        type: Constants.LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

function receiveLogin(user, history) {
    return {
        type: Constants.LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.id_token,
        history: history
    }
}

function loginError(message) {
    return {
        type: Constants.LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        err: message
    }
}

function _translateErr(e) {
    if (e.status === 404)
        return "Service is down. Try again later."
    else if (e.status === 401)
        return "Invalid Login. Check your username/password and try again."
    else
        return "There was an unexpected error logging in. Try again later."
}

function loginUser(creds, history) {
    return dispatch => {
        dispatch(requestLogin(creds))
        ApiLogin(creds.username, creds.password)
        .catch(e => {
            if (e.hasOwnProperty('response'))
                dispatch(loginError(_translateErr(e.response)));
            else
                dispatch(loginError("Could not contact service. Try again later."));
        })
        .then(data => {
            //Extract token
            const token = data.token;

            //Store JWT
            dispatch(receiveLogin(token, history.history))
            localStorage.setItem('token', token);

            //Goto Admin Front
            history.history.push('/admin/main')
        });
    }
}