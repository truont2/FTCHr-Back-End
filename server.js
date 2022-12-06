const express = require("express");
const controllers = require("./controllers");
const sequelize = require("./config/configuration");
const jwt = require('jsonwebtoken');
const cors = require('cors');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// app.use(cors())

app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'https://ftchr.netlify.app'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(controllers);

app.listen(PORT, () => {
  sequelize.sync({ force: false });
  console.log(`App listening on port ${PORT}!`);
});

