const TesteController = require('../controllers/TesteController');
const UsersController = require('../controllers/UsersController');
const UserController = require('../controllers/UserController');
const express = require('express');
const router = express.Router();


router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.destroy);

module.exports = router;

    router.get('/userss', UsersController.index);
    router.get('/userss/:id', UsersController.show);
    router.post('/userss', UsersController.store);
    router.put('/userss/:id', UsersController.update);
    router.delete('/userss/:id', UsersController.destroy);
    router.get('/testes', TesteController.index);
    router.get('/testes/:id', TesteController.show);
    router.post('/testes', TesteController.store);
    router.put('/testes/:id', TesteController.update);
    router.delete('/testes/:id', TesteController.destroy);