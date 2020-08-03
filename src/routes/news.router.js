const express = require('express');
const router = express.Router();
const AuthenticationController = require('../controllers/authentication.controller');
const NewsController = require('../controllers/news.controller');
const news = new NewsController();
const auth = new AuthenticationController();

router.get('/',auth.verify, (req, res) => news.listAll(req, res));

router.get('/:id',auth.verify, (req, res) => news.listById(req, res) );

router.post('/',auth.verify, (req, res) => news.save(req, res));

router.put('/:id', auth.verify,(req, res) => news.update(req, res));

router.delete('/:id',auth.verify, (req, res) => news.remove(req, res));

module.exports = router;