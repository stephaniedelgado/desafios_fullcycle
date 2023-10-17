const mysql = require('mysql');
const { config } = require('./config');

const pool = mysql.createPool(config.database);

const query = async (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (error, results) => {
      if (error) {
        return reject(error);
      }

      resolve(results);
    });
  });
};

const createTable = async () => {
  const sql =
    `CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL);`;

  await query(sql);
};

const insertData = async () => {
  const sql = `INSERT INTO people (name) VALUES ('John Doe'), ('Jane Doe');`;

  await query(sql);
};

const Repository = {
  query,
  createTable,
  insertData
};

module.exports = { Repository };
