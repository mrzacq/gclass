'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.Teacher, { foreignKey: 'TeacherId'})
      Task.belongsToMany(models.Student, { through: models.StudentTask, foreignKey: 'TaskId'})
    }
  };
  Task.init({
    taskname: DataTypes.STRING,
    deadline: DataTypes.DATE,
    TeacherId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};