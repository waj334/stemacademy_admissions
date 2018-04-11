import * as Constants from '../Constants'
import Login from '../auth/Login.jsx';
import * as API from '../api/Api.jsx';

// Possible login actions
function requestLogin(creds) {
    return {
        type: Constants.LOGIN_REQUEST,
    }
}

function receiveLogin(user, history) {
    return {
        type: Constants.LOGIN_SUCCESS,
        history: history
    }
}

function loginError(message) {
    return {
        type: Constants.LOGIN_FAILURE,
        error: message
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

export function login(creds) {
    return dispatch => {
        dispatch(requestLogin(creds))
        API.Login(creds.username, creds.password)
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
            dispatch(receiveLogin(history.history))
            localStorage.setItem('token', token);
        });
    }
}