module.exports = app => {
    const salesdata = require("../controllers/salesdata.js");
  
    var router = require("express").Router();
  
    router.get("/", salesdata.findAll);
  
    router.get("/published", salesdata.findAllPublished);
  
    router.get("/item/:id", salesdata.findOne);

    router.get("/vin/:vin", salesdata.findOneByVin);

    router.get("/params", salesdata.findOneByParams);

    router.get("/select", salesdata.findParamsByParams);

    router.get("/expand", salesdata.findUniqueValues);

    router.get("/queries", salesdata.findSearchQueriesSelect);

    router.get("/listall", salesdata.findAllTitlesAndVIN);

    router.get("/images/copart/:lot", salesdata.fetchImagesCopart);

    router.get("/images/iaai/:lot", salesdata.fetchImagesIAAI);

    router.post("/", salesdata.createOne);
  
    app.use("/api/salesdata", router);
  };