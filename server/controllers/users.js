import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import GoogleAuth from 'google-auth-library';
import fs from 'fs';
import User from '../models/userModel';

const GOOGLE_CLIENT_ID = '170866267321-gsutr8128dndq2cbftoea7n4tdagftom.apps.googleusercontent.com';

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
  console.log('I AM HERE');
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
        }, 'secrete_key');
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
  console.log('This is the req body', req.body);
  const query = {
    email
  };
  console.log('I AM HERE', password);
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
      }, 'secrete_key');
      res
        .status(201)
        .json({ token });
    }
  });
};

export const changeProfile = (req, res) => {
  const file = req.files;
  console.log(file);
  res
    .status(201)
    .send(file);
  // const newImage = req.body.image;
  // const change = {image: newImage};

  // User.update(query, change, (err, user) => {

  // });
};

export const googleAuth = (req, res) => {
  console.log('IAM IN THE SERVER SIDE', GOOGLE_CLIENT_ID);
  console.log('IAM IN THE SERVER SIDE', req.body.id_token);
  const auth = new GoogleAuth();
  const client = new auth.OAuth2(GOOGLE_CLIENT_ID, '', '');
  client.verifyIdToken(req.body.id_token, GOOGLE_CLIENT_ID,
    (error, login) => {
      if (error) {
        console.log('ERROR', error);
        return res.status(401).json({
          globals: 'Email verification Unsuccessful,'
          + ' Please signup with a valid email'
        });
      }
      console.log('BEFORE PAYLOAD', login);
      const payload = login.getPayload();
      if (payload.email_verified && payload.aud === GOOGLE_CLIENT_ID) {
        const query = {
          email: payload.email
        };
        console.log('AFTER PAYLOAD', query);
        User.findOne(query, (err, user) => {
          if (user) {
            res.status(422).send({
              errors: 'user already exists'
            });
          } else {
            const userData = {
              username: `${payload.name}`,
              email: `${payload.email}`,
              image: `${payload.picture}`
            };

            new User(userData).save((err, newUser) => {
              const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                id: newUser.id
              }, 'secrete_key');

              console.log('GOOGLE TOKEN', token);
              res
                .status(201)
                .json({ token });
            });
          }
        });
      }
    }
  );
};
