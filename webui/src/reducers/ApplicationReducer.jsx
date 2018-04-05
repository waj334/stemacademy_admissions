import * as Constants from '../Constants'

const initialState = {
    page: 0,
    progress: 0,
    isPosting: false,
    postSuccess: false,
    err: ''
}

export default function ApplicationReducer(state = initialState, action) {
    switch (action.type) {
        case Constants.APPLICATION_GOTO:
            return {...initialState, 
                page: action.page, 
                progress: action.progress,
                postFail: false,
                data: {}
            };
        case Constants.APPLICATION_SUBMIT:
            return {
                isPosting: action.isPosting, 
                page: action.page, progress: 
                action.progress,
                postFail: false
            }
        case Constants.APPLICATION_SUBMIT_SUCCESS:
            return {
                isPosting: action.isPosting, 
                postFail: false, 
                page: action.page,
                progress: action.progress
            }
        case Constants.APPLICATION_SUBMIT_ERR:
            return {
                isPosting: action.isPosting, 
                postFail: true, 
                err: action.err, 
                page: action.page,
                progress: action.progress
            }
        case Constants.APPLICATION_UPDATE:
            return {
                page: action.page,
                progress: action.progress,
                data: action.data
            }
        default:
            return state;
    }
}