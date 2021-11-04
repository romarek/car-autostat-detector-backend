module.exports = (sequelize, Sequelize) => {
    const Views = sequelize.define("views", {
      VIN: {
        type: Sequelize.STRING
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
  
    return Views;
  };