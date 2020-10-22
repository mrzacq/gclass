'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    fullname(){
      return `${this.firstname} ${this.lastname}`
    }
    static associate(models) {
      // define association here
      Student.belongsToMany(models.Task, { through: models.StudentTask, foreignKey: 'StudentId'})
    }
  };
  Student.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Student',
  });
  Student.beforeCreate((instance, options) => {
    if(instance.phone){
      instance.phone = `+62${instance.phone}`
    }
  })
  return Student;
};