const authService = require('../service/authService');
const moment = require('moment');

module.exports = async (ctx, next) => {
  const headers = ctx.headers;
  const { authorization: token = '' } = headers;
  const user = await authService.verify(token);
  if (user && user.token === token) {
    if (moment(user.token_expires).isAfter(moment.now())) {
      ctx.$user = user;
      await next();
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