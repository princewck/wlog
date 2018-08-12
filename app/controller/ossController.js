const { getSTSToken } = require('../service/ossService');

const getCred = async (ctx, next) => {
  try {
    const token = await getSTSToken();
    ctx.body = token;
  } catch (e) {
    ctx.status = 422;
    ctx.message = JSON.stringify(e);
  }
}

module.exports = {
  getCred,
}