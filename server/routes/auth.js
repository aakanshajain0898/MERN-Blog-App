const express = require('express');
const authController = require('../controllers/auth');
const requireLogin = require('../middleware/requireLogin');
const router = express.Router();

router.get('/', (req, res) => res.send('Hello'));
router.get('/protected', requireLogin, (req, res) => {
  res.send('Hello user!');
});

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/reset-password', authController.resetPassword);
router.post('/new-password', authController.newPassword);

module.exports = router;
