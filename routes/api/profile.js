//location nbio and all
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load Profile Model
const Profile = require('../../Models/Profile');

//loading user model
const User = require('../../Models/Users');

//@route get /api/profile/test
//@desc test profile route
//@access  public route
router.get('/test', (req, res) => {
    return res.json({
        msg: 'profile work'
    });
});
//@route get /api/profile/
//@desc get current user to profile
//@access  private route

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {
                errors.noProfile = 'There is no profile for the user';
                return res.status(404).json(errors);
            }
            return res.status(200).json(profile);
        })
        .catch(err =>
            res.status(404).json(err)
        );
});


//@route post /api/profile/
//@desc  create/ edit user to profile
//@access  private route

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    const profileFields = {};
    profileFields.user = req.body.user;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubUserName) profileFields.githubUserName = req.body.githubUserName;
    //skill split array
    if (typeof req.body.skills !== undefined) {
        profileFields.skills = req.body.skills.split(',');
    }

    //social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.body.id })
        .then(profile => {
            if (profile) {
                //update
                Profile.findOneAndUpdate(
                    { user: req.body.id },
                    { $set: profileFields },
                    { new: true }
                ).then(updProfile => res.json(updProfile));
            } else {
                //create
                //check handle:
                Profile.findOne({ user: profileFields.handle })
                    .then(profile => {
                        errors.handle = 'handle already exits';
                        return res.status(400).json(errors);
                    });
                new Profile(profileFields).save().then(
                    profile => res.json(profile)
                )
            }
        })

});


module.exports = router;