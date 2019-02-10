import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootCombinedReducer from './reducers/index'

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootCombinedReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
);

export default store;