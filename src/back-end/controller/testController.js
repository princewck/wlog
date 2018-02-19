const test = async (ctx, next) => {
  ctx.body = {data: ctx.request.body, params: ctx.params};
  next();
};

module.exports = {
  test,
}