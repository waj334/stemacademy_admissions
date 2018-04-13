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
        type: ACTION_SIGNUP_ERROR,
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
        var err = false;
        return API.Signup(data)
        .catch(e => {
            //Catch errors
            if (e.hasOwnProperty('response')) {
                if (e.response.status == 401) {
                    dispatch(actionSignupError("reCAPTCHA Error. Refresh page and try again."));
                    err = true;
                } else if (e.response.status == 406) {
                    dispatch(actionSignupError("User with the same email is already registered."));
                    err = true;
                }
                
                return;
            } else if (e.hasOwnProperty('message')) {
                if (e.message === "Failed to fetch") {
                    dispatch(actionSignupError("Service is down. Try again later."));
                    err = true;
                }
                return;
            } 
            
            dispatch(actionSignupError("Unexpected server error."))
            err = true;
        })
        .then(()=> {
            //Successful
            if (!err) {
                dispatch(actionSignupSuccess());
            }
        })
    }
}