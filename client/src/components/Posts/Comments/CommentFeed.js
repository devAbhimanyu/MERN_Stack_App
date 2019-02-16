import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

const CommentFeed = (props) => {
    return props.comments.map(comment => (
        <CommentItem key={comment._id} comment={comment} postId={props.postId} delegateFunction={props.delegateFunc} />
    ));
}

CommentFeed.propTypes = {
    comments: PropTypes.array.isRequired,
    postId: PropTypes.string.isRequired
};

export default CommentFeed;
