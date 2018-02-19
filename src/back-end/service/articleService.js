const _ = require('lodash');
const db = require('../utils/db');

const COLLECTION = 'article';

const articleFilter = (article) => _.pick(article, [
  'title',
  'summary',
  'content',
  'author',
  'created_at',
  'updated_at',
  'comments',
]);

const create = (article= {}) => {
  return db.insertOne(COLLECTION, articleFilter(article));
}

const remove = (id) => {
  return db.findOneAndDelete(COLLECTION, {_id: id});
}

const update = (article) => {
  return db.updateOne(COLLECTION, {_id: article._id}, {$set: articleFilter(article)});
}

const findArticles = (page = 1) => {
  return db.findByPage(COLLECTION, {}, page, 25);
}

const get = id => db.findOne(COLLECTION, id);

module.exports = {
  create,
  remove,
  update,
  findArticles,
  get,
};