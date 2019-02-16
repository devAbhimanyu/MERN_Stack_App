import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CommentItem = (props) => {
    const { comment, postId, authRed } = props;
    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-2">
                    <a href="profile.html">
                        <img
                            className="rounded-circle d-none d-md-block"
                            src={comment.avatar}
                            alt=""
                        />
                    </a>
                    <br />
                    <p className="text-center">{comment.name}</p>
                </div>
                <div className="col-md-10">

                    <p className="lead">{comment.text}</p>
                    {comment.user === authRed.user.id ? (
                        <button
                            onClick={() => props.delegateFunction(postId, comment._id)}
                            type="button"
                            className="btn btn-danger mr-1"
                        >
                            <i className="fas fa-times" />
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
}


CommentItem.propTypes = {
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    authRed: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    authRed: state.authReducer
});

export default connect(mapStateToProps)(CommentItem);
