const db = require("../models");
const Requests = db.Requests;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: requests } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, requests, totalPages, currentPage };
};

// Create and Save a new Request
exports.create = (req, res) => {
  // Validate request
  if (!req.body.vin) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Request
  const request = {
    VIN: req.body.vin,
    isDatabaseIn: req.body.isDatabaseIn,
    ipAddress: req.body.ipAddress,
    userAgent: req.body.userAgent,
    date: new Date().toISOString().slice(0, 10),
    time: new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
  };

  // Save Request in the database
  Requests.create(request)
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

// Retrieve all Requests from the database.
exports.findAll = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  Requests.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Request with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Requests.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// find all published Requests
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Requests.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};