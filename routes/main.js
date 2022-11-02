const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const postsController = require('../controllers/posts');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

//Main Routes - simplified for now
router.get('/', postsController.getLaunches);
router.get('/events', postsController.getEvents);
router.get('/agencies', postsController.getAgencies);
router.get('/astronauts', postsController.getAstronauts);
router.get('/spacecrafts', postsController.getSpacecrafts);
router.get('/stations', postsController.getStations);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/profile', postsController.getProfile);
router.get('/logout', authController.logout);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

module.exports = router;
