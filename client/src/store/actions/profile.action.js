import axios from 'axios';
import * as actionTypes from '../actions/actionTypes'


const setError = (error) => {
    return {
        type: actionTypes.GET_ERRORS,
        errorPayload: error
    }
}

const getProfile = (payload) => {
    return {
        type: actionTypes.GET_PROFILE,
        payload: payload
    }
}

const getProfiles = (payload) => {
    return {
        type: actionTypes.GET_ALL_PROFILES,
        payload: payload
    }
}
//get current user profile
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
//gets all profiles
export const getAllProfiles = () => {
    return dispatch => {
        dispatch(setProfileLoading());
        axios.get('/api/profile/all')
            .then(res => {
                dispatch(getProfiles(res.data));
            })
            .catch(err => {
                dispatch(getProfiles(null))
            })
    }
}

//get profile by user handle
export const getProfileFromUserHandle = (handle) => {
    return dispatch => {
        dispatch(setProfileLoading());
        axios.get(`/api/profile/handle/${handle}`)
            .then(res => {
                dispatch(getProfile(res.data));
            })
            .catch(err => {
                dispatch(getProfile(null))
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

//add experience
export const addExperience = (expData, history) => {
    return dispatch => {
        axios.post('/api/profile/experience', expData)
            .then(res => {
                history.push('/dashboard');
            })
            .catch(err => {
                dispatch(setError(err.response.data))
            })
    }
}

//add education
export const addEducation = (eduData, history) => {
    return dispatch => {
        axios.post('/api/profile/education', eduData)
            .then(res => {
                history.push('/dashboard');
            })
            .catch(err => {
                dispatch(setError(err.response.data))
            })
    }
}

//deletes account
export const deleteAccount = () => {
    return dispatch => {
        if (window.confirm('Are you sure you want to delete your account')) {
            axios.delete('/api/profile')
                .then(res => {
                    dispatch(setCurrentUser({}));
                })
                .catch(err => {
                    dispatch(setError(err.response.data))
                })
        }

    }
}
//deletes experience
export const deleteExperience = (id) => {
    return dispatch => {
        dispatch(setProfileLoading());
        axios.delete(`/api/profile/experience/${id}`)
            .then(res => {
                dispatch(getProfile(res.data));
            })
            .catch(err => {
                dispatch(setError(err.response.data))
            })
    }
}

//deletes education
export const deleteEducation = (id) => {
    return dispatch => {
        axios.delete(`/api/profile/education/${id}`)
            .then(res => {
                dispatch(getProfile(res.data));
            })
            .catch(err => {
                dispatch(setError(err.response.data))
            })
    }
}

export const setCurrentUser = (userData) => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        payload: userData
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