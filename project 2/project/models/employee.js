'use strict';

module.exports = function (sequelize, DataTypes) {
  var Employee = sequelize.define('Employee', {
    job: {
      type: DataTypes.STRING
    },
    salary: {
      type: DataTypes.FLOAT
    },
    userType: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    freezeTableName: true, // Model tableName will be the same as the model name
    classMethods:{
      associate:function(models){
        //console.log(models);
        Employee.hasMany(models.Story);
        Employee.hasMany(models.User);
      }
    }
  });
  return Employee;
};


