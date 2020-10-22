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
    firstname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'firstname tidak boleh kosong'
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'lastname tidak boleh kosong'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'email tidak boleh kosong'
        }
      }
    },
    phone: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'phone tidak boleh kosong'
        }
      }
    }
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