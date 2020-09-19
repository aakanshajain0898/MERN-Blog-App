const express = require('express');
const requireLogin = require('../middleware/requireLogin');
const postController = require('../controllers/post');
const router = express.Router();

router.get('/allpost', requireLogin, postController.getAllPost);
router.get('/getsubpost', requireLogin, postController.getSubPost);
router.get('/mypost', requireLogin, postController.getMyPost);
router.get('/getpost/:postId', requireLogin, postController.getPost);
router.post('/createpost', requireLogin, postController.createPost);
router.put('/editpost/:postId', requireLogin, postController.editPost);
router.delete('/deletepost/:postId', requireLogin, postController.deletePost);
router.put('/like', requireLogin, postController.like);
router.put('/unlike', requireLogin, postController.unlike);
router.put('/comment', requireLogin, postController.comment);
router.delete(
  '/deletecomment/:postId/:commentId',
  requireLogin,
  postController.deleteComment
);

module.exports = router;
