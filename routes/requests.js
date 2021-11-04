module.exports = app => {
    const requests = require("../controllers/requests.js");
  
    var router = require("express").Router();
  
    // Create a new View
    router.post("/", requests.create);
  
    // Retrieve all Views
    router.get("/", requests.findAll);
  
    // Retrieve all published Views
    router.get("/published", requests.findAllPublished);
  
    // Retrieve a single View with id
    router.get("/:id", requests.findOne);

    app.use("/api/requests", router);
  };