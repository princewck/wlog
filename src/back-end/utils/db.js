const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/runoob";
const dbname = 'myDB';

// close db after use manually
function connect() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) reject(err);
      else resolve(db);
    });
  });
}

function insertOne(collectionName, document) {
  return new Promise((resolve, reject) => {
    connect().then(db => {
      const dbase = db.db(dbname);
      dbase
        .collection(collectionName)
        .insertOne(document, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      db.close();
    }, err => {
      reject(err);
    });
  });
}

function insertMany(collectionName, documents) {
  return new Promise((resolve, reject) => {
    connect().then(db => {
      const dbase = db.db(dbname);
      dbase.collection(collectionName)
        .insertMany(documents, (err, res) => {
          if (err) reject(err);
          else resolve(res);
          db.close();
        });
    }, err => {
      reject(err);
    });
  });
}

function find(
  collectionName,
  conditions = {},
  sort = {},
  skip = 0,
  limit = 0,
) {
  return new Promise((resolve, reject) => {
    return connect().then(db => {
      const dbase = db.db(dbname);
      dbase.collection(collectionName)
        .find(conditions)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .toArray((err, result) => {
          if (err) reject(err);
          else resolve(result);
          db.close();
        });
    }, err => {
      reject(err);
    })
  });
}

function findOne(articleId) {
  return connect().then(db => {
    const dbase = db.db(dbname);
    return dbase.collection(collectionName)
      .findOne({_id: articleId});
  });
}

function findByPage(collectionName, conditions = {}, page = 1, rows = 20) {
  const skip = rows * (page - 1);
  return find(collectionName, conditions, null, skip, rows)
    .then((list) => {
      return connect().then(db => {
        return new Promise((resolve, reject) => {
          const dbase = db.db(dbname);
          dbase.collection(collectionName)
            .count({}, null, (err, count) => {
              if (err) reject(err);
              else {
                pagination = {
                  currentPage: page,
                  totalPages: Math.ceil(count / rows),
                  totalCount: count,
                };
                resolve(Object.assign({}, pagination, {
                  data: list,
                }));
              }
              db.close();
            });
        });
      });
    });
}

function updateOne(collectionName, conditions, update) {
  return new Promise((resolve, reject) => {
    return connect().then(db => {
      const dbase = db.db(dbname);
      dbase.collection(collectionName)
        .findOneAndUpdate(conditions, update, {
          returnOriginal: false, // 返回更新后的实体
          upsert: true, // 不存在则插入
        }, (err, res) => {
          if (err) reject(err);
          else resolve(res);
          db.close();
        });
    }, err => {
      reject(err);
    });
  });
}

function updateMany(collectionName, conditions, update) {
  return new Promise((resolve, reject) => {
    return connect().then(db => {
      const dbase = db.db(dbname);
      dbase.collection(collectionName)
        .updateOne(conditions, update, (err, res) => {
          if (err) reject(err);
          else resolve(res);
          db.close();
        });
    }, err => {
      reject(err);
    });
  });
}

function deleteOne(collectionName, conditions = {}) {
  if (Object.keys(conditions).length === 0) {
    return Promise.reject('delete documents with empty restrictions is dangerous and not allowed!');
  }
  return new Promise((resolve, reject) => {
    return connect().then(db => {
      const dbase = db.db(dbname);
      dbase.collection(collectionName)
        .deleteOne(conditions, (err, res) => {
          if (err) return reject(err);
          else resolve(res);
          db.close();
        });
    }, err => {
      reject(err);
    });
  });
}

function findOneAndDelete(collectionName, confitions = {}, options = null) {
  return new Promise((resolve, reject) => {
    return connect().then(db => {
      const dbase = db.db(dbname);
      dbase.collection(collectionName)
        .findOneAndDelete(conditions, options, (err, res) => {
          if (err) reject(err);
          else resolve(res);
          db.close();
        });
    }, err => {
      reject(err);
    });
  });
}

function deleteMany(collectionName, conditions = {}) {
  if (Object.keys(conditions).length === 0) {
    return Promise.reject('delete documents with empty restrictions is dangerous and not allowed!');
  }
  return new Promise((resolve, reject) => {
    connect().then(db => {
      const dbase = db.db(dbname);
      dbase.collection(collectionName)
        .deleteMany(conditions, (err, res) => {
          if (err) return reject(err);
          else resolve(res);
          db.close();
        });
    }, err => {
      reject(err);
    });
  });
}



module.exports = {
  insertOne,
  insertMany,
  findOne,
  find,
  findByPage,
  updateOne,
  updateMany,
  deleteOne,
  findOneAndDelete,
  deleteMany,
}