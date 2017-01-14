var acl = require('acl');
var aclSeq = require('acl-sequelize');
var sequelize = require('../models/index.js');

//acl
acl = new acl(new aclSeq(sequelize.connection, { prefix: 'acl_' }));

acl.addUserRoles('admin', 'admin');
acl.addUserRoles('amela', 'user');

acl.allow('admin', 'admin', 'view');
acl.allow(['user', 'admin'], 'profile', ['view', 'edit']);

module.exports = acl;