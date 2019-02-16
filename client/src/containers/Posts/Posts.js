import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm/PostForm';
import PostFeed from '../../components/Posts/PostFeed';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import { getAllPosts } from '../../store/actions/post.action';

class Posts extends Component {
    componentDidMount() {
        this.props.getAllUserPost();
    }

    render() {
        const { posts, loading } = this.props.postRed;
        let postContent;

        if (posts === null || loading) {
            postContent = <Modal><Spinner /></Modal>;
        } else {
            postContent = <PostFeed posts={posts} />;
        }

        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <PostForm />
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Posts.propTypes = {
    getAllUserPost: PropTypes.func.isRequired,
    postRed: PropTypes.object.isRequired
};


const mapStateToProps = state => (
    {
        postRed: state.postReducer
    }
);

const mapDispatchToProps = dispatch => {
    return {
        getAllUserPost: () => dispatch(getAllPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
