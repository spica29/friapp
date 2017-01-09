"use strict";

var Sequelize = require('sequelize');

//connection sequelize
var connection = new Sequelize('wpdb', 'root', '', { omitNull: true });

var User = connection.import('./user.js');
var Dog = connection.import('./dog.js');
var Donation = connection.import('./donation.js');
var Employee = connection.import('./employee.js');
var Story = connection.import('./story.js');

var db = {};
db.User = User;
db.Dog = Dog;
db.Donation = Donation;
db.Employee = Employee;
db.Story = Story;

//relations
Object.keys(db).forEach(function(modelName) {
	if ("associate" in db[modelName]) {
	    db[modelName].associate(db);
  }
});

module.exports = db;

//connection.sync();