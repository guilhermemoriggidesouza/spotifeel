var app = require('./server.js')
const serverless = require('serverless-http');
var multer = require('multer'); 
const express = require('express');
var path = require('path'); 
var { loginController, playlistController} = require('./controller')
  
var upload = multer({ dest: './uploads/',
    rename: function (fieldname, filename) {
        return fieldname + '-' + Date.now();
    },  
})

var router = express.Router();

router.get('/login',  (req, res) => loginController.validateLogin(req, res))

router.post('/login',  (req, res) => loginController.createLogin(req, res))

router.post('/playlist/:playlist',  upload.array("file"), (req, res) => playlistController.addMusicsPlaylist(req, res))

router.post('/playlist/url/:playlist', (req, res) => playlistController.addMusicsPlaylistFromOtherFile(req, res))

router.put('/playlist/:playlist',  (req, res) => playlistController.modifyOrderMusics(req, res))

router.get('/playlist/:idUser',  (req, res) => playlistController.getAllPlaylists(req, res))

router.get('/ultimaMusica/playlist/:idPlaylist',  (req, res) => playlistController.getLastMusic(req, res))

router.get('/uploads/:file', (req, res)=>{
    res.sendFile(path.join(__dirname, './uploads/'+req.params.file))
})
router.get('/', req, res =>{
    res.json({
        teste:"hello world"
    })
})

app.use('', router)


module.exports = app