const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const koaBody = require('koa-body');
let port = '8081';

if (process.env.WLOG_PORT) {
  port = process.env.WLOG_PORT;
}

try {
  const config = require('/opt/wlog');
  if (config.dbname) {
    dbname = config.dbname;
  }
} catch (e) {

}


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

app.listen(port);