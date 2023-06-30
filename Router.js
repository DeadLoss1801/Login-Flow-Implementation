const express = require('express');
const router = express.Router();
const controller = require('./controller')

// GET REQUESTS
router.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
})

router.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html');
})

// POST REQUESTS
router.post('/login', controller.login)
router.post('/register', controller.signup);

module.exports = router;