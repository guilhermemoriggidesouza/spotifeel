const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./DBConnection');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Conectado")
});

require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app