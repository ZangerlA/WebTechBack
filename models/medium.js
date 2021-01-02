const { v4: uuidv4 } = require('uuid');


'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medium extends Model {

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Medium.hasMany()
      Rewievs.belongsTo(Medium)

    }
  };
  Medium.init({
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },

    type: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },

    description: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },

    imageUrl:{
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    }
  },{
    sequelize,
    modelName: 'Medium',
  });



  Medium.beforeCreate((medium, _ ) => {
    return medium.id = uuidv4();
  })
  return Medium;
};
