var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/alta', function(req, res, next) {
    res.render('pages/alta');
});

module.exports = router;