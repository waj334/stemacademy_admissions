import * as Constants from '../Constants'

// Possible login actions
function requestLogin(creds) {
    return {
        type: Constants.LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

function receiveLogin(user) {
    return {
        type: Constants.LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.id_token
    }
}

function loginError(message) {
    return {
        type: Constants.LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}