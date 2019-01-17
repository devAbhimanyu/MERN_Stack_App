const express = require('express');
const router = express.Router();

//@route get /api/posts/test
//@desc test posts route
//@access  public route
router.get('/test', (req, res) => {
    return res.json({
        msg: 'posts work'
    });
});

module.exports = router;