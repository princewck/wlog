const Router = require('koa-router');
const userController = require('./controller/userController');
const testController = require('./controller/testController');
const articleController = require('./controller/articleController');
const authController = require('./controller/authController');
const checkAuth = require('./middleware/auth');

const router = new Router();

router.use(['/post'], checkAuth);

router.post('/test/:id', testController.test);

router.get('/users', userController.findAllUsers);
router.get('/user/:id', userController.get);
router.post('/user', userController.create);


router.post('/post', articleController.create);
router.get('/posts', articleController.list);
router.get('/post/:id', articleController.get);

router.post('/login', authController.login);
router.post('/checkToken', authController.verify)
router.post('/decode', authController.decode)

module.exports = router;
