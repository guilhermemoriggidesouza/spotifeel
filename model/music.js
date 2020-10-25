const mongoose = require('mongoose');
const hex = require('amrhextotext')

const MusicSchema = new mongoose.Schema({
    title : {
        type:String,
    },
    playlist : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Playlist'
    },
    file : { 
        type: String 
    },
});

module.exports = mongoose.model('Music', MusicSchema, 'music');