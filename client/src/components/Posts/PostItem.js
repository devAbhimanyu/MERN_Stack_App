import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../store/actions/post.action';

class PostItem extends Component {
    onDeletekHandler(postId) {
        this.props.deleteCurrentPost(postId);
    }

    onLikeHandle(postId) {
        this.props.addLikeToPost(postId);
    }

    onUnlikeHandler(postId) {
        this.props.removeLikeFromPost(postId);
    }

    findUserLike(likes) {
        const { authRed } = this.props;
        if (likes.filter(like => like.user === authRed.user.id).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const { post, authRed, showActions } = this.props;

        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="profile.html">
                            <img
                                className="rounded-circle d-none d-md-block"
                                src={post.avatar}
                                alt=""
                            />
                        </a>
                        <br />
                        <p className="text-center">{post.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{post.text}</p>
                        {showActions ? (
                            <span>
                                <button
                                    onClick={() => this.onLikeHandle(post._id)}
                                    type="button"
                                    className="btn btn-light mr-1">
                                    <i
                                        className={classnames('fas fa-thumbs-up', {
                                            'text-info': this.findUserLike(post.likes)
                                        })}
                                    />
                                    <span className="badge badge-light">{post.likes.length}</span>
                                </button>
                                <button
                                    onClick={() => this.onUnlikeHandler(post._id)}
                                    type="button"
                                    className="btn btn-light mr-1"
                                >
                                    <i className="text-secondary fas fa-thumbs-down" />
                                </button>
                                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">Comments</Link>
                                {post.user === authRed.user.id ? (
                                    <button
                                        onClick={() => this.onDeletekHandler(post._id)}
                                        type="button"
                                        className="btn btn-danger mr-1"
                                    >
                                        <i className="fas fa-times" />
                                    </button>
                                ) : null}
                            </span>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

PostItem.defaultProps = {
    showActions: true
};

PostItem.propTypes = {
    deleteCurrentPost: PropTypes.func.isRequired,
    addLikeToPost: PropTypes.func.isRequired,
    removeLikeFromPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    authRed: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    authRed: state.authReducer
});


const mapDispatchToProps = dispatch => {
    return {
        deleteCurrentPost: (postId) => dispatch(deletePost(postId)),
        addLikeToPost: (postId) => dispatch(addLike(postId)),
        removeLikeFromPost: (postId) => dispatch(removeLike(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);