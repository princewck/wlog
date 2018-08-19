const _ = require('lodash');
const db = require('../utils/db');
const ObjectId = require('mongodb').ObjectId;

const COLLECTION = 'article';

const articleFilter = (article) => _.pick(article, [
  'title',
  'summary',
  'content',
  'author',
  'format',
  'created_at',
  'updated_at',
  'comments',
]);

const create = (article= {}) => {
  article.created_at = +new Date();
  return db.insertOne(COLLECTION, articleFilter(article));
}

const remove = (id) => {
  return db.updateOne(COLLECTION, {_id: id}, {$set: {status: 2}});
}

const update = (article) => {
  article.updated_at = +new Date();
  return db.updateOne(COLLECTION, {_id: article._id}, {$set: articleFilter(article)});
}

const findArticles = (page = 1) => {
  return db.findByPage(COLLECTION, {$or: [{status: {$lt: 2}}, {status: {$gt: 2}}, {status: null} ]}, page, 25, {}, {});
}

const findArticlesByUserId = (id, page = 1) => {
  return db.findByPage(COLLECTION, {author: id, $or: [{status: {$lt: 2}}, {status: {$gt: 2}}, {status: null} ] }, page);
}

const get = id => db.findOne(COLLECTION, id);

module.exports = {
  create,
  remove,
  update,
  findArticles,
  findArticlesByUserId,
  get,
};