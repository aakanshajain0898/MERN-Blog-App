const express = require('express');
const requireLogin = require('../middleware/requireLogin');
const userController = require('../controllers/user');
const router = express.Router();

router.get('/user/:id', requireLogin, userController.getUser);
router.put('/edit-profile', requireLogin, userController.editProfile);
router.put('/follow', requireLogin, userController.follow);
router.put('/unfollow', requireLogin, userController.unfollow);
router.put('/updatepic', requireLogin, userController.updatePic);
router.post('/search-users', requireLogin, userController.searchUsers);

module.exports = router;
