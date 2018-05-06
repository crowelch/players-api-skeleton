const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.send('oh hi Mark');
});

router.post('/', function(req, res) {

});

router.delete('/', function(req, res) {

});

module.exports = router;
