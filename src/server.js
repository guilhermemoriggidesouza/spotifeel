const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./DBConnection');
var cors = require('cors');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Conectado")
});

require('dotenv').config();
const app = express();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app