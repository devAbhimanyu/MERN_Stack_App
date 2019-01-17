//deals with authentication
const express = require('express');
const router = express.Router();
//@route get /api/users/test
//@desc test users route
//@access  public route

router.get('/test', (req, res) => {
    return res.json({
        msg: 'users work'
    });
});

module.exports = router;