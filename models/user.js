const { v4: uuidv4 } = require('uuid');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
     /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Review, {
        foreignKey: {
          type: DataTypes.UUID
        }
      });
       models.Review.belongsTo(this)

      //this.drop()
      //this.sync().catch(error => console.log(error));
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    contact_email: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    pwHash: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    refreshToken: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, _ ) => {
    return user.id = uuidv4();
  })

  return User;
};