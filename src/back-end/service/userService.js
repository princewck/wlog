const db = require('../utils/db');

function findAllUsers() {
  return db.findByPage('user');
}

module.exports = {
  findAllUsers
};