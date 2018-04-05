import * as UserListActions from '../actions/UserListActions.jsx';

const initialItemState = {
    isFetching: false,
    isDone: false,
    error: null,
    data: []
}

const initialState = {
}

export default function UserListReducer(state = initialState, action) {
    switch (action.type) {
        case UserListActions.ACTION_USER_LIST_FETCHING:
            return {
                [action.id]: {
                    ...initialItemState,
                    isFetching: true
                }
            };
        case UserListActions.ACTION_USER_LIST_ERROR:
            return {
                [action.id]: {
                    ...initialItemState,
                    error: action.error
                }
            };
        case UserListActions.ACTION_USER_LIST_DONE:
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