const axios = require('axios');
const http = require('http');
const fs = require('fs');
const sharp = require('sharp');

async function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest, { flags: "wx" });
        const request = http.get(url, response => {
            if (response.statusCode === 200) {
                response.pipe(file);
            } else {
                file.close();
                fs.unlink(dest, () => {});
                reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`);
            }
        });
        request.on("error", err => {
            file.close();
            fs.unlink(dest, () => {});
            reject(err.message);
        });
        file.on("finish", () => {
            resolve();
        });
        file.on("error", err => {
            file.close();
            if (err.code === "EEXIST") {
                reject("File already exists");
            } else {
                fs.unlink(dest, () => {});
                reject(err.message);
            }
        });
        // convertToWebp();
    });
}

async function convertToWebp() {
    try {
        await sharp("./imagetest.jpg")
          // .rotate(-2, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
          // .extract({ width: 600, height: 380, left: 30, top: 40 })
          // .toFormat("jpeg", { mozjpeg: true })
          .toFile("./nissan-leaf-2013-1n4az0cp0dc420080-img1-new.webp");
      } catch (error) {
        console.log(error);
      }
}

axios
    .get('http://inventoryv2.copart.io/v1/lotImages/64211091?country=us&brand=cprt&yardNumber=52', {
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    .then(res => {
        console.log(JSON.stringify(res.data.lotImages[0].link[1].url));
        const image = res.data.lotImages[0].link[1].url;
        download(image, './imagetest.webp');
    })
    .catch(error => {
        console.log(error.data);
    });