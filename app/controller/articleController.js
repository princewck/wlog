const articleService = require('../service/articleService');
const authService = require('../service/authService');

const create = async (ctx, next) => {
  const article = ctx.request.body;
  const user = ctx.$user;
  if (!article || !user) {
    ctx.status = 422;
  } else if (!article.title) {
    ctx.status = 422;
    ctx.body = {
      message: '标题不能为空！'
    };
  } else if (!article.content) {
    ctx.status = 422;
    ctx.body = {
      message: '内容不能为空！'
    };
  } else {
    let res;
    if (article._id) {
      const old = await articleService.get(article._id);
      if (!old || !old.author || old.author.toHexString() !== user._id.toHexString()) {
        ctx.status = 403;
        ctx.body = {message: '您没有修改这篇文章的权限！'}; 
      } else {
        res = await articleService.update(article, ctx.$user);
        ctx.body = res&&res.value._id;
      }
    } else {
      article.author = user._id;
      res = await articleService.create(article);
      ctx.body = (res&&res.insertedId || '').toString();
    }
  }
  next();
}

const list = async (ctx, next) => {
  let page = ctx.query.page;
  if (isNaN(page)) page = 1;
  try {
    const data = await articleService.findArticles(page);
    ctx.body = data;
  } catch (e) {
    console.log(e);
    ctx.status = 400;
    ctx.body = {
      message: '操作失败',
      data: e,
    };
  }
}

const listMy = async (ctx, next) => {
  const page = ctx.params.page;
  const user = ctx.$user;
  if (!user || !user._id) {
    ctx.body = {
      message: '请登录后操作',
    };
    ctx.status = 401;
  } else {
    try {
      const data = await articleService.findArticlesByUserId(user && user._id, page);
      ctx.body = data;
    } catch (e) {
      ctx.status = 403;
      ctx.body = {
        message: '操作失败',
        data: e,
      };    
    }
  }
}

const get = async (ctx, next) => {
  const id = ctx.params.id;
  if (!id || id == 'null') return ctx.status = 404;
  try {
    const article = await articleService.get(id);
    ctx.body = article;
    next();
  } catch (e) {
    ctx.body = {
      message: '获取文章信息失败！',
      data: e,
    };
    throw new Error(e);
  }
}

module.exports = {
  create,
  list,
  listMy,
  get,
};