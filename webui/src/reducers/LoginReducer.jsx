import * as Constants from '../Constants';

const initialState = {
    history: null,
    isFetching: false,
    isAuthenticated: false,
}

//let state = JSON.parse()

export default function LoginReducer(state = initialState, action) {
    switch (action.type) {
        case Constants.LOGIN_REQUEST:
            return { 
                ...initialState,
                isFetching: true
            }
        case Constants.LOGIN_SUCCESS:
            return { 
                ...initialState,
                history: action.history,
                isAuthenticated: true
            }
        case Constants.LOGIN_FAILURE:
            return {
                ...initialState,
                error: action.error
            }
        case Constants.LOGOUT_REQUEST:
            return {
                ...initialState
            }
        default:
            return state;
    }
}