const db = require("../models");
const Auctions = db.Auctions;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: auctions } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, auctions, totalPages, currentPage };
};

// Retrieve all Auctions from the database.
exports.findAll = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  Auctions.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving auctions."
      });
    });
};

// Find a single Auction with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Auctions.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Auction with id=" + id
      });
    });
};

// find all published Auctions
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Auctions.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving auctions."
      });
    });
};

// create item
exports.createOne = (req, res) => {
  // Validate request
  if (!req.body.saleName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Auction Item
  const auction = {
    auctionId: req.body.auctionId,
    saleName: req.body.saleName,
    salePlatform: req.body.salePlatform,
    auctionDateTimeInUTC: req.body.auctionDateTimeInUTC,
    facility: req.body.facility,
    totalItems: req.body.totalItems
  };

  // Save Auction in the database
  Auctions.create(auction)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};