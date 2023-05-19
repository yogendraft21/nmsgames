const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class User extends Model {
  static associate(models) {
    User.hasMany(models.Todo, { foreignKey: 'userId' });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

User.sync()
  .then(() => {
    console.log('User model synced with the database.');
  })
  .catch((error) => {
    console.error('Error syncing User model:', error);
  });
module.exports = User;