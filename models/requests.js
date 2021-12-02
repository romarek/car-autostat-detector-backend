module.exports = (sequelize, DataTypes) => {
    const Requests = sequelize.define("Requests", {
      VIN: {
        type: DataTypes.STRING
      },
      isDatabaseIn: {
        type: DataTypes.BOOLEAN
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
  
    return Requests;
  };