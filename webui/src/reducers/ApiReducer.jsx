import * as APIActions from '../actions/ApiActions.jsx';

const initialState = {
    id: -1,
    state: null,
    error: null,
    data: {}
}

export default function ApiReducer(state = {}, action) {
    switch (action.type) {
        case APIActions.ACTION_API_FETCH:
            return {
                ...state,
                [action.id]: {
                    ...initialState,
                    state: 'fetching',
                }
            };
        case APIActions.ACTION_API_ERROR:
            return {
                ...state,
                [action.id]: {
                    ...initialState,
                    state: 'error',
                    error: action.error
                }
            };
        case APIActions.ACTION_API_SUCCESS:
            return {
                ...state,
                [action.id]: {
                    ...initialState,
                    state: 'success',
                    data: action.data
                }
            };
        default:
            return state;
    }
}