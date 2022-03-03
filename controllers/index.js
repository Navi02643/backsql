const express = require("express");
const app = express();

app.use('/login',require('./login'))
app.use('/usuario',require('./usuario'))

module.exports = app;