const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User.model');

class Todo extends Model {
  static associate(models) {
    Todo.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  }
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Todo',
  }
);

Todo.sync()
  .then(() => {
    console.log('Todos model synced with the database.');
  })
  .catch((error) => {
    console.error('Error syncing Todos model:', error);
  });

module.exports = Todo;
