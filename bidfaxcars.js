const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require('puppeteer');
const proxyChain = require('proxy-chain');
const fs = require("fs");
const Jimp = require('jimp');
const sharp = require('sharp');

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
    await page.setViewport({width: 1440, height: 720});
    await page.goto(url, { waitUntil: 'networkidle2' });
    const data = await page.content();
    const $ = cheerio.load(data);
    const imageToEdit = {
      ImageURL01: $('div.fotorama__stage__frame:nth-child(1) > img:nth-child(1)').attr('src'),
      ImageURL02: $('div.fotorama__stage__frame:nth-child(1) > img:nth-child(1)').attr('src').replace(/img1/, 'img2'),
      ImageURL03: $('div.fotorama__stage__frame:nth-child(1) > img:nth-child(1)').attr('src').replace(/img1/, 'img3'),
      ImageURL04: $('div.fotorama__stage__frame:nth-child(1) > img:nth-child(1)').attr('src').replace(/img1/, 'img4'),
      ImageURL05: $('div.fotorama__stage__frame:nth-child(1) > img:nth-child(1)').attr('src').replace(/img1/, 'img5'),
      ImageURL06: $('div.fotorama__stage__frame:nth-child(1) > img:nth-child(1)').attr('src').replace(/img1/, 'img6'),
      ImageURL07: $('div.fotorama__stage__frame:nth-child(1) > img:nth-child(1)').attr('src').replace(/img1/, 'img7'),
      ImageURL08: $('div.fotorama__stage__frame:nth-child(1) > img:nth-child(1)').attr('src').replace(/img1/, 'img8'),
      ImageURL09: $('div.fotorama__stage__frame:nth-child(1) > img:nth-child(1)').attr('src').replace(/img1/, 'img9'),
    };
    function getImageForExternal(imgURLToRestore, number) {
      Jimp.read(imgURLToRestore)
      .then(imageRead => {
        return imageRead
          .rotate(-5, true)
          .crop(40, 52, 600, 385)
          .quality(100)
          .write(`./__storage/${results.Make}-${results.ModelGroup}-${results.Color}-${results.Year}-${results.VIN}_${number}.jpg`);
      })
      .catch(err => {
        console.error(err);
      });
    }
    
    getImageForExternal(imageToEdit.ImageURL01, 1);
    console.log('Get 1!');
    getImageForExternal(imageToEdit.ImageURL02, 2);
    console.log('Get 2!');
    getImageForExternal(imageToEdit.ImageURL03, 3);
    console.log('Get 3!');
    getImageForExternal(imageToEdit.ImageURL04, 4);
    console.log('Get 4!');
    getImageForExternal(imageToEdit.ImageURL05, 5);
    console.log('Get 5!');
    getImageForExternal(imageToEdit.ImageURL06, 6);
    console.log('Get 6!');
    getImageForExternal(imageToEdit.ImageURL07, 7);
    console.log('Get 7!');
    getImageForExternal(imageToEdit.ImageURL08, 8);
    console.log('Get 8!');
    getImageForExternal(imageToEdit.ImageURL09, 9);
    console.log('Get 9!');

    const filename = {
        Make: $('#dle-speedbar > span:nth-child(2) > a:nth-child(1) > span:nth-child(1)').text(),
        ModelGroup: $('#dle-speedbar > span:nth-child(3) > a:nth-child(1) > span:nth-child(1)').text(),
        Year: $('p.short-story2:nth-child(5) > span:nth-child(1)').text(),
        Color: $('p.short-story2:nth-child(18) > span:nth-child(1)').text(),
        VIN: $('p.short-story:nth-child(6) > span:nth-child(1)').text(),
    };

    const file = `${filename.Make}-${filename.ModelGroup}-${filename.Color}-${filename.Year}-${filename.VIN}`;

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
        ImageURL: `/storage/${file}_1.jpg`,
        ImageURL01: `/storage/${file}_1.jpg`,
        ImageURL02: `/storage/${file}_2.jpg`,
        ImageURL03: `/storage/${file}_3.jpg`,
        ImageURL04: `/storage/${file}_4.jpg`,
        ImageURL05: `/storage/${file}_5.jpg`,
        ImageURL06: `/storage/${file}_6.jpg`,
        ImageURL07: `/storage/${file}_7.jpg`,
        ImageURL08: `/storage/${file}_8.jpg`,
        ImageURL09: `/storage/${file}_9.jpg`,
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