const mongoose = require('mongoose');
const log = require('../logger');
const Post = mongoose.model('Post');

exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('postedBy', '_id name pic')
      .populate('comments.postedBy', '_id name')
      .sort('-createdAt');
    res.json({ posts });
  } catch (err) {
    log.error({ err });
  }
};

exports.getSubPost = async (req, res) => {
  try {
    // if postedBy in following
    const posts = await Post.find({ postedBy: { $in: req.user.following } })
      .populate('postedBy', '_id name pic')
      .populate('comments.postedBy', '_id name')
      .sort('-createdAt');
    res.json({ posts });
  } catch (err) {
    log.error({ err });
  }
};

exports.getMyPost = async (req, res) => {
  try {
    const mypost = await Post.find({ postedBy: req.user._id }).populate(
      'postedBy',
      '_id name'
    );
    res.json({ mypost });
  } catch (err) {
    log.error({ err });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.postId,
      postedBy: req.user._id,
    }).populate('postedBy', '_id name');
    res.json({ post });
  } catch (err) {
    log.error({ err });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, body, photo } = req.body;
    // log.debug({title, body, photo});
    if (!title || !body || !photo) {
      log.error('Please add all the fields');
      res.status(422).json({ error: 'Please add all the fields' });
    }
    //   log.debug({user:req.user});
    //   res.send('ok');
    req.user.password = undefined;
    const postCreated = new Post({ title, body, photo, postedBy: req.user });
    const post = await postCreated.save();
    log.debug('Post added');
    res.json({ post, message: 'Created Post Successfully' });
  } catch (err) {
    log.error({ err });
  }
};

exports.editPost = async (req, res) => {
  try {
    const { title, body, photo } = req.body;
    // log.debug({title, body, photo});
    if (!title || !body) {
      res.status(422).json({ error: 'Please add all the fields.' });
    }
    console.log(req.params.postId);
    const post = await Post.findById(req.params.postId).populate(
      'postedBy',
      '_id'
    );
    if (!post) {
      return res.status(422).json({ error: 'Could not find post.' });
    }
    if (post.postedBy._id.toString() !== req.user._id.toString()) {
      return res.status(422).json({ error: 'Not authorized!' });
    }
    post.title = title;
    post.body = body;
    if (photo) {
      post.photo = photo;
    }
    const result = await post.save();
    log.debug('Post edited');
    res.json({ result, message: 'Edited Post Successfully' });
  } catch (err) {
    log.error({ err });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId }).populate(
      'postedBy',
      '_id'
    );
    if (!post) {
      return res.status(422).json({ error });
    }
    if (post.postedBy._id.toString() !== req.user._id.toString()) {
      return res.status(422).json({ error: 'Not authorized!' });
    }
    const result = await post.remove();
    log.debug('Post deleted');
    res.json({ result, message: 'Successfully Deleted' });
  } catch (error) {
    return res.status(422).json({ error });
  }
};

exports.like = async (req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $push: { likes: req.user._id } },
      { new: true }
    )
      .populate('postedBy', '_id name pic')
      .populate('comments.postedBy', '_id name');
    res.json(result);
  } catch (error) {
    return res.status(422).json({ error });
  }
};

exports.unlike = async (req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
      .populate('postedBy', '_id name pic')
      .populate('comments.postedBy', '_id name');
    res.json(result);
  } catch (error) {
    return res.status(422).json({ error });
  }
};

exports.comment = async (req, res) => {
  try {
    const comment = { text: req.body.text, postedBy: req.user._id };
    const result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $push: { comments: comment } },
      { new: true }
    )
      .populate('postedBy', '_id name pic')
      .populate('comments.postedBy', '_id name');
    res.json(result);
  } catch (error) {
    return res.status(422).json({ error });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(
      req.params.postId,
      { $pull: { comments: { _id: req.params.commentId } } },
      { new: true }
    )
      .populate('postedBy', '_id name pic')
      .populate('comments.postedBy', '_id name');
    res.json(result);
  } catch (error) {
    return res.status(422).json({ error });
  }
};
