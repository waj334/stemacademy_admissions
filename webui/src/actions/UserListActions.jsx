
import * as API from '../api/Api.jsx';

export const ACTION_USER_LIST_FETCHING = 'ACTION_USER_LIST_FETCHING';
export const ACTION_USER_LIST_ERROR = 'ACTION_USER_LIST_ERROR';
export const ACTION_USER_LIST_DONE = 'ACTION_USER_LIST_DONE';

function actionUserListFetching(id) {
    return {
        type: ACTION_USER_LIST_FETCHING,
        id: id,
        isFetching: true
    }
}

function actionUserListError(id, err) {
    return {
        type: ACTION_USER_LIST_ERROR,
        id: id,
        error: err
    }
}

function actionUserListDone(id, data) {
    return {
        type: ACTION_USER_LIST_DONE,
        id: id,
        isDone: true,
        data: data
    }
}

export function getUserList(id, type) {
    return dispatch => {
        dispatch(actionUserListFetching(id));

        API.GetUsers(type)
        .catch(e => {
            //Catch errors
            if (e.hasOwnProperty('message')) {
                dispatch(actionUserListError(id, e.message));
            }
        })
        .then((data) =>{
            
            dispatch(actionUserListDone(id, data));
        })
    }
}