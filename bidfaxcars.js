const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require('puppeteer');
const proxyChain = require('proxy-chain');
const fs = require("fs");
const Jimp = require('jimp');
const sharp = require('sharp');
const path = require('path');

async function scrapeData(url) {
  try {
    const browser = await puppeteer.launch(
      {
        // args: ['--proxy-server=socks5://127.0.0.1:9050', '--no-sandbox', '--disable-setuid-sandbox'], 
        headless: false
      }
    );
    const page = await browser.newPage();
    const session = await page.target().createCDPSession();
    const {windowId} = await session.send('Browser.getWindowForTarget');
    await session.send('Browser.setWindowBounds', {windowId, bounds: {windowState: 'minimized'}});
    await page.setViewport({width: 1440, height: 5020});
    await page.goto(url, { waitUntil: 'networkidle2' });
    var data = await page.content();
    var $ = cheerio.load(data);
    const filename = {
        Make: $('#dle-speedbar > span:nth-child(2) > a:nth-child(1) > span:nth-child(1)').text(),
        ModelGroup: $('#dle-speedbar > span:nth-child(3) > a:nth-child(1) > span:nth-child(1)').text(),
        Year: $('p.short-story2:nth-child(5) > span:nth-child(1)').text(),
        Color: $('p.short-story2:nth-child(18) > span:nth-child(1)').text(),
        VIN: $('p.short-story:nth-child(6) > span:nth-child(1)').text(),
    };
    const results = {
        Title: $('.full-title > h1:nth-child(1)').text(),
        FinalBid: $('.bidfax-price > span:nth-child(2)').text(),
        YardNumber: $('').text(),
        YardName: $('p.short-story:nth-child(2) > span:nth-child(1)').text(),
        SaleDateMDCY: $('p.short-story:nth-child(4) > span:nth-child(1)').text(),
        DayOfWeek: $('').text(),
        SaleTimeHHMM: $('').text(),
        TimeZone: $('').text(),
        Item: $('p.short-story2:nth-child(22) > span:nth-child(1)').text(),
        LotNumber: $('p.short-story2:nth-child(3) > span:nth-child(1)').text(),
        VehicleType: $('').text(),
        Year: $('p.short-story2:nth-child(5) > span:nth-child(1)').text(),
        Make: $('#dle-speedbar > span:nth-child(2) > a:nth-child(1) > span:nth-child(1)').text(),
        ModelGroup: $('#dle-speedbar > span:nth-child(3) > a:nth-child(1) > span:nth-child(1)').text(),
        ModelDetail: $('').text(),
        BodyStyle: $('').text(),
        Color: $('p.short-story2:nth-child(18) > span:nth-child(1)').text(),
        DamageDescription: $('p.short-story:nth-child(13) > span:nth-child(1)').text(),
        SecondaryDamage: $('p.short-story2:nth-child(14) > span:nth-child(1)').text(),
        SaleTitleState: $('').text(),
        SaleTitleType: $('').text(),
        HasKeysYesOrNo: $('p.short-story:nth-child(21) > span:nth-child(1)').text(),
        VIN: $('p.short-story:nth-child(6) > span:nth-child(1)').text(),
        Odometer: $('').text(),
        RepairCost: $('p.short-story:nth-child(15) > span:nth-child(1)').text(),
        Engine: $('p.short-story:nth-child(8) > span:nth-child(1)').text(),
        Drive: $('p.short-story:nth-child(19) > span:nth-child(1)').text(),
        Transmission: $('p.short-story:nth-child(17) > span:nth-child(1)').text(),
        FuelType: $('p.short-story2:nth-child(20) > span:nth-child(1)').text(),
        Cylinders: $('p.short-story2:nth-child(9) > span:nth-child(1)').text(),
        RunsDrives: $('.full-side > p:nth-child(7) > span:nth-child(1)').text(),
        SaleStatus: $('').text(),
        HighBidNonVixSealedVix: $('').text(),
        SpecialNote: $('p.short-story:nth-child(11) > span:nth-child(1)').text(),
        LocationCity: $('p.short-story2:nth-child(12) > span:nth-child(1)').text(),
        LocationState: $('').text(),
        LocationZIP: $('').text(),
        LocationCountry: 'USA',
        CurrencyCode: '$',
        CreateDateTime: $('').text(),
        GridRow: $('').text(),
        MakeAnOfferEligible: $('').text(),
        BuyItNowPrice: $('').text(),
        Trim: $('').text(),
        LastUpdatedTime: $('').text()
    };
    async function downloadImages() {
      await page.goto(
        `https://www.iaai.com/Images/EnlargeImages?stockNumber=${results.LotNumber}#stayhere`,
        { waitUntil: 'networkidle0'}
      );
      console.log(results);
      var data2 = await page.content();
      var $ = await cheerio.load(data2);
      setTimeout(function() {
          const image = [
              $('.col-12:nth-of-type(1) > a > img.lazy').attr('src'),
              $('.col-12:nth-of-type(2) > a > img.lazy').attr('src'),
              $('.col-12:nth-of-type(3) > a > img.lazy').attr('src'),
              $('.col-12:nth-of-type(4) > a > img.lazy').attr('src'),
              $('.col-12:nth-of-type(5) > a > img.lazy').attr('src'),
              $('.col-12:nth-of-type(6) > a > img.lazy').attr('src'),
              $('.col-12:nth-of-type(7) > a > img.lazy').attr('src'),
              $('.col-12:nth-of-type(8) > a > img.lazy').attr('src'),
              $('.col-12:nth-of-type(9) > a > img.lazy').attr('src')
          ];
          console.log(image);
          const make = results.Make;
          const model = results.ModelGroup;
          const color = results.Color;
          const year = results.Year;
          const VIN = results.VIN;
          downloadImagesToStorage();
          async function downloadImagesToStorage() {
              for await (let num2 of asyncImagesGenerator()) {
                  getImageForExternal(
                      image[num2],
                      num2,
                      make,
                      model,
                      color,
                      year,
                      VIN
                  );
              }
          }
          function getImageForExternal(
              imgURLToRestore,
              number,
              make,
              model,
              color,
              year,
              VIN
          ) {
              Jimp.read(imgURLToRestore)
              .then(imageRead => {
                  return imageRead
                      .quality(100)
                      .write(path.join(__dirname, `./storage/${make}/${make}-${model}-${color}-${year}-${VIN}_${number}.jpg`));
              })
              .catch(err => {
                  console.error(err);
              });
          }
      }, 8000);
    }
    if (results.YardName.includes('IAAI')) {
      await downloadImages();
    }
    const d = new Date();
    let ms = d.getUTCMilliseconds();
    await fs.readFile('./car.json', 'utf8', (err, data) => {
        let summary = '';
        if (typeof data !== undefined) {
            summary = JSON.stringify(data) + ', ' + JSON.stringify(results);
            console.log(JSON.stringify(data));
            console.log(JSON.stringify(results));
        } else {
            summary = JSON.stringify(results);
        }
        fs.writeFile(`./car.json`, summary.replaceAll(/\\/gi, ''), (err) => {
            if (err) {
              console.error(err);
              browser.close();
              return;
            }
            console.log("Successfully written data to file");
            browser.close();
          });
    });
    
  } catch (err) {
    console.error(err);
  }
}

let array = [];

async function scrapeAllProcess() {
    for (let i = 0; i < array.length; i++) {
      await scrapeData(array[i]);
      const time = Math.floor((Math.random() * 6000) + 1000); 
      await new Promise(resolve => setTimeout(resolve, time));
    }
}

async function* asyncImagesGenerator() {
  let i = 0;
  while (i < 9) {
    yield i++;
  }
}

const testFolder = './';
const fileArray = [
  'linkstoconvert.js'
  ];

// async function scrapeAllProcessFromFiles() {
//     for (let l = 0; l < fileArray.length; l++) {
//       fs.readFile(`${testFolder}${fileArray[l]}`, 'utf8', (err, data) => {
//             array = JSON.parse(data);
//             await scrapeAllProcess();
//         });
//     }
// }

async function getListOfFiles() {
    await fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
            fileArray.push(file);
        });
        console.log(fileArray);
    });
}

// getListOfFiles();
// scrapeAllProcessFromFiles();

fs.readFile(`./linkstoconvert.js`, 'utf8', (err, data) => {
  array = JSON.parse(data);
  scrapeAllProcess();
});