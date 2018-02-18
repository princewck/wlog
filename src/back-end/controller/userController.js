const userService = require('../service/userService');

const findAllUsers = async (ctx, next) => {
  const users = await userService.findAllUsers();
  ctx.body = users;
  next();
};

module.exports = {
  findAllUsers,
};