import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
        errors: 'duplicate data'
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
      }, 'secrete_key');
      res
        .status(201)
        .send(token);
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
}
