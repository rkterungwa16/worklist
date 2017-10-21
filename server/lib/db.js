import mongoose from 'mongoose';

exports.connect = function(url, cb) {
  cb = cb || function(err) {
    if (err) {
      console.error('database connection failure: \n' + err.stack);
      process.exit(1);
    }
  };

  mongoose.connect(url, { safe: true }, cb);
};
