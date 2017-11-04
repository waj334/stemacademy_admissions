import * as Constants from '../Constants';

const initialState = {
    history: null,
    data: null,
    isFetching: false,
    isAuthenticated: false,
}

//let state = JSON.parse()

export default function loginUpdate(state = initialState, action) {
    console.log("Action:", action)
    console.log("State:", state)
    switch (action.type) {
        case Constants.LOGIN_REQUEST:
            return { ...initialState, isFetching: true}
        case Constants.LOGIN_SUCCESS:
            return { history: action.history, isFetching: false, isAuthenticated: true}
        case Constants.LOGIN_FAILURE:
            return {err: action.err, isFetching: false, isAuthenticated: false}
        default:
            return state;
    }
}