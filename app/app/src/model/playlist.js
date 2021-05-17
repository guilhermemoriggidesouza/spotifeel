const mongoose = require('mongoose');
const hex = require('amrhextotext')

const PlaylistSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    subtitle : {
        type: String
    },
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    music:[
        {type: mongoose.Schema.Types.ObjectId, ref:'Music'}
    ]
});

module.exports = mongoose.model('Playlist', PlaylistSchema, 'playlist');