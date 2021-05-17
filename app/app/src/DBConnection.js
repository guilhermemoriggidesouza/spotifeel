const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/iaEmotions', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect('mongodb+srv://iaEmotions:as123as456@cluster0.xyvqh.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose