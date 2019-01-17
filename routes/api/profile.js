//location nbio and all
const express = require('express');
const router = express.Router();

//@route get /api/profile/test
//@desc test profile route
//@access  public route
router.get('/test', (req, res) => {
    return res.json({
        msg: 'profile work'
    });
});

module.exports = router;