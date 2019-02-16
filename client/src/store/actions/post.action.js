import axios from 'axios';
import * as actionTypes from '../actions/actionTypes'

const addNewPostDisptch = (payload) => {
    return {
        type: actionTypes.ADD_NEW_POST,
        payload: payload
    }
}
//setting errors
const getErrors = (err) => {
    return {
        type: actionTypes.GET_ERRORS,
        errorPayload: err
    }
}
//getting all posts
const getPosts = (data) => {
    return {
        type: actionTypes.GET_All_POSTS,
        payload: data
    }
}

//get post 
const getPost = (payload) => {
    return {
        type: actionTypes.GET_POST,
        payload: payload
    }
}

// Clear errors
export const clearErrors = () => {
    return {
        type: actionTypes.CLEAR_ERROR_LOG
    };
};

// Set loading state
export const setPostLoading = () => {
    return {
        type: actionTypes.POST_LOADING
    };
};

// Add Post
export const addNewPost = postData => dispatch => {
    dispatch(clearErrors());
    axios
        .post('/api/posts', postData)
        .then(res => dispatch(addNewPostDisptch(res.data)))
        .catch(err =>
            dispatch(getErrors(err.response.data))
        );
};

//Get Posts
export const getAllPosts = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('/api/posts')
        .then(res => dispatch(getPosts(res.data)))
        .catch(err => dispatch(getPosts(null)))
};


// Get Post
export const getUserPost = id => dispatch => {
    dispatch(setPostLoading());
    axios
        .get(`/api/posts/${id}`)
        .then(res =>
            dispatch(getPost(res.data))
        )
        .catch(err =>
            dispatch(getPost(null))
        );
};

// Delete Post
export const deletePost = id => dispatch => {
    axios
        .delete(`/api/posts/${id}`)
        .then(res =>
            dispatch({
                type: actionTypes.DELETE_POST,
                payload: id
            })
        )
        .catch(err =>
            dispatch(getErrors(err.response.data))
        );
};

// Add Like
export const addLike = id => dispatch => {
    axios
        .post(`/api/posts/like/${id}`)
        .then(res => dispatch(getAllPosts()))
        .catch(err =>
            dispatch(getErrors(err.response.data))
        );
};

// Remove Like
export const removeLike = id => dispatch => {
    axios
        .post(`/api/posts/unlike/${id}`)
        .then(res => dispatch(getAllPosts()))
        .catch(err =>
            dispatch(getErrors(err.response.data))
        );
};

// Add Comment
export const addUserComment = (postId, commentData) => dispatch => {
    dispatch(clearErrors());
    axios
        .post(`/api/posts/comment/${postId}`, commentData)
        .then(res =>
            dispatch(getPost(res.data))
        )
        .catch(err =>
            dispatch(getErrors(err.response.data))
        );
};

// Delete Comment
export const deleteUserComment = (postId, commentId) => dispatch => {
    axios
        .delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(res =>
            dispatch(getPost(res.data))
        )
        .catch(err =>
            dispatch(getErrors(err.response.data))
        );
};
