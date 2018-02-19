const Router = require('koa-router');
const userController = require('./controller/userController');
const testController = require('./controller/testController');
const articleController = require('./controller/articleController');

const router = new Router();

router.get('/users', userController.findAllUsers);
router.post('/test/:id', testController.test);


router.post('/post', articleController.create);
router.get('/posts', articleController.list);

module.exports = router;
