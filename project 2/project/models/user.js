'use strict';

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
        len: [1,255]
      }
    }, 
    password_digest: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    indexes: [{unique: true, fields: ['email', 'username']}],
    freezeTableName: true, // Model tableName will be the same as the model name
    classMethods:{
      associate:function(models){
        //console.log(models);
        User.hasMany(models.Donation);
        User.hasMany(models.Dog);
        User.belongsTo(models.Employee);
      }
    },
  });
  
  return User;
};


