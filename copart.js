const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const fs = require("fs");

const puppeteer = require('puppeteer');
const path = require('path');
const downloadPath = path.resolve('./bin');
const csv = require("csvtojson");

const csvFilePath = './bin/salesdata.csv';

dotenv.config();

const app = express();

app.use((req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', true);
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

const PORT_COPART = process.env.PORT_COPART || 8082;
  app.listen(PORT_COPART, () => {
    console.log(`Server is running on port ${PORT_COPART}.`);
  });

const loginPageLink = 'https://www.copart.com/login/';

async function getLinksFromService() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setViewport({width: 1200, height: 720});
  await page.goto(loginPageLink, { waitUntil: 'networkidle0' });
  await page.type('#username', 'volodymyr.copart@gmail.com');
  await page.type('#password', 'Jawiem123!');
  await Promise.all([
    page.click('.btn.btn-lblue.loginfloatright'),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ]);
  await page._client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: downloadPath 
  });
  await page.goto('https://www.copart.com/downloadSalesData/', { waitUntil: 'networkidle0', timeout: 0 });
  await Promise.all([
    page.waitForSelector('#csv > div.col-sm-4 > div > div > div > button'),
    page.click('#csv > div.col-sm-4 > div > div > div > button'),
    page.waitForNavigation({ waitUntil: 'load', timeout: 0 }),
  ]).then(() => {
    var filePath = path.join(__dirname, './bin/salesdata.csv');
    // Read CSV
    var f = fs.readFileSync(filePath, {encoding: 'utf-8'}, 
        function(err){console.log(err);});
    console.log('File is reading now!');
    // Split on row
    f = f.split("\n");

    // Get first row for column headers
    headers = f.shift().split(",");

    var json = [];    
    f.forEach(function(d){
        // Loop through each row
        tmp = {}
        row = d.split(",")
        for(var i = 0; i < headers.length; i++){
            tmp[headers[i]] = row[i];
        }
        // Add object to list
        json.push(tmp);
    });

    var outPath = path.join(__dirname, './bin/salesdata.json');
    // Convert object to string, write json to file
    fs.writeFileSync(outPath, JSON.stringify(json), 'utf8', 
        function(err){console.log(err);});
  }).catch(e => console.log(e));
}

getLinksFromService().then((blob) => {
}).catch(e => console.log(e));