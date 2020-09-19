const mongoose = require('mongoose');
const log = require('../logger');
const Post = mongoose.model('Post');
const User = mongoose.model('User');

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select('-password');
    const posts = await Post.find({ postedBy: req.params.id }).populate(
      'postedBy',
      '_id name'
    );
    res.json({ user, posts });
  } catch (err) {
    res.status(404).json({ error: 'User not found' });
  }
};

exports.editProfile = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { name: req.body.name } },
      { new: true }
    );
    res.json({ result, message: 'Successfully updated profile' });
  } catch (err) {
    return res.status(422).json({ error: "Cann't update profile." });
  }
};

exports.follow = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.body.followId,
      { $push: { followers: req.user._id } },
      { new: true }
    );
    const result = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { following: req.body.followId } },
      { new: true }
    ).select('-password');
    res.json(result);
  } catch (error) {
    res.status(422).json({ error });
  }
};

exports.unfollow = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.body.unfollowId,
      { $pull: { followers: req.user._id } },
      { new: true }
    );
    const result = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { following: req.body.unfollowId } },
      { new: true }
    ).select('-password');
    res.json(result);
  } catch (error) {
    return res.status(422).json({ error });
  }
};

exports.updatePic = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { pic: req.body.pic } },
      { new: true }
    );
    res.json(result);
  } catch (err) {
    return res.status(422).json({ error: "Pic cann't post." });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    let userPattern = new RegExp('^' + req.body.query);
    const user = await User.find({ email: { $regex: userPattern } }).select(
      '_id email'
    );
    res.json({ user });
  } catch (err) {
    log.error({ err });
  }
};
