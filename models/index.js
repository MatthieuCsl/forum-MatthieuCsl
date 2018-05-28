const Sequelize = require('sequelize');
const requireModels = require('sequelize-require-models');

const database = new Sequelize('stackoverflow', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const models = requireModels(database, __dirname);

module.exports = Object.assign({ database }, models);
