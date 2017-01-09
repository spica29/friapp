'use strict';

module.exports = function (sequelize, DataTypes) {
  var Dog = sequelize.define('Dog', {
    adopted: {
      type: DataTypes.BOOLEAN
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    color: {
      type: DataTypes.STRING
    },
    breed: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.INTEGER
    },
    size: {
      type: DataTypes.INTEGER
    },
    story: {
      type: DataTypes.TEXT
    },
    gender: {
      type: DataTypes.STRING
    },
    foster: {
      type: DataTypes.BOOLEAN
    },
    image: {
      type: DataTypes.STRING
    }

  }, {
    timestamps: false,
    freezeTableName: true, // Model tableName will be the same as the model name
    classMethods:{
      associate:function(models){
        //console.log(models);
        Dog.belongsTo(models.User);
      }
    }
  });
  return Dog;
};


