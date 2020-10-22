'use strict';
const {
  Model
} = require('sequelize');
const { options } = require('../router/teacher');
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
    fullname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'fullname tidak boleh kosong'
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
    modelName: 'Teacher',
  });
  Teacher.beforeCreate((instance, options) => {
    if(instance.phone){
      instance.phone = `+62${instance.phone}`
    }
  })
  return Teacher;
};