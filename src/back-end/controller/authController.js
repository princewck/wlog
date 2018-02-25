const authService  = require('../service/authService');
const userService = require('../service/userService');

const login = async (ctx, next) => {
  const params = ctx.request.body;
  const { name:name, password } = params;
  const user = await authService.login(name, password);
  console.log(name, password);
  if (user) {
    await authService.refreshToken(user);
    const usrInserted = await userService.get(user._id);
    ctx.body = usrInserted;
  } else {
    ctx.status = 401;
  }
}

const verify = async (ctx, next) => {
  const params = ctx.request.body;
  const { token } = params;
  try {
    const rt = await authService.verify(token);
    ctx.body = rt;
  } catch (e) {
    ctx.status = 401;
    ctx.message = e;
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