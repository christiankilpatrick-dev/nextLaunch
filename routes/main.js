const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const postsController = require('../controllers/posts');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

//Main Routes - simplified for now
router.get('/', postsController.getFeed);
router.get('/profile', postsController.getProfile);
router.get('/events', postsController.getEventsFeed);
router.get('/agencies', postsController.getAgenciesFeed);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

module.exports = router;
