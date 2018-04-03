import * as Constants from '../Constants';
import * as API from '../api/Api.jsx';

export function actionApplicationGoto(page, progress) {
    console.log("Going to page:", page, "Progress:", progress);
    return {
        type: Constants.APPLICATION_GOTO,
        page: page,
        progress: progress
    }
}

function actionApplicationSubmit(page, progress) {
    return {
        type: Constants.APPLICATION_SUBMIT,
        isPosting: true,
        page: page,
        progress: progress
    }
}

function actionApplicationUpdate(data, page, progress) {
    return {
        type: Constants.APPLICATION_UPDATE,
        page: page,
        progress: progress,
        data: data
    }
}

function actionApplicationSubmitSuccess(page, progress) {
    return {
        type: Constants.APPLICATION_SUBMIT_SUCCESS,
        isPosting: false,
        page: page,
        progress: progress
    }
}

function actionApplicationSubmitErr(message, page, progress) {
    return {
        type: Constants.APPLICATION_SUBMIT_ERR,
        isPosting: false,
        err: message,
        page: page,
        progress: progress
    }
}

function _translateErr(e) {
    if (e.status === 404)
        return 'Service is down. Try again later.';
    else if (e.status === 401)
        return 'Invalid data.';
    else
        return 'There was an unexpected error. Try again later.';
}

export function update(data, page, progress) {
    return dispatch => {
        dispatch(actionApplicationUpdate(data, page, progress));
    }
}

export function submit(data, page, progress) {
    return dispatch => {
        dispatch(actionApplicationSubmit(page, progress))
        var submitFunc = null;
        var err = false;

        //Return async API call
        return API.SubmitApp(data)
        .catch( e => {
            err = true;
            if (e.hasOwnProperty('response')) {
                dispatch(actionApplicationSubmitErr(_translateErr(e.response), page, progress));
            } else if (e.hasOwnProperty('message')) {
                dispatch(actionApplicationSubmitErr(e.message, page, progress));
            } else {
                dispatch(actionApplicationSubmitErr('Could not contact service. Try again later.', page, progress));
            }
        })
        .then( () => {
            if (!err)
                dispatch(actionApplicationSubmitSuccess(page+1, progress+1));
        });
    }
}