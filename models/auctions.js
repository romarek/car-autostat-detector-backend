module.exports = (sequelize, Sequelize) => {
    const Auctions = sequelize.define("auctions", {
      auctionId: {
        type: Sequelize.STRING
      },
      saleName: {
        type: Sequelize.STRING
      },
      salePlatform: {
        type: Sequelize.STRING
      },
      auctionDateTimeInUTC: {
        type: Sequelize.STRING
      },
      facility: {
        type: Sequelize.STRING
      },
      totalItems: {
        type: Sequelize.STRING
      }
    });
  
    return Auctions;
  };