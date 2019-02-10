import axios from 'axios';
import * as actionTypes from '../actions/actionTypes'


const setError = (error) => {
    return {
        type: actionTypes.GET_ERRORS,
        errorPayload: error
    }
}
//export const =()=>{}

const getProfile = (payload) => {
    return {
        type: actionTypes.GET_PROFILE,
        payload: payload
    }
}

export const getCurrentProfile = () => {
    return dispatch => {
        dispatch(setProfileLoading());
        axios.get('/api/profile')
            .then(res => {
                dispatch(getProfile(res.data));
            })
            .catch(err => {
                dispatch(getProfile({}))
            })
    }
}

//create profile

export const createProfile = (profileData, history) => {
    return dispatch => {
        dispatch(setProfileLoading());
        axios.post('/api/profile', profileData)
            .then(res => {
                history.push('/dashboard');
            })
            .catch(err => {
                dispatch(setError(err.response.data))
            })
    }
}

//setting profile in loading state
export const setProfileLoading = () => {
    return {
        type: actionTypes.PROFILE_LOADING
    }
}

export const clearCurrentProfile = () => {
    return {
        type: actionTypes.CLEAR_CURRENT_PROFILE
    }
}