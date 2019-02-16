import * as actionTypes from '../actions/actionTypes';

const initialState = {};

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ERRORS: return action.errorPayload;
        case actionTypes.CLEAR_ERROR_LOG: return {};
        default:
            return state;
    }
}

export default errorReducer;