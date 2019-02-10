import * as actionTypes from './actionTypes';
import axios from 'axios';
import setAuthToken from '../../utility/setAuthToken';
import jwtDecode from 'jwt-decode';

const setError = (error) => {
    return {
        type: actionTypes.GET_ERRORS,
        errorPayload: error
    }
}

//register user
export const registerUser = (userData, history) => {
    return dispatch => {
        axios.post('/api/users/register', userData)
            .then(res => {
                history.push('/login');
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

//login and get user token
export const loginUser = (userData) => {
    return dispatch => {
        axios.post('/api/users/login', userData)
            .then(res => {
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                const decoded = jwtDecode(token);
                dispatch(setCurrentUser(decoded));
            })
            .catch(err => {
                dispatch(setError(err.response.data))
            })
    }
}

export const logoutUser = () => {
    return dispatch => {
        //removing token from local storage
        localStorage.removeItem('jwtToken');
        //removing auth heard
        setAuthToken(false);
        //current user as empty
        dispatch(setCurrentUser({}));

        //window.location.href = '/login';
    }
}