var express = require('express');
var router = express.Router();
let middleware = require('../middlewares/checktoken');

const userController = require('../controllers/user');
const levelController = require('../controllers/level');

/* ROOT Dir. */
router.get('/', function(_req, res) {
    res.status(200).send({
        success: true,
        message: 'nothing to be seen here',
    });
});

router.get('/api/v1/', function(_req, res){
    res.sendStatus(200).send({
        success: true,
        message: "API ok",
    })
});

// User Routes
router.post('/api/v1/users/login', userController.login);
router.post('/api/v1/users', userController.create);
router.get('/api/v1/users', middleware.checkToken, userController.all);
router.get('/api/v1/users/search/:UserUuid', middleware.checkToken, userController.search);
router.post('/api/v1/users/delete/:UserUuid', middleware.checkToken, userController.delete);
router.post('/api/v1/users/activate/:UserUuid', middleware.checkToken, userController.activate);

// Level Routes
router.post('/api/v1/levels', levelController.create);
router.get('/api/v1/levels', levelController.all);
router.get('/api/v1/levels/search/:LevelUuid', middleware.checkToken, levelController.search);
router.post('/api/v1/levels/delete/:LevelUuid', middleware.checkToken, levelController.delete);

module.exports = router;