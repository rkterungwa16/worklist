import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import GoogleAuth from 'google-auth-library';
import fs from 'fs';
import User from '../models/userModel';

/**
* Create new user
* @param {object} req for first parameter
* @param {object} res for second parameter
* @returns {object} a response object
*/
export const createUser = (req, res) => {
  const username = req.body.username.toLowerCase();
  const email = req.body.email;
  const salt = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync(req.body.password, salt);
  const query = {
    email
  };
  const data = fs.readFileSync('/Users/andeladeveloper/Documents/projectFiles/worklist/public/images/avatar.png');
  const contentType = 'image/png';
  const image = {
    data,
    contentType
  };

  User.findOne(query, (err, user) => {
    if (user) {
      res.status(422).send({
        errors: 'user already exists'
      });
    } else {
      const userData = {
        username,
        password,
        email,
        salt,
        image
      };
      new User(userData).save((err, newUser) => {
        const token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          id: newUser.id
        }, process.env.SECRET_KEY);
        res
          .status(201)
          .json({ token });
      });
    }
  });
};

/**
* Log in a registered user
* @param {object} req for first parameter
* @param {string} req.email a user's email
* @param {string} req.password a user's password
* @param {object} res for second parameter
* @returns {object} a response object
*/
export const loginUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const query = {
    email
  };
  User.findOne(query, (err, user) => {
    const hashedPassword = bcrypt.hashSync(password, user.salt);
    if (err || !user || user.password !== hashedPassword) {
      res.status(422).send({
        errors: 'user does not exist'
      });
    } else {
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        id: user.id
      }, process.env.SECRET_KEY);
      res
        .status(201)
        .json({ token });
    }
  });
};

export const editProfile = (req, res) => {
  const id = req.params.id;
  const username = req.body.username;
  const newPassword = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  let password;

  const query = {
    _id: id
  };
  let update;
  if (!username && !newPassword) {
    return res
      .status(401)
      .send('Nothing to change');
  } else if (!newPassword && username) {
    update = { username };
  } else if (!username && newPassword) {
    password = bcrypt.hashSync(newPassword, salt);
    update = {
      password,
      salt
    };
  } else {
    password = bcrypt.hashSync(newPassword, salt);
    update = {
      username,
      password,
      salt
    };
  }
  const options = { new: true };
  User.findOneAndUpdate(query, update, options, (err, user) => {
    res
      .status(200)
      .json({ user });
  });
};

export const googleAuth = (req, res) => {
  const auth = new GoogleAuth();
  const client = new auth.OAuth2(process.env.GOOGLE_CLIENT_ID, '', '');
  client.verifyIdToken(req.body.id_token, process.env.GOOGLE_CLIENT_ID,
    (error, login) => {
      if (error) {
        return res.status(401).json({
          globals: 'Email verification Unsuccessful,'
          + ' Please signup with a valid email'
        });
      }
      const payload = login.getPayload();
      if (payload.email_verified && payload.aud === process.env.GOOGLE_CLIENT_ID) {
        const query = {
          email: payload.email
        };
        User.findOne(query, (err, user) => {
          if (user) {
            const token = jwt.sign({
              exp: Math.floor(Date.now() / 1000) + (60 * 60),
              id: user.id
            }, 'secrete_key');
            return res
              .status(201)
              .json({ token });
          }
          const userData = {
            username: `${payload.name}`,
            email: `${payload.email}`,
            image: `${payload.picture}`
          };
          new User(userData).save((err, newUser) => {
            const token = jwt.sign({
              exp: Math.floor(Date.now() / 1000) + (60 * 60),
              id: newUser.id
            }, process.env.SECRET_KEY);

            res
              .status(201)
              .json({ token });
          });
        });
      }
    }
  );
};

/**
* Get the current user
* @param {object} req for first parameter
* @param {object} res for second parameter
* @returns {object} a response object
*/
export const getUser = (req, res) => {
  const id = req.params.id;

  const query = {
    _id: id
  };

  User.find(query, (err, user) => {
    const username = user[0].username;
    res
      .status(200)
      .json({ username });
  });
};
