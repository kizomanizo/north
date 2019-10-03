const User = require('../models').User;
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const uuidv4 = require('uuid/v4');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');

let config = require('../config/config');
let middleware = require('../middlewares/checktoken');

module.exports = {
    create(req, res) {
        var hash = bcrypt.hashSync(req.body.password, salt)
        return User.create({
            uuid:       uuidv4(),
            email:   req.body.email,
            password:   bcrypt.hashSync(req.body.password, salt),
            salt:       salt,
            email:      req.body.email,
            lastlogin:  Date('Y-m-d'),
            status:     "inactive",
            created_by: 0,
        })
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error));
    },
    login (req, res) {
        let email = req.body.email;
        let password = req.body.password;
        // For the given email fetch user from DB
        let mockedEmail = 'another@example.com';
        let mockedPassword = 'another';
    
        if (email && password) {
          if (email === mockedEmail && password === mockedPassword) {
            let token = jwt.sign({email: email},
              config.secret,
              { expiresIn: '24h' // expires in 24 hours
              }
            );
            // return the JWT token for the future API calls
            res.json({
              success: true,
              message: 'Authentication successful!',
              token: token
            });
          } else {
            res.send(403).json({
              success: false,
              message: 'Incorrect email or password'
            });
          }
        } else {
          res.send(400).json({
            success: false,
            message: 'Authentication failed! Please check the request'
          });
        }
      },
};