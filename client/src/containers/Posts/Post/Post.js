import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostItem from '../../../components/Posts/PostItem';
import CommentForm from './Comment/CommentForm';
import CommentFeed from '../../../components/Posts/Comments/CommentFeed';
import { getUserPost, deleteUserComment } from '../../../store/actions/post.action';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';

class Post extends Component {
    componentDidMount() {
        this.props.getSelectesPost(this.props.match.params.id);
    }

    deleteCommentHandler = (postId, commentId) => {
        this.props.deleteComment(postId, commentId);
    }

    render() {
        const { post, loading } = this.props.postRed;
        let postContent;

        if (post === null || loading || Object.keys(post).length === 0) {
            postContent = <Modal><Spinner message='Getting Post' /></Modal>;
        } else {
            postContent = (
                <div>
                    <PostItem post={post} showActions={false} />
                    <CommentForm postId={post._id} />
                    <CommentFeed postId={post._id} comments={post.comments} delegateFunc={this.deleteCommentHandler} />
                </div>
            );
        }

        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/user-feed" className="btn btn-light mb-3"> Back To Feed </Link>
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Post.propTypes = {
    getSelectesPost: PropTypes.func.isRequired,
    postRed: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    postRed: state.postReducer
});


const mapDispatchToProps = dispatch => {
    return {
        getSelectesPost: (postId) => dispatch(getUserPost(postId)),
        deleteComment: (postId, commentId) => dispatch(deleteUserComment(postId, commentId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
