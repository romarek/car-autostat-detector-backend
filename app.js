const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express');
const AdminBroSequelize = require('@admin-bro/sequelize');

AdminBro.registerAdapter(AdminBroSequelize);

const adminBro = require('./admin');
const { authenticate } = require('./admin/util');

dotenv.config();

const PORT = 8081;
const app = express();

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookiePassword: 'admin-panel-tutorial',
  authenticate,
}, null);

app.use(adminBro.options.rootPath, router);
app.use(adminBro.options.loginPath, router);
app.listen(PORT, () => {
 console.log(`Server is listening on port: ${PORT}`);
});

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
    origin: "https://bidspace.info",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");

db.sequelize.sync({ force: false }).then(() => {

  AdminBro.registerAdapter(AdminBroSequelize);
  app.get("/", (req, res) => {
    res.json({ message: "App is running!" });
  });
  
  require("./routes/auctions")(app);
  require('./routes/requests')(app);
  require('./routes/views')(app);
  require('./routes/salesdata')(app);
  
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
