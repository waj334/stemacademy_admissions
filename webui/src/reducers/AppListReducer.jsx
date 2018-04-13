import * as AppListActions from '../actions/AppListActions.jsx';

const initialItemState = {
    isFetching: false,
    isDone: false,
    error: null,
    data: []
}

const initialState = {
}

export default function AppListReducer(state = initialState, action) {
    switch (action.type) {
        case AppListActions. ACTION_APPLICATION_LIST_FETCHING:
            return {
                [action.id]: {
                    ...initialItemState,
                    isFetching: true
                }
            };
        case AppListActions. ACTION_APPLICATION_LIST_ERROR:
            return {
                [action.id]: {
                    ...initialItemState,
                    error: action.error,
                    data: {}
                }
            };
        case AppListActions. ACTION_APPLICATION_LIST_DONE:
            return {
                [action.id]: {
                    ...initialItemState,
                    isDone: true,
                    data: action.data
                }
            };
        default:
            return state;
    }
}