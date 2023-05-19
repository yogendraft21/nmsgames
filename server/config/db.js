const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('todo', 'root', 'yogendra', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
