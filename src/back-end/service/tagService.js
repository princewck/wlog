const db = require('../utils/db');
const ObjectId = require('mongodb').ObjectId;

const TAG = 'tag';

function create(name, userId) {
  return db.updateOne(TAG, {}, {name, userId});
}

function find(name, userId) {
  return db.find(TAG, {userId, name});
}

function update(id, update) {
  return db.updateOne(TAG, {_id: id}, {$set: update});
}

function list(userId) {
  console.log(userId);
  return db.find(TAG, {userId: new ObjectId(userId)},undefined, undefined, undefined, {projection: {name: 1, _id: 1}});
}

module.exports = {
  create,
  find,
  update,
  list,
}
