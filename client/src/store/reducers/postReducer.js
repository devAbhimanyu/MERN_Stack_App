import updateState from '../../utility/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    posts: [],
    post: {},
    loading: false
};


const postLoading = (state, updatedState) => {
    return updateState(state, updatedState);
}
const getAllPosts = (state, updatedState) => {
    return updateState(state, updatedState);
}
const getPost = (state, updatedState) => {
    return updateState(state, updatedState);
}
const addNewPost = (state, updatedState) => {
    return updateState(state, updatedState);
}
const deletePost = (state, updatedState) => {
    return updateState(state, updatedState);

}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_LOADING: return postLoading(state, { loading: true });
        case actionTypes.GET_All_POSTS: return getAllPosts(state, { posts: action.payload, loading: false });
        case actionTypes.GET_POST: return getPost(state, { post: action.payload, loading: false });
        case actionTypes.ADD_NEW_POST: return addNewPost(state, { posts: [action.payload, ...state.posts] });
        case actionTypes.DELETE_POST: return deletePost(state, { posts: state.posts.filter(post => post._id !== action.payload) })
        default: return state;
    }
}
export default postReducer;