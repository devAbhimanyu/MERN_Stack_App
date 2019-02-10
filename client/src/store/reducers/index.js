import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';
import errorsReduder from './errorReducer';

const rootCombinedReducer = combineReducers({
    authReducer: authReducer,
    profileReducer: profileReducer,
    postReducer: postReducer,
    errorsReduder: errorsReduder
});

export default rootCombinedReducer;