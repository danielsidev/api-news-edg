const express = require('express');
const router = express.Router();
const AccessController = require('../controllers/access.controller');
const access = new AccessController();

router.post('/login', (req, res, next) => access.login(req, res) );
router.post('/logout', (req, res, next) => access.logout(req, res) );

module.exports = router;