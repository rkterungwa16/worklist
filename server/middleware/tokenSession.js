import jwt from 'jsonwebtoken';

// route middleware to verify a token
const tokenSession = (req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, 'secrete_key', (err, decoded) => {
      if (err) {
        return res.status(403).json('Failed to authenticate token.');
      }
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      next();
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send('No token provided.');
  }
};

export default tokenSession;
