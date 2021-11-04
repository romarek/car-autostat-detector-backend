module.exports = (sequelize, Sequelize) => {
    const SalesData = sequelize.define("salesdata", {
      Title: {
        type: Sequelize.STRING
      },
      FinalBid: {
        type: Sequelize.STRING
      },
      YardNumber: {
        type: Sequelize.STRING
      },
      YardName: {
        type: Sequelize.STRING
      },
      SaleDateMDCY: {
        type: Sequelize.STRING
      },
      DayOfWeek: {
        type: Sequelize.STRING
      },
      SaleTimeHHMM: {
        type: Sequelize.STRING
      },
      TimeZone: {
        type: Sequelize.STRING
      },
      Item: {
        type: Sequelize.STRING
      },
      LotNumber: {
        type: Sequelize.STRING
      },
      VehicleType: {
        type: Sequelize.STRING
      },
      Year: {
        type: Sequelize.STRING
      },
      Make: {
        type: Sequelize.STRING
      },
      ModelGroup: {
        type: Sequelize.STRING
      },
      ModelDetail: {
        type: Sequelize.STRING
      },
      BodyStyle: {
        type: Sequelize.STRING
      },
      Color: {
        type: Sequelize.STRING
      },
      DamageDescription: {
        type: Sequelize.STRING
      },
      SecondaryDamage: {
        type: Sequelize.STRING
      },
      SaleTitleState: {
        type: Sequelize.STRING
      },
      SaleTitleType: {
        type: Sequelize.STRING
      },
      HasKeysYesOrNo: {
        type: Sequelize.STRING
      },
      VIN: {
        type: Sequelize.STRING
      },
      Odometer: {
        type: Sequelize.STRING
      },
      RepairCost: {
        type: Sequelize.STRING
      },
      Engine: {
        type: Sequelize.STRING
      },
      Drive: {
        type: Sequelize.STRING
      },
      Transmission: {
        type: Sequelize.STRING
      },
      FuelType: {
        type: Sequelize.STRING
      },
      Cylinders: {
        type: Sequelize.STRING
      },
      RunsDrives: {
        type: Sequelize.STRING
      },
      SaleStatus: {
        type: Sequelize.STRING
      },
      HighBidNonVixSealedVix: {
        type: Sequelize.STRING
      },
      SpecialNote: {
        type: Sequelize.STRING
      },
      LocationCity: {
        type: Sequelize.STRING
      },
      LocationState: {
        type: Sequelize.STRING
      },
      LocationZIP: {
        type: Sequelize.STRING
      },
      LocationCountry: {
        type: Sequelize.STRING
      },
      CurrencyCode: {
        type: Sequelize.STRING
      },
      ImageThumbnail: {
        type: Sequelize.STRING
      },
      CreateDateTime: {
        type: Sequelize.STRING
      },
      GridRow: {
        type: Sequelize.STRING
      },
      MakeAnOfferEligible: {
        type: Sequelize.STRING
      },
      BuyItNowPrice: {
        type: Sequelize.STRING
      },
      ImageURL: {
        type: Sequelize.STRING
      },
      ImageURL01: {
        type: Sequelize.STRING
      },
      ImageURL02: {
        type: Sequelize.STRING
      },
      ImageURL03: {
        type: Sequelize.STRING
      },
      ImageURL04: {
        type: Sequelize.STRING
      },
      ImageURL05: {
        type: Sequelize.STRING
      },
      ImageURL06: {
        type: Sequelize.STRING
      },
      ImageURL07: {
        type: Sequelize.STRING
      },
      ImageURL08: {
        type: Sequelize.STRING
      },
      ImageURL09: {
        type: Sequelize.STRING
      },
      ImageURL10: {
        type: Sequelize.STRING
      },
      Trim: {
        type: Sequelize.STRING
      },
      LastUpdatedTime: {
        type: Sequelize.STRING
      }
    });
  
    return SalesData;
  };