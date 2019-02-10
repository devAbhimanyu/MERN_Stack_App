import * as actionTypes from '../actions/actionTypes';

const initialState = {};

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ERRORS:
            return action.errorPayload;
        default:
            return state;
    }
}

export default errorReducer;