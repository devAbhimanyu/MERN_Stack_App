//location nbio and all
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validateProfileInput = require('../../validations/profile');
const validateExpInput = require('../../validations/experience');
const validateEduInput = require('../../validations/education');

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
        .populate('user', ['name', 'avatar'])
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

//@route get /api/profile/all
//@desc get all profiles
//@access  public route
router.get('/all', (req, res) => {
    const errors = {};
    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.noProfiles = 'There is no profiles to fetch';
                return res.status(404).json(errors);
            }
            return res.status(200).json(profiles);
        })
        .catch(err =>
            res.status(404).json({ profile: 'There is no profiles to fetch', error: err })
        );
});


//@route get /api/profile/handle/:handle
//@desc get profile from Handle
//@access  public route
router.get('/handle/:handle', (req, res) => {
    const errors = {};
    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noProfile = 'There is no profile for the handle';
                return res.status(404).json(errors);
            }
            return res.status(200).json(profile);
        })
        .catch(err =>
            res.status(404).json(err)
        );
});


//@route get /api/profile/user/:user_id
//@desc get profile from user_id
//@access  public route
router.get('/user/:user_id', (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noProfile = 'There is no profile for the handle';
                return res.status(404).json(errors);
            }
            return res.status(200).json(profile);
        })
        .catch(err =>
            res.status(404).json({ profile: 'There is no profile for the user id', error: err })
        );
});


//@route post /api/profile/
//@desc  create/ edit user to profile
//@access  private route
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
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

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (profile) {
                //update
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                ).then(
                    updProfile =>
                        res.json(updProfile));
            } else {
                //create
                //check handle:
                Profile.findOne({ handle: profileFields.handle })
                    .then(profile => {
                        if (profile) {
                            errors.handle = 'handle already exits';
                            return res.status(400).json(errors);
                        }
                        new Profile(profileFields).save().then(
                            profile => res.json(profile));
                    });


            }
        })

});

//@route post /api/profile/experience
//@desc add experience to profile
//@access  private route
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateExpInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };

            //add to exp array
            profile.experience.unshift(newExp);

            profile.save().then(profile => res.json(profile));
        })
        .catch(err => {
            res.status(404).json({ profile: 'There is no profile for the user id', error: err })
        });
});


//@route post /api/profile/education
//@desc add education to profile
//@access  private route
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateEduInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const newEdu = {
                school: req.body.school,
                degree: req.body.degree,
                fieldOfStudy: req.body.fieldOfStudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };

            //add to exp array
            profile.education.unshift(newEdu);

            profile.save().then(profile => res.json(profile));
        })
        .catch(err => {
            res.status(404).json({ profile: 'There is no profile for the user id', error: err })
        });
});

//-------delete routes

//@route Delete /api/profile/experience/:expId
//@desc delete experience from profile
//@access  private route
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                const removeIndex = profile.experience.map(item =>
                    item.id)
                    .indexOf(req.params.exp_id);

                //splice out array
                profile.experience.splice(removeIndex, 1);

                profile.save().then(
                    profile =>
                        res.status(200).json(profile)
                )
            })
            .catch(err => {
                res.status(404).json({ profile: 'There is no profile for the experience id', error: err })
            });;
    });

//@route Delete /api/profile/education/:edu_id
//@desc delete experience from profile
//@access  private route
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                const removeIndex = profile.education.map(item =>
                    item.id)
                    .indexOf(req.params.edu_id);

                //splice out array
                profile.education.splice(removeIndex, 1);

                profile.save().then(
                    profile =>
                        res.status(200).json(profile)
                )
            })
            .catch(err => {
                res.status(404).json({ profile: 'There is no profile for the experience id', error: err })
            });;
    });

//@route Delete /api/profile/
//@desc delete user and profile
//@access  private route
router.delete('/', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOneAndRemove({ user: req.user.id })
            .then(() => {
                User.findOneAndRemove({ _id: req.user.id })
                    .then(() =>
                        res.json({ success: 'succesfully removed' }
                        ));
            })
            .catch(err => {
                res.status(404).json({ profile: 'There is no profile for the experience id', error: err })
            });
    });

module.exports = router;