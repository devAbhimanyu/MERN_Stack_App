const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validatePostInput = require('../../validations/post');

//db Models

//load Profile Model
const Profile = require('../../Models/Profile');
//load Post Model
const Post = require('../../Models/Post');
//loading user model
const User = require('../../Models/Users');


//@route get /api/posts/test
//@desc test posts route
//@access  public route
router.get('/test', (req, res) => {
    return res.json({
        msg: 'posts work'
    });
});

//@route get /api/posts/
//@desc get all  posts 
//@access  public route
router.get('/', (req, res) => {
    Post.find()
        .sort({ data: -1 })
        .then(posts =>
            res.status(200).json(posts)
        )
        .catch(err =>
            res.status(400).json({ post: 'error fetching posts', error: err })
        )
});

//@route get /api/posts/:id
//@desc get single post 
//@access  public route
router.get('/:id', (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (!post) throw { message: 'post does not exist for given ID' };
            res.status(200).json(post)
        })
        .catch(err =>
            res.status(400).json({ post: 'error fetching single post', error: err })
        )
});

//@route post /api/posts/
//@desc create Post
//@access  private route
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });
    newPost.save()
        .then(post => res.json(post))
});

//-----------delete
//@route delete /api/posts/:id
//@desc delete post
//@access  private route
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const error = {};
    Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id)
            .then(post => {
                if (post.user.toString() !== req.user.id) {
                    error.message = 'user does not have access to delete post';
                    return res.status(401).json(error);
                }
                post.remove().then(() => res.status(200).json({ succes: 'post deleted' }))
            }
            )
            .catch(err => {
                error.notFound = 'post not fount';
                error.info = err;
                res.status(400).json(error);
            }
            );
    });
});


//-----likes section
//@route post /api/posts/like/:id
//@desc add like
//@access  private route
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const error = {};
    Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id)
            .then(post => {
                if (post.likes.filter(like => {
                    return like.user.toString() === req.user.id;
                }).length > 0
                ) {
                    return res
                        .status(400)
                        .json({ alreadyLiked: 'User has already like the post' });
                }
                post.likes.unshift({ user: req.user.id });

                post.save().then(post => res.json(post));
            }
            )
            .catch(err => {
                error.notFound = 'post not fount';
                error.info = err;
                res.status(400).json(error);
            }
            );
    });
});

//@route post /api/posts/unlike/:id
//@desc add unlike
//@access  private route
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const error = {};
    Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id)
            .then(post => {
                if (post.likes.filter(like => {
                    return like.user.toString() === req.user.id;
                }).length === 0
                ) {
                    return res
                        .status(400)
                        .json({ alreadyLiked: 'User cannot unlike the post' });
                }
                const removeIndex = post.likes
                    .map(item => item.user.toString())
                    .indexOf(req.user.id);

                post.likes.splice(removeIndex, 1);

                post.save().then(post => res.json(post));
            }
            )
            .catch(err => {
                error.notFound = 'post not fount';
                error.info = err;
                res.status(400).json(error);
            }
            );
    });
});


//--- comments
//@route post /api/posts/comment/:id
//@desc add comment
//@access  private route
router.post(
    '/comment/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validatePostInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }

        Post.findById(req.params.id)
            .then(post => {
                const newComment = {
                    text: req.body.text,
                    name: req.body.name,
                    avatar: req.body.avatar,
                    user: req.user.id
                };
                post.comments.unshift(newComment);
                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json(
                {
                    notFound: 'Post does not exist',
                    error: err
                }
            ));
    }
);

//@route delete /api/posts/comment/:id/:comment_id
//@desc delete comment
//@access  private route
router.delete(
    '/comment/:id/:comment_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Post.findById(req.params.id)
            .then(post => {
                if (
                    post.comments.filter(
                        comment => comment._id.toString() === req.params.comment_id
                    ).length === 0
                ) {
                    return res
                        .status(404)
                        .json({ commentnotexists: 'User cannot delete comment, which doesnt exist' });
                }
                const removeIndex = post.comments
                    .map(item => item._id.toString())
                    .indexOf(req.params.comment_id);

                post.comments.splice(removeIndex, 1);
                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json(
                {
                    notFound: 'Post does not exist',
                    error: err
                }
            ));
    }
);

module.exports = router;