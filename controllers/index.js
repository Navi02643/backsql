const express = require("express");
const app = express();

app.use('/login',require('./usuario'))

module.exports = app;