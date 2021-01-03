const { v4: uuidv4 } = require('uuid');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {


      //this.drop()
      //this.sync().catch(error => console.log(error));
    }
  };
  Review.init({
    reviewText: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    reviewPoints: {
      type: DataTypes.DOUBLE,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  Review.beforeCreate((review, _ ) => {
    return review.id = uuidv4();
  })

  return Review;
};