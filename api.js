var app = require('./server.js')
var { loginController, playlistController} = require('./controller')
var multer = require('multer'); 
var path = require('path'); 
  
var upload = multer({ dest: './uploads/',
    rename: function (fieldname, filename) {
        return fieldname + '-' + Date.now();
    },  
})

app.get('/login',  (req, res) => loginController.validateLogin(req, res))

app.post('/login',  (req, res) => loginController.createLogin(req, res))

app.post('/playlist/:playlist',  upload.array("file"), (req, res) => playlistController.addMusicsPlaylist(req, res))

app.post('/playlist/url/:playlist', (req, res) => playlistController.addMusicsPlaylistFromOtherFile(req, res))

app.put('/playlist/:playlist',  (req, res) => playlistController.modifyOrderMusics(req, res))

app.get('/playlist/:idUser',  (req, res) => playlistController.getAllPlaylists(req, res))

app.get('/ultimaMusica/playlist/:idPlaylist',  (req, res) => playlistController.getLastMusic(req, res))

app.get('/uploads/:file', (req, res)=>{
    res.sendFile(path.join(__dirname, './uploads/'+req.params.file))
})

module.exports = app