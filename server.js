const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const socketIO = require("socket.io");
const ch = require("chalk");
const path = require("path");
const http = require("http");
const fs = require("fs");
const request = require('request');
const StreamArray = require('stream-json/streamers/StreamArray');

const AdminBro = require('admin-bro');
const combineStyles = require('@admin-bro/design-system');
const ABExpress = require('@admin-bro/express');
const ABSequelize = require('@admin-bro/sequelize');

const JSONdata = require("./bin/salesdatatoimportfields.json");

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

app.use(
  cookieParser(),
  express.json(),
  express.urlencoded({ extended: true }),
  morgan("tiny"),
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;
db.sequelize.sync({ force: true }).then(() => {
  initial();
  AdminBro.registerAdapter(ABSequelize);

  const adminBro = new AdminBro({
    colors: {
      primary100: '#000'
    },
    resources: [
      { resource: db.salesdata, options: { listProperties: [
          'VIN', 'LotNumber', 'Make', 'ModelDetail', 'BodyStyle', 'Color'
      ] } },
      db.auctions,
      db.user,
      db.requests,
      db.views,
    ],
    dashboard: {
      handler: async () => {
        return { some: 'output' }
      },
      component: AdminBro.bundle('./adminpanel/dashboard.jsx'),
    },
    branding: {
      logo: 'https://autoastat.com/build/images/logo_temp_desktop.37bb5de7.svg',
      favicon: 'https://autoastat.com/favicon.ico',
      companyName: 'Panel administracyjny - Car AutoAstat Detector',
      softwareBrothers: false,
    },
    locale: {
      translations: {
        labels: {
          carhunter_prod: 'Linki',
          Salesdata: 'Przeglądaj samochody',
          Auctions: 'Wyniki aukcji',
          Users: 'Użytkownicy',
          Requests: 'Statystyki',
          Views: 'Wyświetlenia',
          navigation: 'Nawigacja',
          pages: 'Strony',
          selectedRecords: 'Zaznaczono ({{selected}})',
          filters: 'Filtry',
          adminVersion: 'Admin: {{version}}',
          appVersion: 'App: {{version}}',
          loginWelcome: 'Zapraszamy',
        },
        actions: {
          new: 'Stwórz nowy',
          edit: 'Edytuj',
          show: 'Zobacz więcej',
          delete: 'Usuń',
          bulkDelete: 'Usuń wszystko',
          list: 'Lista',
        },
        buttons: {
          save: 'Zapisz',
          confirmRemovalMany_1: 'Potwierdź usunięcie {{count}} rekordu',
          confirmRemovalMany_2: 'Potwierdź usunięcie {{count}} rekordów',
          addNewItem: 'Add New Item',
          filter: 'Filtruj',
          applyChanges: 'Akceptuj zmiany',
          resetFilter: 'Resetuj',
          confirmRemovalMany: 'Potwierdź usunięcie {{count}} rekordów',
          confirmRemovalMany_plural: 'Potwierdź usunięcie {{count}} rekordów',
          logout: 'Wyloguj się',
          login: 'Zaloguj się',
          createFirstRecord: 'Utwórz pierwszy rekord',
        },
        properties: {
          length: 'Długość',
          from: 'Od',
          to: 'Do',
        },
        messages: {
          noRecords: 'Brak rekordów',
          successfullyBulkDeleted: 'Usunięto {{count}} rekordów',
          successfullyBulkDeleted_plural: 'Usunięto {{count}} rekordów',
          successfullyDeleted: 'Usunięto rekord',
          successfullyUpdated: 'Zaktualizowano rekord',
        },
        resources: {
          Auctions: {
            properties: {
              Make: 'Marka',
              ModelGroup: 'Seria',
              ModelDetail: 'Detale',
              BodyStyle: 'Rodzaj',
              Color: 'Kolor'
            }
          }
        }
      },
    },
    rootPath: '/panel',
    loginPath: '/panel/login',
    logoutPath: '/panel/logout',
  });
const router = ABExpress.buildRouter(adminBro);
app.use(adminBro.options.rootPath, router);

app.get("/", (req, res) => {
  res.json({ message: "App is running!" });
});

require("./routes/auctions")(app);
require('./routes/auth')(app);
require('./routes/user')(app);
require('./routes/requests')(app);
require('./routes/views')(app);
require('./routes/salesdata')(app);

// for (const salesDataContent of JSONdata) {
//   db.salesdata.create(salesDataContent)
// }

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

function print (path, layer) {
  if (layer.route) {
    layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
  } else if (layer.name === 'router' && layer.handle.stack) {
    layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
  } else if (layer.method) {
    console.log('%s /%s',
      layer.method.toUpperCase(),
      path.concat(split(layer.regexp)).filter(Boolean).join('/'))
  }
}

function split (thing) {
  if (typeof thing === 'string') {
    return thing.split('/')
  } else if (thing.fast_slash) {
    return ''
  } else {
    var match = thing.toString()
      .replace('\\/?', '')
      .replace('(?=\\/|$)', '$')
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
    return match
      ? match[1].replace(/\\(.)/g, '$1').split('/')
      : '<complex:' + thing.toString() + '>'
  }
}

app._router.stack.forEach(print.bind(null, []));
});