'use strict';
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    encryptedPassword: Sequelize.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};