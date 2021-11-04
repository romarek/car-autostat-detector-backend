const fs = require('fs');
const prettier = require('prettier');

fs.readFile('../../bin/salesdata.json', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(/\\"/g, '');
    // var prettyResult = prettier.format(JSON.stringify(result),{ semi: false, parser: "json" });
    fs.writeFile('../../bin/salesdatatoimport.json', result, 'utf8', function (err) {
       if (err) return console.log(err);
    });
  });
