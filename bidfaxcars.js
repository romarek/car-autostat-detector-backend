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

fs.readFile(`./bin/_links_to_convert/linkstoconvert.js`, 'utf8', (err, data) => {
  array = JSON.parse(data);
  scrapeAllProcess();
});