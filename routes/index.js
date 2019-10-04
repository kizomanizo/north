var express = require('express');
var router = express.Router();
let config = require('../config/variables');
let middleware = require('../middlewares/checktoken');

const userController = require('../controllers/user');

/* GET users listing. */
router.get('/', function(_req, res) {
    res.send('respond with a resource');
});

router.get('/api/v1/', function(_req, res){
    res.sendStatus(200).send({
        message: "API ok",
    })
});

router.post('/api/v1/users/login', userController.login);
router.post('/api/v1/users',middleware.checkToken, userController.create);
router.get('/api/v1/users', middleware.checkToken, userController.all);
router.get('/api/v1/users/search/:UserUuid', middleware.checkToken, userController.search);
router.post('/api/v1/users/delete/:UserUuid', middleware.checkToken, userController.delete);
router.post('/api/v1/users/activate/:UserUuid', middleware.checkToken, userController.activate);

module.exports = router;