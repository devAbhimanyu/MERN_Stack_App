import updateState from '../../utility/utility';
import isEmpty from '../../validations/is-empty';
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    isAuthenticated: false,
    user: {}
}

const registerUser = (state, udatedValues) => {
    return updateState(state, udatedValues);
}

const setCurrentUser = (state, udatedValues) => {
    return updateState(state, udatedValues);
}

const authReduder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_USER: return setCurrentUser(state, { isAuthenticated: !isEmpty(action.payload), user: action.payload });
        case actionTypes.REGISTER_NEW_USER: return registerUser(state, { user: action.payload.user });
        default:
            return state;
    }
}

export default authReduder;