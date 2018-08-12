const authService = require('../service/authService');
const userService = require('../service/userService');
const moment = require('moment');

const login = async (ctx, next) => {
  const params = ctx.request.body;
  const { name: name, password } = params;
  const user = await authService.login(name, password);
  if (user) {
    await authService.refreshToken(user);
    const usrInserted = await userService.get(user._id);
    ctx.body = usrInserted;
  } else {
    ctx.status = 401;
    ctx.body = {
      message: '用户名或密码错误！'
    }
  }
}

const verify = async (ctx, next) => {
  const params = ctx.request.body;
  const { token } = params;
  const user = await authService.verify(token);
  if (user && user.token === token) {
    if (moment(user.token_expires).isAfter(moment.now())) {
      ctx.status = 200;
      ctx.body = user;
    } else {
      ctx.status = 401;
      ctx.body = {
        message: 'token expires',
      };
    }
  } else {
    ctx.status = 401;
    ctx.body = {
      message: 'bad token!'
    };
  }
}

const decode = async (ctx, next) => {
  const params = ctx.request.body;
  const { token } = params;
  try {
    const rt = await authService.decode(token);
    ctx.body = rt;
  } catch (e) {
    ctx.status = 401;
    ctx.message = e;
  }
}

module.exports = {
  login,
  verify,
  decode,
};