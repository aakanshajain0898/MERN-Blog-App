const express = require('express');
const mongoose = require('mongoose');
const { MONGOURI } = require('./config/keys');
const log = require('./logger');
const app = express();
const PORT = process.env.PORT || 5000;
const customMiddleware = (req, res, next) => {
  log.info('Middleware executed!!');
  next();
};

mongoose
  .connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((err) => log.error({ err }, 'Error connecting'));

mongoose.connection.on('connected', () =>
  log.debug('Connected to mongo yeahh!')
);
// mongoose.connection.on('error', (err) => log.error('Error connecting', err));
require('./models/user');
require('./models/post');

app.use(express.json());
app.use(customMiddleware);
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));
app.get('/home', (req, res) => {
  log.debug('Home');
  res.send('Hello World!');
});

app.get('/about', customMiddleware, (req, res) => {
  log.debug('About');
  res.send('About Page!');
});

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.listen(PORT, () => log.debug('Server is running on', PORT));
