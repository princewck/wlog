const test = async (ctx, next) => {
  ctx.body = [{count: 1}, {count: 3}];
  next();
};

module.exports = {
  test,
}