const User = require('../models').User;
const Level = require('../models').Level;
const uuidv4 = require('uuid/v4');
let jwt = require('jsonwebtoken');
let variables = require('../config/variables');

module.exports = {
    // List all users in the system
    all(_req, res) {
        User.findAll()
        .then(users =>  res.status(200).send(users))
        .catch(error => res.status(400).send(error));
    },

    // Create a user
    create(req, res) {
        return User.create({
            uuid:       uuidv4(),
            email:      req.body.email,
            password:   req.body.password,
            email:      req.body.email,
            lastlogin:  Date('Y-m-d'),
            status:     "inactive",
            created_by: req.body.user,
        }, {
            include: [{
              model: Level,
            }]
          })
        // .then(User.setLevels(req.body.level))
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error));
    },
    
    // Change user's status from beng inactive to being active
    activate(req, res) {
      User.update({status: "active"}, {where: {uuid: req.params.UserUuid}})
        .then(user =>  res.status(200).send(user))
        .catch(error => res.status(400).send(error));
    },

    // Search for a specific user using UUID, for Primary key utumie findByPk(req.params.UserId)
    search(req, res) {
        User.findOne({where: {uuid: req.params.UserUuid} })
        .then(user =>  res.status(200).send(user))
        .catch(error => res.status(400).send(error));
    },

    // Delete a specific user using UUID, for Primary key utumie findByPk(req.params.UserId)
    delete(req, res) {
      User.findOne({where: {uuid: req.params.UserUuid} })
      .then(user => { return user.destroy()} )
      .then(user =>  res.status(200).send(user))
      .catch(error => res.status(400).send(error));
    },

    // Login the user by checking credentials and issuing a bearer token
    login (req, res) {
        let bodyEmail =     req.body.email;
        let bodyPassword =  req.body.password;
        User.findOne({ where: { email: bodyEmail } }).then(async function (user) {
            if (!user) {
                res.status(400).json({ 
                    success: false,
                    message: 'Incorrect email or password',
                });
            } else if (!await user.validPassword(bodyPassword)) {
                res.status(400).json({
                    success: false,
                    message: 'Incorrect email or password'
                });
            } else {
                let token = jwt.sign({email: bodyEmail},
                    variables.secret, {
                        expiresIn: '60d' // it can be 1m, 2h, 1y, 6000(1 minute), etc.
                    });
                res.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token,
                });
            }
        });
    },
};