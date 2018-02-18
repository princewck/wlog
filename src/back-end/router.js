const Router = require('koa-router');
const userController = require('./controller/userController');
const testController = require('./controller/testController');

const router = new Router();

router.get('/users', userController.findAllUsers);
router.get('/test', testController.test);

module.exports = router;
