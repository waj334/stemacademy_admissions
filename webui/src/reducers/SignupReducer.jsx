import * as SignupActions from '../actions/SignupActions.jsx';

const initialState = {
    isPosting: false,
    isSuccessful: false,
    error: null
}

export default function SignupReducer(state = initialState, action) {
    switch (action.type) {
        case SignupActions.ACTION_SIGNUP_PENDING:
            return {
                ...initialState,
                isPosting: true
            };
        case SignupActions.ACTION_SIGNUP_ERROR:
            return {
                ...initialState,
                error: action.error
            };
        case SignupActions.ACTION_SIGNUP_SUCCESS:
            return {
                ...initialState,
                isSuccessful: true
            };
        default:
            return state;
    }
}