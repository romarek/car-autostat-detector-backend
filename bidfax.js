const puppeteer = require('puppeteer');
const fs = require("fs");

async function scrapeData(url, i) {
  try {
    const browser = await puppeteer.launch(
      {
        headless: false
        // args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=egl', '--disable-dev-shm-usage', '--disable-extensions-except=' + this.extensionPathBuildPath, '--load-extension=' + this.extensionPathBuildPath]
      }
    );
    const page = await browser.newPage();
    await page.setViewport({width: 1440, height: 720});
    await page.goto(url, { waitUntil: 'networkidle2' });
    const data = await page.content();
    const hrefs = await Promise.all((await page.$x('div.caption a')).map(async item => await (await item.getProperty('href')).jsonValue()));
    const dataBind = JSON.stringify(hrefs);
    const d = new Date();
    let ms = d.getUTCMilliseconds();
    await fs.writeFile(`./_list_to_merge/coutries${i}-${ms}.txt`, dataBind, (err) => {
      if (err) {
        console.error(err);
        browser.close();
        return;
      }
      console.log("Successfully written data to file");
      console.log(hrefs);
      browser.close();
    });
  } catch (err) {
    console.error(err);
    browser.close();
  }
}
async function generateLinks() {
  for (let i = 1; i < 10; i++) {
    const brands = [
      'audi', 'bentley', 'bmw', 'alfa-romeo', 'aston-martin', 'buick', 'cadillac', 'chevrolet',
      'dodge', 'ducati', 'ferrari', 'honda', 'infiniti', 'jaguar', 'kia', 'land-rover', 'lexus',
      'mazda', 'mercedes-benz', 'mini', 'mitsubishi', 'nissan', 'porsche', 'saab', 'subaru', 'suzuki', 'tesla', 'toyota',
      'volkswagen', 'volvo', 'yamaha'];
    for (let j = 0; j < brands.length; j++) {
      await scrapeData(`https://en.bidfax.info/${brands[j]}/page/${i}/`, i);
      const time = Math.floor((Math.random() * 6000) + 1000); 
      await new Promise(resolve => setTimeout(resolve, time));
    }
  }
}

generateLinks();

