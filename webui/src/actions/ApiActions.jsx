
export const ACTION_API_FETCH = 'ACTION_API_FETCH';
export const ACTION_API_ERROR = 'ACTION_API_ERROR';
export const ACTION_API_SUCCESS = 'ACTION_API_SUCCESS';

function actionAPIFetch(id) {
    return {
        type: ACTION_API_FETCH,
        id: id
    }
}

function actionAPIError(id, error) {
    return {
        type: ACTION_API_ERROR,
        id: id,
        error: error
    }
}

function actionAPISuccess(id, data) {
    return {
        type: ACTION_API_SUCCESS,
        id: id,
        data: data
    }
}

export function APICall(id, apiFunc, payload, thenFunc=(data) => {}, catchFunc=(e) => {return 'error'}) {
    var err = false;
    return dispatch => {
        dispatch(actionAPIFetch(id))

        apiFunc(payload)
        .catch(e => {
            err = true;
            dispatch(actionAPIError(id, catchFunc(e)))
        })
        .then(data => {
            if (!err) {
                thenFunc(data);
            }

            return data
        })
        .then(data => {
            if (!err) {
                dispatch(actionAPISuccess(id, data))
            }
        })
    }
}