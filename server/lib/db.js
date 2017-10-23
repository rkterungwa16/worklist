import mongoose from 'mongoose';

const connect = (url, cb) => {
  const connectionError = (err) => {
    if (err) {
      console.error(`database connection failure: \n${err.stack}`);
      process.exit(1);
    }
  };
  cb = cb || connectionError;
  mongoose.connect(url, { safe: true }, cb);
};

export default connect;
