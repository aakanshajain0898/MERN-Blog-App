const Logger = require('bunyan');

const log = Logger.createLogger({
  name: 'myBlog',
  streams: [{ level: 'debug', stream: process.stdout }],
  serializers: {
    req: Logger.stdSerializers.req,
    res: Logger.stdSerializers.res,
    err: Logger.stdSerializers.err,
  },
  //   src: true,
});

module.exports = log;
