import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        //applying token
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        //deleting the token from header
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;