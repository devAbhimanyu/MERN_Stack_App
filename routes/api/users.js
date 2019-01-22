//deals with authentication
const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const router = express.Router();
const passport = require('passport');
const jwToken = require('jsonwebtoken');
const tKey = require('../../config/config.keys.dev').tokenKey;
const validRegInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');
//loading user model
const User = require('../../Models/Users');

//@route get /api/users/test
//@desc test users route
//@access  public route
router.get('/test', (req, res) => {
  return res.json({
    msg: 'users work'
  });
});

//@route post /api/users/register
//@desc register users
//@access  public route
router.post('/register', (req, res) => {
  const { errors, isValid } = validRegInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors)
  }
  console.log(req.body);
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: 'User already Exists' });
      }
      else {
        const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' })
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              throw err;
            }
            else {
              newUser.password = hash;
              newUser.save()
                .then((user) => {
                  return res.json(user);
                })
                .catch(err => {
                  res.status(500).json({ user: 'Error while saving user to database', error: err })
                })
            }

          });
        });
      }
    });
});


//@route post /api/users/login
//@desc login users
//@access  public route
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email;
  const password = req.body.password;
  //find User by email
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'email not found';
      return res.status(404).json(errors);
    }
    // check password:
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user matched
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        }
        //Sign Token
        jwToken.sign(payload, tKey, { expiresIn: 3600 },
          (err, token) => {
            res.json({ success: true, token: `Bearer ${token}` });
          })
      }
      else {
        errors.password = 'Invalid Password'
        return res.status(400).json(errors);
      }
    });
  }).catch(err => {
    return res.status(500).json(err);
  });

});


//@route get /api/users/current
//@desc return current user
//@access private route
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    avatar: req.user.avatar
  });
})



module.exports = router;