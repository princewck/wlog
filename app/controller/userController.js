const userService = require('../service/userService');

const findAllUsers = async (ctx, next) => {
  const users = await userService.findAllUsers();
  ctx.body = users;
  next();
};


const create = async (ctx, next) => {
  const user = ctx.request.body;
  const nameError = validateName(user.name);
  const pwdError = validatePwd(user.password);
  if (nameError) {
    ctx.status = 401;
    ctx.body = {
      message: nameError,
    };
    next();
  } else if (pwdError) {
    ctx.status = 401;
    ctx.body = {
      message: pwdError,
    };
    next();
  } else {
    try {
      const res = await userService.create(user);
      ctx.status = 201;
      next();
    } catch (e) {
      console.log(e);
      ctx.body = e;
      next();
    }
  }
}


const get = async (ctx, next) => {
  const userId = ctx.params.id;
  const user = await userService.get(userId);
  ctx.body = user;
  next();
}

function validateName(name) {
  if (!name) {
    return '用户名不能为空！';
  } else if (/。|，|,|\.|-|=|\+|'|"|“/.test(name)) {
    return '用户名包含非法字符！';
  } else if (name.length > 16) {
    return '用户名不能超过8个中文字符！'
  }
}

function validatePwd(pwd) {
  if (!pwd) {
    return '密码不能为空！';
  } else if (!(/[a-z]/.test(pwd) && /[A-Z]/.test(pwd))) {
    return '密码必须同时包含大写和小写字母';
  } else if (pwd.length < 8) {
    return '密码太短，至少8个英文字符！'
  }
}


module.exports = {
  findAllUsers,
  create,
  get,
};