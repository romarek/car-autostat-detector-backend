module.exports = app => {
    const views = require("../controllers/views.js");
  
    var router = require("express").Router();
  
    // Create a new View
    router.post("/", views.create);
  
    // Retrieve all Views
    router.get("/", views.findAll);
  
    // Retrieve all published Views
    router.get("/published", views.findAllPublished);
  
    // Retrieve a single View with id
    router.get("/:id", views.findOne);

    app.use("/api/views", router);
  };