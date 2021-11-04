const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const fs = require("fs");

const puppeteer = require('puppeteer');

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

const PORT_IAAI = process.env.PORT_IAAI || 8081;
app.listen(PORT_IAAI, () => {
    console.log(`Server is running on port ${PORT_IAAI}.`);
});

const loginPageLink = 'https://login.iaai.com/Identity/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3DAuctionCenterPortal%26redirect_uri%3Dhttps%253A%252F%252Fwww.iaai.com%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520email%2520phone%2520offline_access%2520BuyerProfileClaims%26state%3DOpenIdConnect.AuthenticationProperties%253DGROGAePKm70AK92RZNyu0tm4aiEb07Snd1SV79KaSWLSBAb3BHToOAKMpw_OH9iegj1cfd-QrhwjRq-ObI3lpDYaRMGRp9vdNg1NCigLF6FEUtOKMeKlgLrPXXquVG3Pg--nnkDqdX4YimJVkCk54-EP_AHyf4CODPEfF2egzlPyd2ilTHiaoWkYj_LOegbvvBQMEKBzXwyBsVh1dvbaJhcyl5F3ccso-m7RNjbjSLv4Hc0rWx8gBtK11EBbPSGIIRJCrXzmN7zRJObnRCHOSiKaU7Q%26response_mode%3Dform_post%26nonce%3D637690579127285929.YmUxYzlkNDctNGRmYS00OTc2LWJhYTQtNGIyZTdmYWZmYjA4YzVjMzIzYTMtYWRkYy00NTQyLWI4ZDUtZDZkZDQ0YzdlY2U2%26x-client-SKU%3DID_NET461%26x-client-ver%3D5.3.0.0';

async function getLinksFromService() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({width: 1200, height: 720});
    await page.goto(loginPageLink, { waitUntil: 'networkidle0' });
    await page.type('#Email', 'volodymyr.iaai@gmail.com');
    await page.type('#Password', 'Jawiem123!');
    await Promise.all([
      page.click('.login-form__submit button'),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);
    await page.goto('https://www.iaai.com/SalesList/607/10182021');
    await Promise.all([
      page.click('#divSalesListFilter > div > div > div.d-flex.align-items-center > a:nth-child(2)'),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);
    await page.goto('https://www.iaai.com/LiveAuctionsCalendar');
    await page.waitForSelector('#ddrAuctionDate').then(() => {
      page.evaluate(() => {
        const example = document.querySelector('#ddrAuctionDate');
        const example_options = example.querySelectorAll('option');
        const selected_option = [...example_options].find(option => option.text.includes('12'));
    
        selected_option.selected = true;
      });
    });
    await page.evaluate(() => {
      const sales = document.querySelectorAll('.table-cell.table-cell--status .pt-10:nth-child(3)');
      const salesArray = Array.prototype.slice.call(sales);
      let resultArray = [];
      for (let i = 1; i < salesArray.length; i++) {
        const inputData = salesArray[i].innerHTML;
        const pattern = /(\/.)(.*?)(")/;
        if (inputData !== null || typeof inputData !== undefined) {
          let result = pattern.exec(inputData);
          result[0].replace(/["']/g, "");
          console.log(result[0]);
          resultArray = [...resultArray, result[0]];
          page.goto(`https://www.iaai.com/${result[0]}`);
        }
      }
    });
    await page.evaluate(() => {
      for (let j = 0; j < 10; j++) {
        page.goto(`https://www.iaai.com/SalesList/371/10062021`);
      }
    })
  }
  
  getLinksFromService().then((blob) => {
  }).catch(e => console.log(e));

  // setInterval(function() { 
  //   let a = document.querySelector("div.vehicle-salvage-details.vehicle-section-container > div > ul > li:nth-child(2) > span.data-list__value").innerText;
  //   let b = document.querySelector('div.js-BidActions > div > div > div.high-bid > span.high-bid__amount').innerText;
  //   console.log(a, b); 
  // }, 1000 );
