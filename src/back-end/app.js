const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const koaBody = require('koa-body');

app.use(koaBody());

// 路由
app
  .use(router.routes())
  .use(router.allowedMethods())
  .use((ctx, next) => {
    if (ctx.status === 200 && ctx.body && !('data' in ctx.body)) {
      ctx.body = {
        data: ctx.body,
      };
    }
    next();
  });

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

app.listen(8081);