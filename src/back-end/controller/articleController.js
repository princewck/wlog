const articleService = require('../service/articleService');
const authService = require('../service/authService');

const create = async (ctx, next) => {
  const article = ctx.request.body;
  if (!article) {
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
    const res = await articleService.update(article);
    ctx.body = res;
  }
  next();
}

const list = async (ctx, next) => {
  const page = ctx.params.page;
  try {
    const data = await articleService.findArticles(page);
    ctx.body = data;
  } catch (e) {
    ctx.status = 401;
    ctx.body = {
      message: '操作失败',
      data: e,
    };
  }
}

const listMy = async (ctx, next) => {
  const page = ctx.params.page;
  const params = ctx.request.body;
  const { token = '' } = params;
  console.log('token====>', token);
  const user = await authService.verify(token);  
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
  if (!id) return ctx.status = 404;
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