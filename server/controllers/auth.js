const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { JWT_SECRET, SENDGRID_API, EMAIL } = require('../config/keys');
const log = require('../logger');
const User = mongoose.model('User');

const transporter = nodemailer.createTransport(
  sendgridTransport({ auth: { api_key: SENDGRID_API } })
);

exports.signup = async (req, res) => {
  try {
    //   log.debug({name:req.body.name});
    const { name, email, password, pic } = req.body;
    if (!email || !password || !name) {
      return res.status(422).json({ error: 'Please add all the fields.' });
    }
    const savedUser = await User.findOne({ email });
    if (savedUser) {
      return res
        .status(422)
        .json({ error: 'User already exists with that email.' });
    }
    const hashedpassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedpassword, name, pic });
    const result = await user.save();
    transporter.sendMail({
      to: user.email,
      from: 'aakanshajain0898@gmail.com',
      subject: 'Signup Success',
      html: '<h1>Welcome to My Blogging Site</h1>',
    });
    res.json({ message: 'Successfully Posted!' });
  } catch (err) {
    log.err({ err });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: 'Please add email or password.' });
    }
    const savedUser = await User.findOne({ email });
    if (!savedUser) {
      return res.status(422).json({ error: 'Invalid Email or password.' });
    }
    const doMatch = await bcrypt.compare(password, savedUser.password);
    if (doMatch) {
      const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
      const { _id, name, email, followers, following, pic } = savedUser;
      res.json({
        token,
        user: { _id, name, email, followers, following, pic },
        message: 'Successfully SignedIn',
      });
    } else {
      return res.status(422).json({ error: 'Invalid Email or password' });
    }
  } catch (err) {
    log.error({ err });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const buffer = await crypto.randomBytes(32);
    const token = buffer.toString('hex');
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(422)
        .json({ error: "USer don't exists with that email." });
    }
    user.resetToken = token;
    user.expireToken = Date.now() + 3600000;
    const result = await user.save();
    transporter.sendMail({
      to: user.email,
      from: 'aakanshajain0898@gmail.com',
      subject: 'Password Reset',
      html: `
      <p>You requested for password reset</p>
      <h5>Click on this <a href="${EMAIL}/reset/${token}">link</a> to reset passord</h5>
      `,
    });
    res.json({ message: 'Check your email.' });
  } catch (err) {
    log.error({ err });
  }
};

exports.newPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      resetToken: req.body.token,
      expireToken: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(422).json({ error: 'Try again session expired.' });
    }
    const hashedpassword = await bcrypt.hash(req.body.password, 12);
    user.password = hashedpassword;
    user.resetToken = undefined;
    user.expireToken = undefined;
    const savedUser = await user.save();
    res.json({ message: 'Password updated success' });
  } catch (err) {
    log.error({ err });
  }
};
