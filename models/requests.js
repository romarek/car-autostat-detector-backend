module.exports = (sequelize, Sequelize) => {
    const Requests = sequelize.define("requests", {
      VIN: {
        type: Sequelize.STRING
      },
      isDatabaseIn: {
        type: Sequelize.BOOLEAN
      },
      ipAddress: {
        type: Sequelize.STRING
      },
      userAgent: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.STRING
      },
    });
  
    return Requests;
  };