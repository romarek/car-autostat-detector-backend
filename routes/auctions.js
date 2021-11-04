module.exports = app => {
    const auctions = require("../controllers/auctions.js");
  
    var router = require("express").Router();
  
    router.get("/", auctions.findAll);
    router.get("/published", auctions.findAllPublished);
    router.get("/:id", auctions.findOne);
    router.post("/", auctions.createOne);
    // router.put("/:id", auctions.updateOne);
    // router.delete("/:id", auctions.deleteOne);
  
    app.use("/api/auctions", router);
  };