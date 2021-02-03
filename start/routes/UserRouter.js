const { Router } = require('express');
const router = new Router();

const UserController = require('../../app/Controllers/UserController');

router.get('/', UserController.index);

module.exports = router;
