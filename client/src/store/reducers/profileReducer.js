import updateState from '../../utility/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    profile: null,
    allProfiles: null,
    loading: false
};

const getProfile = (state, updatedState) => {
    return updateState(state, updatedState);
}
const getAllProfiles = (state, updatedState) => {
    return updateState(state, updatedState);
}
const profileLoading = (state, updatedState) => {
    return updateState(state, updatedState);
}
const profileNotFound = (state, updatedState) => {
    return updateState(state, updatedState);
}
const clearCurrentProfile = (state, updatedState) => {
    return updateState(state, updatedState);

}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PROFILE_LOADING:
            return profileLoading(state, { loading: true });
        case actionTypes.GET_PROFILE:
            return getProfile(state, {
                profile: action.payload,
                loading: false
            });
        case actionTypes.GET_ALL_PROFILES:
            return getAllProfiles(state, { allProfiles: action.payload, loading: false });
        case actionTypes.PROFILE_NOT_FOUND:
            return profileNotFound(state, {});
        case actionTypes.CLEAR_CURRENT_PROFILE:
            return clearCurrentProfile(state, { profile: null });
        default:
            return state;
    }
}
export default profileReducer;