const _ = require('lodash');
const crypto = require('crypto');
const db = require('../utils/db');
const userService = require('./userService');
const jwt = require('../utils/jwt');
const moment = require('moment');

const USER = 'user';
const TOKEN_IAT = 3600 * 1000 * 1;

async function login(name, password) {
  if (!name || !password) return
  const users = await userService.findByName(name);
  let user = null;
  users.forEach(usr => {
    const salt = usr.salt;
    const pwd = crypto
      .createHash('md5')
      .update(password + salt)
      .digest('hex');
    if (pwd === usr.password) {
      user = usr;
    }
  });
  return user;
}

async function refreshToken(user) {
  const signature = await jwt.sign({
    name: user.name,
    id: user._id,
    created_at: new Date().valueOf(),
  });
  const token = new Buffer(signature).toString('base64');
  const expiresAt = new Date().valueOf() + TOKEN_IAT;
  return await userService.update(user._id, Object.assign({}, user, { token, token_expires: expiresAt }));
}

async function verify(token) {
  const signature = new Buffer(token, 'base64').toString();
  try {
    const info = await jwt.verify(signature);
    return await userService.get(info.id);
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function decode(token) {
  return await jwt.decode(token);
}

module.exports = {
  login,
  refreshToken,
  verify,
  decode,
}