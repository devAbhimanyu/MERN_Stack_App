import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUserComment } from '../../../../store/actions/post.action';
import TextArea from '../../../../components/UI/Input/TextArea';

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            errors: {}
        };

    }

    componentWillReceiveProps(newProps) {
        if (newProps.errorRed) {
            this.setState({ errors: newProps.errorRed });
        }
    }

    onSubmitHandler = (eve) => {
        eve.preventDefault();

        const { user } = this.props.authRed;
        const { postId } = this.props;

        const newComment = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        };

        this.props.addComment(postId, newComment);
        this.setState({ text: '' });
    }

    onChangeHandler = (eve) => {
        this.setState({ [eve.target.name]: eve.target.value });
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white"> Make a comment...</div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmitHandler}>
                            <div className="form-group">
                                <TextArea
                                    placeholder="Reply to post"
                                    name="text"
                                    value={this.state.text}
                                    delegateFunc={this.onChangeHandler}
                                    error={errors.text}
                                />
                            </div>
                            <button type="submit" className="btn btn-dark">Submit </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    authRed: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    errorRed: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    authRed: state.authReducer,
    errorRed: state.errorsReduder
});

const mapDispatchToProps = dispatch => {
    return {
        addComment: (postId, comment) => dispatch(addUserComment(postId, comment))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
