module.exports = (sequelize, DataTypes) => {
    const Auctions = sequelize.define("Auctions", {
      auctionId: {
        type: DataTypes.STRING
      },
      saleName: {
        type: DataTypes.STRING
      },
      salePlatform: {
        type: DataTypes.STRING
      },
      auctionDateTimeInUTC: {
        type: DataTypes.STRING
      },
      facility: {
        type: DataTypes.STRING
      },
      totalItems: {
        type: DataTypes.STRING
      }
    });
  
    return Auctions;
  };