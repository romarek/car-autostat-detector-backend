const db = require("../models");
const SalesData = db.SalesData;
const Op = db.Sequelize.Op;
const axios = require('axios');

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPaginationList = (page, size) => {
    const limit = size;
    const offset = page;
  
    return { limit, offset };
  };

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: salesdata } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, salesdata, totalPages, currentPage };
};

const listAllAttributes = [
    ['type', 'VehicleType'],
    ['make', 'Make'],
    ['model', 'ModelGroup'],
    ['yearBegin', 'Year'],
    ['yearEnd', 'Year'],
    ['auction', 'ModelGroup'],
    ['dateBegin', 'CreateDateTime'],
    ['dateEnd', 'CreateDateTime'],
    ['region', 'LocationCountry'],
    ['state', 'LocationState']
];

// Retrieve all Salesdata from the database.
exports.findAll = (req, res) => {
  const { page, size, vin } = req.query;
  var condition = vin ? { VIN: { [Op.like]: `%${vin}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  SalesData.findAndCountAll(
    {
        attributes: { exclude: ['ImageURL', 'ImageThumbnail'] },
        where: condition,
        limit,
        offset
    })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving salesdata."
      });
    });
};

// Find a single SalesData with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  SalesData.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving SalesData with id=" + id
      });
    });
};

// Find a single SalesData with an VIN
exports.findOneByVin = (req, res) => {
    const vin = req.params.vin;
  
    SalesData.findOne(
        {
            attributes: { exclude: ['ImageURL', 'ImageThumbnail'] },
            where: { VIN: { [Op.like]: `%${vin}%` }
        }
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving SalesData with VIN=" + vin
        });
    });
};

// Find a single SalesData by Params
exports.findOneByParams = (req, res) => {

    const { page, size, type, make, model, yearBegin, yearEnd, vin, auction, dateBegin, dateEnd, region, state, yardNameQuery } = req.query;
    var condVin = vin ? { VIN: { [Op.like]: `%${vin}%` } } : null;
    var condType = type ? { VehicleType: { [Op.like]: `%${type}%` } } : null;
    var condMake = make ? { Make: { [Op.like]: `%${make}%` } } : null;
    var condModel = model ? { ModelGroup: { [Op.like]: `%${model}%` } } : null;
    var condYear = {
        begin: yearBegin ? { Year: { [Op.gte]: `%${yearBegin}%` } } : null,
        end: yearEnd ? { Year: { [Op.lte]: `%${yearEnd}%` } } : null
    };
    var condAuction = auction ? { ModelGroup: { [Op.like]: `%${auction}%` } } : null; // Add column and data in table
    var condDate = {
        begin: dateBegin ? { CreateDateTime: { [Op.gte]: `%${dateBegin}%` } } : null,
        end: dateEnd ? { CreateDateTime: { [Op.lte]: `%${dateEnd}%` } } : null
    };
    var condRegion = region ? { LocationCountry: { [Op.like]: `%${region}%` } } : null;
    var condState = state ? { LocationState: { [Op.like]: `%${state}%` } } : null;

    var yardNameQuery = yard ? { YardName: { [Op.like]: `%${yard}%` } } : null;
    
    const { limit, offset } = getPagination(page, size);
  
    SalesData.findAndCountAll(
        {
            attributes: { exclude: ['ImageURL', 'ImageThumbnail'] },
            where: {
                [Op.and]: [
                    condVin,
                    condType,
                    condMake,
                    condModel,
                    condYear.begin,
                    condYear.end,
                    condAuction,
                    condDate.begin,
                    condDate.end,
                    condRegion,
                    condState,
                    yardNameQuery,
                ],
            },
            limit,
            offset,
            order: [
                ['id', 'DESC']
            ]
        })
    .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving salesdata."
        });
    });
};

// Find Params SalesData by Params
exports.findParamsByParams = (req, res) => {

    const { page, size, type, make, model, yearBegin, yearEnd, vin, auction, dateBegin, dateEnd, region, state } = req.query;
    var condVin = vin ? { VIN: { [Op.like]: `%${vin}%` } } : null;
    var condType = type ? { VehicleType: { [Op.like]: `%${type}%` } } : null;
    var condMake = make ? { Make: { [Op.like]: `%${make}%` } } : null;
    var condModel = model ? { ModelGroup: { [Op.like]: `%${model}%` } } : null;
    var condYear = {
        begin: yearBegin ? { Year: { [Op.gte]: `%${yearBegin}%` } } : null,
        end: yearEnd ? { Year: { [Op.lte]: `%${yearEnd}%` } } : null
    };
    var condAuction = auction ? { ModelGroup: { [Op.like]: `%${auction}%` } } : null; // Add column and data in table
    var condDate = {
        begin: dateBegin ? { CreateDateTime: { [Op.gte]: `%${dateBegin}%` } } : null,
        end: dateEnd ? { CreateDateTime: { [Op.lte]: `%${dateEnd}%` } } : null
    };
    var condRegion = region ? { LocationCountry: { [Op.like]: `%${region}%` } } : null;
    var condState = state ? { LocationState: { [Op.like]: `%${state}%` } } : null;

    let listAttributesArray = [];

    for (let i = 0; i < listAllAttributes.length; i++) {
        const conditional = type ? listAllAttributes[i][1] : '';
        listAttributesArray = [...listAttributesArray, conditional];
    }

    // listAttributesArray = '\'' + listAttributesArray.join("', '") + '\'';
    // listAttributesArray = listAttributesArray.replace(/\\"/, '');

    const { limit, offset } = getPaginationList(page, size);
      
    SalesData.findAndCountAll(
        {
            attributes: listAttributesArray,
            group: listAttributesArray,
            distinct: true,
            where: {
                [Op.and]: [
                    condVin,
                    condType,
                    condMake,
                    condModel,
                    condYear.begin,
                    condYear.end,
                    condAuction,
                    condDate.begin,
                    condDate.end,
                    condRegion,
                    condState
                ],
            },
            limit,
            offset
        })
    .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving salesdata."
        });
    });
};

exports.findUniqueValues = (req, res) => {

    const { page, size, type, make, model, yearBegin, yearEnd, vin, auction, dateBegin, dateEnd, region, state } = req.query;
    var condVin = vin ? { VIN: { [Op.like]: `%${vin}%` } } : null;
    var condType = type ? { VehicleType: { [Op.like]: `%${type}%` } } : null;
    var condMake = make ? { Make: { [Op.like]: `%${make}%` } } : null;
    var condModel = model ? { ModelGroup: { [Op.like]: `%${model}%` } } : null;
    var condYear = {
        begin: yearBegin ? { Year: { [Op.gte]: `%${yearBegin}%` } } : null,
        end: yearEnd ? { Year: { [Op.lte]: `%${yearEnd}%` } } : null
    };
    var condAuction = auction ? { ModelGroup: { [Op.like]: `%${auction}%` } } : null; // Add column and data in table
    var condDate = {
        begin: dateBegin ? { CreateDateTime: { [Op.gte]: `%${dateBegin}%` } } : null,
        end: dateEnd ? { CreateDateTime: { [Op.lte]: `%${dateEnd}%` } } : null
    };
    var condRegion = region ? { LocationCountry: { [Op.like]: `%${region}%` } } : null;
    var condState = state ? { LocationState: { [Op.like]: `%${state}%` } } : null;

    const { limit, offset } = getPaginationList(page, size);

    let listAttributesArray = [];

    if (
        typeof type !== "undefined" || typeof make !== "undefined" || typeof model !== "undefined" || typeof yearBegin !== "undefined"
        || typeof yearEnd !== "undefined" || typeof auction !== "undefined" || typeof dateBegin !== "undefined" || typeof dateEnd !== "undefined"
        || typeof region !== "undefined" || typeof state !== "undefined" 
        ) {
        if (typeof type !== "undefined") {
            listAttributesArray = [];
            listAttributesArray.push(
                listAllAttributes[0][1], listAllAttributes[1][1]
            );
        } else if (typeof make !== "undefined") {
            listAttributesArray = [];
            listAttributesArray.push(
                listAllAttributes[0][1], listAllAttributes[1][1], listAllAttributes[2][1]
            );
        } else if (typeof model !== "undefined") {
            listAttributesArray = [];
            listAttributesArray.push(
                listAllAttributes[0][1], listAllAttributes[1][1], listAllAttributes[2][1], listAllAttributes[3][1]
            );
        } else if (typeof yearBegin !== "undefined") {
            listAttributesArray = [];
            listAttributesArray.push(
                listAllAttributes[0][1], listAllAttributes[1][1], listAllAttributes[2][1], listAllAttributes[3][1], listAllAttributes[4][1]
            );
        } else if (typeof yearEnd !== "undefined") {
            listAttributesArray = [];
            listAttributesArray.push(
                listAllAttributes[0][1], listAllAttributes[1][1], listAllAttributes[2][1], listAllAttributes[3][1], listAllAttributes[4][1],
                listAllAttributes[5][1]
            );
        } else if (typeof auction !== "undefined") {
            listAttributesArray = [];
            listAttributesArray.push(
                listAllAttributes[0][1], listAllAttributes[1][1], listAllAttributes[2][1], listAllAttributes[3][1], listAllAttributes[4][1],
                listAllAttributes[5][1], listAllAttributes[6][1]
            );
        } else if (typeof dateBegin !== "undefined") {
            listAttributesArray = [];
            listAttributesArray.push(
                listAllAttributes[0][1], listAllAttributes[1][1], listAllAttributes[2][1], listAllAttributes[3][1], listAllAttributes[4][1],
                listAllAttributes[5][1], listAllAttributes[6][1], listAllAttributes[7][1]
            );
        } else if (typeof dateEnd !== "undefined") {
            listAttributesArray = [];
            listAttributesArray.push(
                listAllAttributes[0][1], listAllAttributes[1][1], listAllAttributes[2][1], listAllAttributes[3][1], listAllAttributes[4][1],
                listAllAttributes[5][1], listAllAttributes[6][1], listAllAttributes[7][1], listAllAttributes[8][1]
            );
        } else if (typeof region !== "undefined") {
            listAttributesArray = [];
            listAttributesArray.push(
                listAllAttributes[0][1], listAllAttributes[1][1], listAllAttributes[2][1], listAllAttributes[3][1], listAllAttributes[4][1],
                listAllAttributes[5][1], listAllAttributes[6][1], listAllAttributes[7][1], listAllAttributes[8][1], listAllAttributes[9][1]
            );
        } else if (typeof state !== "undefined") {
            listAttributesArray = [listAllAttributes[9][1]];
        }
    } else {
        listAttributesArray = [...listAttributesArray, 'VIN'];
        console.log(type);
    }
      
    SalesData.findAndCountAll(
        {
            attributes: listAttributesArray,
            group: listAttributesArray,
            distinct: true,
            where: {
                [Op.and]: [
                    condVin,
                    condType,
                    condMake,
                    condModel,
                    condYear.begin,
                    condYear.end,
                    condAuction,
                    condDate.begin,
                    condDate.end,
                    condRegion,
                    condState
                ],
            },
            limit,
            offset
        })
    .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving salesdata."
        });
    });
};

exports.findSearchQueriesSelect = (req, res) => {

  const { make, model, yearBegin, yearEnd } = req.query;
  var condMake = make ? { Make: { [Op.like]: `%${make}%` } } : null;
  var condModel = model ? { ModelGroup: { [Op.like]: `%${model}%` } } : null;
  var condYear = {
      begin: yearBegin ? { Year: { [Op.gte]: `%${yearBegin}%` } } : null,
      end: yearEnd ? { Year: { [Op.lte]: `%${yearEnd}%` } } : null
  };
    
  SalesData.findAndCountAll(
      {
          attributes: ['Make', 'ModelGroup', 'Year'],
          group: ['Make', 'ModelGroup', 'Year'],
          distinct: true,
          where: {
              [Op.and]: [
                  condMake,
                  condModel,
                  condYear.begin,
                  condYear.end
              ],
          }
      })
  .then(data => {
      const response = getPagingData(data);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving salesdata."
      });
  });
};

// find all published SalesData
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  SalesData.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving salesdata."
      });
    });
};

// Find all Titles and VIN SalesData
exports.findAllTitlesAndVIN = (req, res) => {

    const { page, size } = req.query;    
    const { limit, offset } = getPagination(page, size);
  
    SalesData.findAndCountAll(
        {
            attributes: ['Title', 'VIN'],
            limit,
            offset 
        })
    .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving salesdata."
        });
    });
};

exports.fetchImagesCopart = (req, res) => {
    // Validate request
    const lot = req.params.lot;
    if (!lot) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
    }

    axios
        .get(`http://inventoryv2.copart.io/v1/lotImages/${lot}?country=us&brand=cprt&yardNumber=1`, {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(response => {
            res.send(JSON.stringify(response.data));
        })
        .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Tutorial."
            });
        });
}

exports.fetchImagesIAAI = (req, res) => {
    // Validate request
    const lot = req.params.lot;
    if (!lot) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
    }

    axios
        .get(`http://inventoryv2.copart.io/v1/lotImages/${lot}?country=us&brand=cprt&yardNumber=1`, {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(response => {
            res.send(JSON.stringify(response.data));
        })
        .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Tutorial."
            });
        });
}

// create item
exports.createOne = (req, res) => {
    // Validate request
    if (!req.body.VIN) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Only unique records
    let check = req.body.VIN;
    function isVINUnique (check, isUnique) {
        SalesData
            .count({
                where: {
                    VIN: {
                        [Op.like]: `${check}`
                    }
                }
            })
            .then(count => {
                isUnique(count == 0);
            });
    }
  
    // Create a Auction Item
    const auction = {
        Title: `${req.body.Make} ${req.body.ModelGroup} ${req.body.ModelDetail} ${req.body.BodyStyle} ${req.body.Color}`,
        FinalBid: req.body.FinalBid,
        YardNumber: req.body.YardNumber,
        YardName: req.body.YardName,
        SaleDateMDCY: req.body.SaleDateMDCY,
        DayOfWeek: req.body.DayOfWeek,
        SaleTimeHHMM: req.body.SaleTimeHHMM,
        TimeZone: req.body.TimeZone,
        Item: req.body.Item,
        LotNumber: req.body.LotNumber,
        VehicleType: req.body.VehicleType,
        Year: req.body.Year,
        Make: req.body.Make,
        ModelGroup: req.body.ModelGroup,
        ModelDetail: req.body.ModelDetail,
        BodyStyle: req.body.BodyStyle,
        Color: req.body.Color,
        DamageDescription: req.body.DamageDescription,
        SecondaryDamage: req.body.SecondaryDamage,
        SaleTitleState: req.body.SaleTitleState,
        SaleTitleType: req.body.SaleTitleType,
        HasKeysYesOrNo: req.body.HasKeysYesOrNo,
        VIN: req.body.VIN,
        Odometer: req.body.Odometer,
        RepairCost: req.body.RepairCost,
        Engine: req.body.Engine,
        Drive: req.body.Drive,
        Transmission: req.body.Transmission,
        FuelType: req.body.FuelType,
        Cylinders: req.body.Cylinders,
        RunsDrives: req.body.RunsDrives,
        SaleStatus: req.body.SaleStatus,
        HighBidNonVixSealedVix: req.body.HighBidNonVixSealedVix,
        SpecialNote: req.body.SpecialNote,
        LocationCity: req.body.LocationCity,
        LocationState: req.body.LocationState,
        LocationZIP: req.body.LocationZIP,
        LocationCountry: req.body.LocationCountry,
        CurrencyCode: req.body.CurrencyCode,
        ImageThumbnail: req.body.ImageThumbnail,
        CreateDateTime: req.body.CreateDateTime,
        GridRow: req.body.GridRow,
        MakeAnOfferEligible: req.body.MakeAnOfferEligible,
        BuyItNowPrice: req.body.BuyItNowPrice,
        ImageURL: req.body.ImageURL,
        ImageURL01: req.body.ImageURL01,
        ImageURL02: req.body.ImageURL02,
        ImageURL03: req.body.ImageURL03,
        ImageURL04: req.body.ImageURL04,
        ImageURL05: req.body.ImageURL05,
        ImageURL06: req.body.ImageURL06,
        ImageURL07: req.body.ImageURL07,
        ImageURL08: req.body.ImageURL08,
        ImageURL09: req.body.ImageURL09,
        Trim: req.body.Trim,
        LastUpdatedTime: req.body.LastUpdatedTime
    };

    isVINUnique(check, function(isUnique) {
        if (isUnique) {
          // Save Auction in the database
            SalesData.create(auction)
                .then(data => {
                res.send(data);
                })
                .catch(err => {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the Tutorial."
                });
            });
        } else {
            res.status(400).send({
                message: "This VIN was added to database!"
              });
            return;
        }
      });
  };