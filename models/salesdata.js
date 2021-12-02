'use strict';
module.exports = (sequelize, DataTypes) => {
    const SalesData = sequelize.define('SalesData', {
      Title: {
        type: DataTypes.STRING
      },
      FinalBid: {
        type: DataTypes.STRING
      },
      YardNumber: {
        type: DataTypes.STRING
      },
      YardName: {
        type: DataTypes.STRING
      },
      SaleDateMDCY: {
        type: DataTypes.STRING
      },
      DayOfWeek: {
        type: DataTypes.STRING
      },
      SaleTimeHHMM: {
        type: DataTypes.STRING
      },
      TimeZone: {
        type: DataTypes.STRING
      },
      Item: {
        type: DataTypes.STRING
      },
      LotNumber: {
        type: DataTypes.STRING
      },
      VehicleType: {
        type: DataTypes.STRING
      },
      Year: {
        type: DataTypes.STRING
      },
      Make: {
        type: DataTypes.STRING
      },
      ModelGroup: {
        type: DataTypes.STRING
      },
      ModelDetail: {
        type: DataTypes.STRING
      },
      BodyStyle: {
        type: DataTypes.STRING
      },
      Color: {
        type: DataTypes.STRING
      },
      DamageDescription: {
        type: DataTypes.STRING
      },
      SecondaryDamage: {
        type: DataTypes.STRING
      },
      SaleTitleState: {
        type: DataTypes.STRING
      },
      SaleTitleType: {
        type: DataTypes.STRING
      },
      HasKeysYesOrNo: {
        type: DataTypes.STRING
      },
      VIN: {
        type: DataTypes.STRING
      },
      Odometer: {
        type: DataTypes.STRING
      },
      RepairCost: {
        type: DataTypes.STRING
      },
      Engine: {
        type: DataTypes.STRING
      },
      Drive: {
        type: DataTypes.STRING
      },
      Transmission: {
        type: DataTypes.STRING
      },
      FuelType: {
        type: DataTypes.STRING
      },
      Cylinders: {
        type: DataTypes.STRING
      },
      RunsDrives: {
        type: DataTypes.STRING
      },
      SaleStatus: {
        type: DataTypes.STRING
      },
      HighBidNonVixSealedVix: {
        type: DataTypes.STRING
      },
      SpecialNote: {
        type: DataTypes.STRING
      },
      LocationCity: {
        type: DataTypes.STRING
      },
      LocationState: {
        type: DataTypes.STRING
      },
      LocationZIP: {
        type: DataTypes.STRING
      },
      LocationCountry: {
        type: DataTypes.STRING
      },
      CurrencyCode: {
        type: DataTypes.STRING
      },
      ImageThumbnail: {
        type: DataTypes.STRING
      },
      CreateDateTime: {
        type: DataTypes.STRING
      },
      GridRow: {
        type: DataTypes.STRING
      },
      MakeAnOfferEligible: {
        type: DataTypes.STRING
      },
      BuyItNowPrice: {
        type: DataTypes.STRING
      },
      ImageURL: {
        type: DataTypes.STRING
      },
      ImageURL01: {
        type: DataTypes.STRING
      },
      ImageURL02: {
        type: DataTypes.STRING
      },
      ImageURL03: {
        type: DataTypes.STRING
      },
      ImageURL04: {
        type: DataTypes.STRING
      },
      ImageURL05: {
        type: DataTypes.STRING
      },
      ImageURL06: {
        type: DataTypes.STRING
      },
      ImageURL07: {
        type: DataTypes.STRING
      },
      ImageURL08: {
        type: DataTypes.STRING
      },
      ImageURL09: {
        type: DataTypes.STRING
      },
      ImageURL10: {
        type: DataTypes.STRING
      },
      Trim: {
        type: DataTypes.STRING
      },
      LastUpdatedTime: {
        type: DataTypes.STRING
      }
    });
  
    return SalesData;
  };