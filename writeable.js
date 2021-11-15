const StreamArray = require('stream-json/streamers/StreamArray');
const {Writable} = require('stream');
const path = require('path');
const fs = require('fs');
const http = require('http');
const axios = require('axios');

const fileStream = fs.createReadStream(path.join(__dirname, './car.json'));
const jsonStream = StreamArray.withParser();

let processNumber = 1;

const processingStream = new Writable({
    write({key, value}, encoding, callback) {          
        setTimeout(() => {
            // console.log(JSON.stringify(value));
            axios.post('http://localhost:8081/api/salesdata', value, { headers: {
                'Content-Type': 'application/json'
              }})
              .then(function (response) {
                console.table(`Item ${processNumber}`);
                processNumber++;
              })
              .catch(function (error) {
                console.log(error);
              });
            callback();
        }, 50);
    },
    objectMode: true
});

fileStream.pipe(jsonStream.input);
jsonStream.pipe(processingStream);

processingStream.on('finish', () => console.log('All done'));