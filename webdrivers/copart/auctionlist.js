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
const axios = require('axios');

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

const PORT_COPART = process.env.PORT_COPART || 8083;
  app.listen(PORT_COPART, () => {
    console.log(`Server is running on port ${PORT_COPART}.`);
  });

const loginPageLink = 'https://www.copart.com/login/';

// function getAuctionList() {
//   return axios
//   .get('https://www.copart.com/public/data/todaysAuctions', 
//   {
//     headers: {
//       'Content-Type': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
//       'Accept-Encoding': 'gzip, deflate, br',
//       'Connection': 'keep-alive',
//       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0'
//     }
//   }
//   )
//   .then(function (response) {
//     fs.writeFileSync('_import_auctions.json', JSON.stringify(response.data.data.saleList.laterSales));
//     console.log('Import auctions successed!');
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
// }

// getAuctionList();

async function getAuctionsFromService() {
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
  await page.goto('https://www.copart.com/todaysAuction/', { waitUntil: 'networkidle0', timeout: 0 });
}

getAuctionsFromService().then((blob) => {
}).catch(e => console.log(e));

