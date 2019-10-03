var express = require('express');
var router = express.Router();
let config = require('../config/config');
let middleware = require('../middlewares/checktoken');

const userController = require('../controllers/user');

/* GET users listing. */
router.get('/', function(_req, res) {
    res.send('respond with a resource');
});

router.get('/api/v1/', function(_req, res){
    res.status(200).send({
        message: "API ok",
    })
});

router.get('/api/v1/users', middleware.checkToken, function(_req, res){
    res.status(200).send({
        message: "All Users list",
    })
});

router.post('/api/v1/users', userController.create);
router.post('/api/v1/login', userController.login);

module.exports = router;
