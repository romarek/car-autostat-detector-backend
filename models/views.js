'use strict';
module.exports = (sequelize, DataTypes) => {
    const Views = sequelize.define("Views", {
      VIN: {
        type: DataTypes.STRING
      },
      ipAddress: {
        type: DataTypes.STRING
      },
      userAgent: {
        type: DataTypes.STRING
      },
      date: {
        type: DataTypes.STRING
      },
      time: {
        type: DataTypes.STRING
      },
    });
  
    return Views;
  };