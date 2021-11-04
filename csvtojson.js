const fs = require("fs");
var path = require('path');

var filePath = path.join(__dirname, './bin/salesdata.csv');
    // Read CSV
    var f = fs.readFileSync(filePath, {encoding: 'utf-8'}, 
        function(err){console.log(err);});

    // Split on row
    f = f.split("\n");

    // Get first row for column headers
    headers = f.shift().split(",");

    var json = [];    
    f.forEach(function(d){
        // Loop through each row
        tmp = {}
        row = d.split(",")
        for(var i = 0; i < headers.length; i++){
            tmp[headers[i]] = row[i];
        }
        // Add object to list
        json.push(tmp);
    });

    var outPath = path.join(__dirname, './bin/salesdata.json');
    // Convert object to string, write json to file
    fs.writeFileSync(outPath, JSON.stringify(json), 'utf8', 
        function(err){console.log(err);});

// csvData = fs.readFileSync("./bin/SalesList_10052021.csv");
 
// function CSVToArray(csvData, delimiter) {
//   delimiter = (delimiter || ",");
//    var pattern = new RegExp((
//   "(\\" + delimiter + "|\\r?\\n|\\r|^)" +
//   "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
//   "([^\"\\" + delimiter + "\\r\\n]*))"), "gi");
//   var data = [[]];
//   var matches = null;
//   while (matches = pattern.exec(csvData)) {
//       var matchedDelimiter = matches[1];
//       if (matchedDelimiter.length && (matchedDelimiter != delimiter)) {
//           data.push([]);
//       }
//       if (matches[2]) {
//           var matchedDelimiter = matches[2].replace(
//           new RegExp("\"\"", "g"), "\"");
//       } else {
//           var matchedDelimiter = matches[3];
//       }
//       data[data.length - 1].push(matchedDelimiter);
//   }
//   return (data);
// }

// function CSVToJSON(csvData) {
//   var data = CSVToArray(csvData);
//   var objData = [];
//   for (var i = 1; i < data.length; i++) {
//       objData[i - 1] = {};
//       for (var k = 0; k < data[0].length && k < data[i].length; k++) {
//           var key = data[0][k];
//           objData[i - 1][key] = data[i][k]
//       }
//   }
//   var jsonData = JSON.stringify(objData);
//   jsonData = jsonData.replace(/},/g, "},\r\n");
//   let json = JSON.stringify(jsonData);
//   fs.writeFileSync('./bin/SalesList_10052021.json', json);
// }

// CSVToJSON();