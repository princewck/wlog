const jwt = require('jsonwebtoken');

const privateKey = 'liying2018';
const defaults = {
  expiresIn: 3600 * 24,
};

function sign(payload, options = defaults) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
}

function verify(token, options = defaults) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, privateKey, options, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

function decode(token, options = defaults) {
  return new Promise((resolve, reject) => {
    jwt.decode(token, privateKey, options, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

module.exports = {
  sign,
  verify,
  decode,
}