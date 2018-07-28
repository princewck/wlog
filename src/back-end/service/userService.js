const ObjectId = require('mongodb').ObjectId;

const db = require('../utils/db');
const crypto = require('crypto');

const USER = 'user';

function findAllUsers(page=1) {
  return db.findByPage(USER, {}, page, undefined, {
    projection: {password: 0, salt: 0}
  });
}

function create(user) {
  const pwd = user.password;
  const salt = new Date().valueOf().toString(16);
  user.password = crypto
    .createHash('md5')
    .update(pwd + salt)
    .digest('hex');
  user.salt = salt;
  return db.insertOne(USER, user);
}

function get(id) {
  return db.findOne(USER, id, {projection: {password: 0, salt: 0}});
}

// caution!!, no projection , password will returned
function findByName(name) {
  return db.find(USER, {name});
}

function update(id, update) {
  return db.updateOne(USER, {_id: new ObjectId(id)}, {$set: update});
}

module.exports = {
  findAllUsers,
  findByName,
  create,
  get,
  update,
};