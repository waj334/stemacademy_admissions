import * as API from '../api/Api.jsx';

export const ACTION_APPLICATION_LIST_FETCHING = 'ACTION_APPLICATION_LIST_FETCHING';
export const ACTION_APPLICATION_LIST_ERROR = 'ACTION_APPLICATION_LIST_ERROR';
export const ACTION_APPLICATION_LIST_DONE = 'ACTION_APPLICATION_LIST_DONE';

function actionApplicationListFetching(id) {
    return {
        type: ACTION_APPLICATION_LIST_FETCHING,
        id: id,
        isFetching: true
    }
}

function actionApplicationListError(id, err) {
    return {
        type: ACTION_APPLICATION_LIST_ERROR,
        id: id,
        error: err
    }
}

function actionApplicationListDone(id, data) {
    return {
        type: ACTION_APPLICATION_LIST_DONE,
        id: id,
        isDone: true,
        data: data
    }
}

export function getApplicationList(id) {
    return dispatch => {
        dispatch(actionApplicationListFetching(id));

        API.GetApplicationList()
        .catch(e => {
            //Catch errors
            if (e.hasOwnProperty('message')) {
                dispatch(actionApplicationListError(id, e.message));
            }
        })
        .then((data) =>{
            
            dispatch(actionApplicationListDone(id, data));
        })
    }
}

export function updateApplication(id, list) {
    return dispatch => {
        dispatch(actionApplicationListFetching(id));

        API.UpdateApplicationStatus(list)
        .catch(e => {
            //Catch errors
            if (e.hasOwnProperty('message')) {
                dispatch(actionApplicationListError(id, e.message));
            }
        })
        .then((data) =>{
            dispatch(getApplicationList(id));
        })
    }
}