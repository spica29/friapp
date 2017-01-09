'use strict';

module.exports = function (sequelize, DataTypes) {
  var Story = sequelize.define('Story', {
    image: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    }, 
    date: {
      type: DataTypes.DATE
    }
  }, {
    timestamps: false,
    classMethods:{
      associate:function(models){
        //console.log(models);
        Story.belongsTo(models.Employee);
      }
    },
    freezeTableName: true // Model tableName will be the same as the model name
  });

  return Story;
};


