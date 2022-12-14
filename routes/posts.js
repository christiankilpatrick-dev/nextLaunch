const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const postsController = require('../controllers/posts');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

//Post Routes - simplified for now
router.get('/:id', postsController.getLaunch);

router.get('/event/:id', postsController.getEvent);

router.get('/agency/:id', postsController.getAgency);

router.get('/astronaut/:id', postsController.getAstronaut);

router.get('/station/:id', postsController.getStation);

router.put('/likePost/:id', postsController.likePost);

router.delete('/deletePost/:id', postsController.deletePost);

module.exports = router;
