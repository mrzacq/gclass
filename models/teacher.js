'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Teacher.hasMany(models.Task, { foreignKey: 'TeacherId'})
    }
  };
  Teacher.init({
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Teacher',
  });
  return Teacher;
};