import * as API from '../api/Api.jsx';

export const ACTION_SIGNUP_PENDING = 'ACTION_SIGNUP_PENDING';
export const ACTION_SIGNUP_ERROR = 'ACTION_SIGNUP_ERROR';
export const ACTION_SIGNUP_SUCCESS = 'ACTION_SIGNUP_SUCCESS';

function actionSignupPending() {
    return {
        type: ACTION_SIGNUP_PENDING,
        isPosting: true
    }
}

function actionSignupError(err) {
    return {
        type: ACTION_SIGNUP_PENDING,
        isPosting: false,
        error: err
    }
}

function actionSignupSuccess() {
    return {
        type: ACTION_SIGNUP_SUCCESS,
        isPosting: false,
        isSuccessful: true
    }
}

export function signup(data) {
    return dispatch => {
        //Pending state
        dispatch(actionSignupPending());

        //Call signup API
        return API.Signup(data)
        .catch(e => {
            //Catch errors
            dispatch(actionSignupError("Some random error"));
        })
        .then(()=> {
            //Successful
            dispatch(actionSignupSuccess());
        })
    }
}