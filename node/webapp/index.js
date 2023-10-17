const express = require('express');

const { config } = require('./config');

const { Repository } = require("./repository");

const app = express();

app.set('view engine', 'ejs');

const initializeDatabase = async () => {
  try {
    await Repository.createTable();
    await Repository.insertData();
  } catch (error) {
    console.error(error);
  }
};

app.get('/', async (_, response) => {
  try {
    const sql = `SELECT * FROM people`;
    const data = await Repository.query(sql);
    response.render('index', { data });
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' });
    console.error(error);
  }
});

initializeDatabase().then(() => {
  app.listen(config.server.port, () => {
    console.log(`App listening on port ${config.server.port}.`);
  });
});
