const fs = require('fs');
const prettier = require('prettier');

fs.readFile('../../bin/salesdatatoimport.json', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var result = data
        .replace(/(Yard number)/g, 'YardNumber')
        .replace(/(Yard name)/g, 'YardName')
        .replace(/(Sale Date M\/D\/CY)/g, 'SaleDateMDCY')
        .replace(/(Day of Week)/g, 'DayOfWeek')
        .replace(/(Sale time \(HHMM\))/g, 'SaleTimeHHMM')
        .replace(/(Time Zone)/g, 'TimeZone')
        .replace(/(Lot number)/g, 'LotNumber')
        .replace(/(Vehicle Type)/g, 'VehicleType')
        .replace(/(Model Group)/g, 'ModelGroup')
        .replace(/(Model Detail)/g, 'ModelDetail')
        .replace(/(Body Style)/g, 'BodyStyle')
        .replace(/(Damage Description)/g, 'DamageDescription')
        .replace(/(Secondary Damage)/g, 'SecondaryDamage')
        .replace(/(Sale Title State)/g, 'SaleTitleState')
        .replace(/(Sale Title Type)/g, 'SaleTitleType')
        .replace(/(Has Keys-Yes or No)/g, 'HasKeysYesOrNo')
        .replace(/(Lot Cond. Code)/g, 'LotCondCode')
        .replace(/(Est. Retail Value)/g, 'EstRetailValue')
        .replace(/(Repair cost)/g, 'RepairCost')
        .replace(/(Runs\/Drives)/g, 'RunsDrives')
        .replace(/(Sale Status)/g, 'SaleStatus')
        .replace(/(Location city)/g, 'LocationCity')
        .replace(/(Location state)/g, 'LocationState')
        .replace(/(Location ZIP)/g, 'LocationZIP')
        .replace(/(Location country)/g, 'LocationCountry')
        .replace(/(Currency Code)/g, 'CurrencyCode')
        .replace(/(Image Thumbnail)/g, 'ImageThumbnail')
        .replace(/(Create Date\/Time)/g, 'CreateDateTime')
        .replace(/(Grid\/Row)/g, 'GridRow')
        .replace(/(Make-an-Offer Eligible)/g, 'MakeAnOfferEligible')
        .replace(/(Buy-It-Now Price)/g, 'BuyItNowPrice');
    fs.writeFile('../../bin/salesdatatoimportfields.json', result, 'utf8', function (err) {
       if (err) return console.log(err);
    });
  });
