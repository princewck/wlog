const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = "mongodb://localhost:27017/runoob";
let dbname = 'wlog';

try {
  const config = require('/opt/wlog');
  if (config.dbname) {
    dbname = config.dbname;
  }
} catch (e) {

}

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
  options = null,
) {
  return new Promise((resolve, reject) => {
    return connect().then(db => {
      const dbase = db.db(dbname);
      dbase.collection(collectionName)
        .find(conditions, options)
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

function findOne(collectionName, id, options = {}) {
  return connect().then(db => {
    const dbase = db.db(dbname);
    return dbase.collection(collectionName)
      .findOne({_id: new ObjectId(id)}, options);
  });
}

function findById(collectionName, id) {
  return connect().then(db => {
    const dbase = db.db(dbname);
    return dbase.collection(collectionName)
      .find({_id: new ObjectId(id)}, options);
  });
}

function findByPage(collectionName, conditions = {}, page = 1, rows = 20, options, sort={}) {
  const skip = rows * (page - 1);
  return find(collectionName, conditions, sort, skip, rows, options)
    .then((list) => {
      return connect().then(db => {
        return new Promise((resolve, reject) => {
          const dbase = db.db(dbname);
          dbase.collection(collectionName)
            .count(conditions, null, (err, count) => {
              if (err) reject(err);
              else {
                pagination = {
                  currentPage: page,
                  totalPages: Math.ceil(count / rows),
                  totalCount: count,
                };
                resolve(Object.assign({}, pagination, {
                  data: list && list.reverse(),
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
      if (!conditions._id) {
        conditions._id = new ObjectId();
      } else if (conditions._id && typeof(conditions._id) === 'string') {
        conditions._id = new ObjectId(conditions._id);
      }
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
  findById,
  findByPage,
  updateOne,
  updateMany,
  deleteOne,
  findOneAndDelete,
  deleteMany,
}