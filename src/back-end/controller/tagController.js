const tagService = require('../service/tagService');
const authService = require('../service/authService');

const create = async (ctx, next) => {
  const { name } = ctx.request.body;
  const headers = ctx.request.headers;
  const { authorization:token } = headers;
  if (!name) {
    ctx.status = 422;
    ctx.body = {message: '标签名不能为空！'};
  } else {
    try {
      const exists = await tagService.find(name, ctx.$user._id);
      const exist = exists[0];
      if (exist) {
        ctx.status = 422;
        ctx.body = {message: '标签已存在！'}
      } else {
        console.log(1111);
        const tag = await tagService.create(name, ctx.$user._id);
        ctx.body = tag;
      }
    } catch (e) {
      console.log(e);
      ctx.body = JSON.stringify(e);
    }
  }
}

const list = async (ctx, next) => {
  const {userId} = ctx.params;
  try {
    const tags = await tagService.list(userId);
    ctx.body = tags;
  } catch (e) {
    console.log(e);
    ctx.status = 403;
    ctx.body = {message: e};
  }
}

const update = async (ctx, next) => {
  const {id} = ctx.params;
  const {name} = ctx.request.body;
  try {
    const update = await tagService.update(id, {name});
    ctx.body = update;
  } catch (e) {
    ctx.status = 403;
    ctx.body = e;
  }
}

module.exports = {
  create,
  list,
  update,
}