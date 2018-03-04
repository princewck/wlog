const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const koaBody = require('koa-body');


app
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(async (ctx, next) => {
    if (ctx.status === 200 && ctx.body && !('data' in ctx.body)) {
      ctx.body = {
        data: ctx.body,
      };
    }
    await next();
  });

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

app.listen(8081);