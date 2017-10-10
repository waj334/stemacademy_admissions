import * as Constants from '../Constants';

const initialState = {
    data: null,
    isFetching: false,
    isAuthenticated: false
}

export default function loginUpdate(state = initialState, {type, payload}) {
    switch (type) {
        case Constants.LOGIN_REQUEST:
            return { ...initialState, isFetching: true}
        case Constants.LOGIN_SUCCESS:
            return {id_token: payload, isFetching: false, isAuthenticated: true}
        case Constants.LOGIN_FAILURE:
            return {err: payload, isFetching: false, isAuthenticated: false}
        default:
            return state;
    }
}