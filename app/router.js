const Router = require('koa-router');
const userController = require('./controller/userController');
const testController = require('./controller/testController');
const articleController = require('./controller/articleController');
const authController = require('./controller/authController');
const tagController = require('./controller/tagController');
const checkAuth = require('./middleware/auth');
const ossController = require('./controller/ossController');

const router = new Router();

router.use(['/tag', '/post', '/my/posts', '/tag', '/tag/:id', '/tags/:userId', '/aliyun_sts'], checkAuth);

router.post('/test/:id', testController.test);

router.get('/users', userController.findAllUsers);
router.get('/user/:id', userController.get);
router.post('/user', userController.create);


router.post('/post', articleController.create);
router.get('/posts', articleController.list);
router.get('/post/:id', articleController.get);
router.delete('/post/:id', articleController.remove);

router.get('/my/posts', articleController.listMy);


router.post('/login', authController.login);
router.post('/checkToken', authController.verify)
router.post('/decode', authController.decode)


router.post('/tag', tagController.create);
router.put('/tag/:id', tagController.update);
router.get('/tags/:userId', tagController.list);

router.get('/aliyun_sts', ossController.getCred);

module.exports = router;
