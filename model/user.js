const mongoose = require('mongoose');
const hex = require('amrhextotext')
var uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    login: { 
        type: String, 
        required: true,
        unique: true  
    },
    username: { 
        type: String, 
        default: '' 
    },
    password: { 
        type: String, 
        default: '' 
    },
    playlist : [
        {type: mongoose.Schema.Types.ObjectId, ref:'Playlist'}
    ]
});

UserSchema.methods.encriptPassword = function(){
    this.password = hex.textToHex(this.password)
}

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema, 'user');