const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require('puppeteer');
const proxyChain = require('proxy-chain');
const fs = require("fs");

async function scrapeData(url) {
  try {
    const browser = await puppeteer.launch(
      {
        // args: ['--proxy-server=socks5://127.0.0.1:9050', '--no-sandbox', '--disable-setuid-sandbox'], 
        headless: false
      }
    );
    const page = await browser.newPage();
    await page.setViewport({width: 1440, height: 720});
    await page.goto(url, { waitUntil: 'networkidle2' });
    const data = await page.content();
    const $ = cheerio.load(data);
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
        ImageThumbnail: $('div.fotorama__stage__frame:nth-child(1) > img:nth-child(1)').attr('src'),
        CreateDateTime: $('').text(),
        GridRow: $('').text(),
        MakeAnOfferEligible: $('').text(),
        BuyItNowPrice: $('').text(),
        ImageURL: $('div.fotorama__stage__frame:nth-child(1) > img:nth-child(1)').attr('src'),
        ImageURL01: $('div.fotorama__stage__frame:nth-child(1) > img:nth-child(1)').attr('src'),
        ImageURL02: $('div.fotorama__stage__frame:nth-child(1) > img:nth-child(1)').attr('src').replace(/img1/, 'img2'),
        ImageURL03: $('div.fotorama__stage__frame:nth-child(1) > img:nth-child(1)').attr('src').replace(/img1/, 'img3'),
        ImageURL04: $('div.fotorama__stage__frame:nth-child(1) > img:nth-child(1)').attr('src').replace(/img1/, 'img4'),
        ImageURL05: $('div.fotorama__stage__frame:nth-child(1) > img:nth-child(1)').attr('src').replace(/img1/, 'img5'),
        ImageURL06: $('div.fotorama__stage__frame:nth-child(1) > img:nth-child(1)').attr('src').replace(/img1/, 'img6'),
        ImageURL07: $('div.fotorama__stage__frame:nth-child(1) > img:nth-child(1)').attr('src').replace(/img1/, 'img7'),
        ImageURL08: $('div.fotorama__stage__frame:nth-child(1) > img:nth-child(1)').attr('src').replace(/img1/, 'img8'),
        ImageURL09: $('div.fotorama__stage__frame:nth-child(1) > img:nth-child(1)').attr('src').replace(/img1/, 'img9'),
        Trim: $('').text(),
        LastUpdatedTime: $('').text()
    }; 
    // console.log(results);
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
        fs.writeFile(`./car.json`, summary.replace(/\\/, ''), (err) => {
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
    browser.close();
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

const testFolder = './bin/data/';
const fileArray = [
    'coutries1-104.js', 'coutries1-229.js', 'coutries1-230.js', 'coutries1-249.js',
    'coutries1-254.js', 'coutries1-262.js', 'coutries1-269.js', 'coutries1-32.js',
    'coutries1-337.js', 'coutries1-344.js', 'coutries1-353.js', 'coutries1-405.js',
    'coutries1-416.js', 'coutries1-426.js', 'coutries1-524.js', 'coutries1-582.js',
    'coutries1-784.js', 'coutries1-81.js',  'coutries1-863.js', 'coutries1-879.js',
    'coutries1-892.js', 'coutries1-94.js',  'coutries1-945.js', 'coutries1-971.js',
    'coutries1-999.js', 'coutries2-103.js', 'coutries2-105.js', 'coutries2-143.js',
    'coutries2-233.js', 'coutries2-306.js', 'coutries2-373.js', 'coutries2-433.js',
    'coutries2-44.js',  'coutries2-450.js', 'coutries2-461.js', 'coutries2-474.js',
    'coutries2-498.js', 'coutries2-528.js', 'coutries2-545.js', 'coutries2-572.js',
    'coutries2-672.js', 'coutries2-779.js', 'coutries2-81.js',  'coutries2-819.js',
    'coutries2-834.js', 'coutries2-849.js', 'coutries2-85.js',  'coutries2-853.js',
    'coutries2-885.js', 'coutries2-898.js', 'coutries2-904.js', 'coutries2-911.js',
    'coutries2-92.js',  'coutries2-959.js', 'coutries3-116.js', 'coutries3-143.js',
    'coutries3-169.js', 'coutries3-190.js', 'coutries3-244.js', 'coutries3-269.js',
    'coutries3-29.js',  'coutries3-327.js', 'coutries3-338.js', 'coutries3-390.js',
    'coutries3-427.js', 'coutries3-459.js', 'coutries3-47.js',  'coutries3-479.js',
    'coutries3-481.js', 'coutries3-502.js', 'coutries3-510.js', 'coutries3-521.js',
    'coutries3-529.js', 'coutries3-532.js', 'coutries3-62.js',  'coutries3-667.js',
    'coutries3-676.js', 'coutries3-777.js', 'coutries3-790.js', 'coutries3-833.js',
    'coutries3-887.js', 'coutries3-958.js', 'coutries3-980.js', 'coutries4-616.js'
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

fs.readFile(`${testFolder}${fileArray[2]}`, 'utf8', (err, data) => {
  array = JSON.parse(data);
  scrapeAllProcess();
});