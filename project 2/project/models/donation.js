'use strict';

module.exports = function (sequelize, DataTypes) {
  var Donation = sequelize.define('Donation', {
    amount: {
      type: DataTypes.FLOAT
    }
  }, {
    timestamps: false,
    classMethods:{
      associate:function(models){
      	//console.log(models);
        Donation.belongsTo(models.User);
      }
    },
    freezeTableName: true // Model tableName will be the same as the model name
  });

  return Donation;
};


