const mPlaylist = require('../model/playlist')
const mUser = require('../model/user')
const mMusic = require('../model/music')
var url = require('url');

function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host')
  });
}

function LinkedList(){
    var head = []
    let length =  0
    const Node = (value) => {
        return {
            value,
            next: "",
            back: ""
        }
    }
    const add = (value) =>{
        const newValue = Node(value)
        // console.log(newValue)
        if(head.length == 0){
            head.push(newValue)
            length++
            return head
        }
        let node = head[head.length-1]
        newValue.back = node.value._id
        node.next = newValue.value._id
        head.push(newValue)
        length++
        return newValue
    }
    return {
        length: () => length,
        add: (value) => add(value),
        head: () => head
    }
}

function makeEncadedList(infoPlaylists){
    const playlist = []
    infoPlaylists.forEach((element)=> {
        let encadedList = LinkedList()
        let playlistModel = {      
            _id: element._id,
            title: element.title,
            subtitle: element.subtitle,
            user: element.user,
            music: []
        }

        element.music.forEach((e)=> {
            encadedList.add(e)
        })
        playlistModel.music = encadedList.head()
        playlist.push(playlistModel)

        encadedList = LinkedList()
    })
    return playlist
}

async function returnMusicPlaylist(idPlaylist){
    const music = await mPlaylist
            .findOne({_id : `${idPlaylist}`})
            .populate({
                path:'music'
            }).exec()
    let encadedList = LinkedList()
    music.music.forEach((e)=> {
        encadedList.add(e)
    })
    return encadedList.head()
}

module.exports = {
    addMusicsPlaylist(req, res){
        const musicsAdded = req.files.map(file => {
            const name = file.path.split('\\')
            return {
                title: file.originalname,
                playlist: req.params.playlist,
                file: fullUrl(req)+'/uploads/'+name[1]
            }
        });
        mMusic.create(musicsAdded, (err, small)=>{
            mPlaylist.update({_id: req.params.playlist}, { $push: { music: small } }, { multi: true }, (err, numAffected)=>{
                res.send(numAffected)
            });
        })
    },      

    addMusicsPlaylistFromOtherFile(req, res){
        mMusic.create({
            title: req.body.title,
            playlist: req.params.playlist,
            file: req.body.url
        }, (err, small)=>{
            mPlaylist.update({_id: req.params.playlist}, { $push: { music: small } }, { multi: true }, (err, numAffected)=>{
                res.send(numAffected)
            });
        })
    },

    modifyOrderMusics(req, res){
        const musics = req.body.files.map((element)=>element.value)
        mPlaylist.update({_id: req.params.playlist}, { music: musics }, { multi: true }, async (err, numAffected)=>{
            if(err){
                res.status(404).send({err})
                return
            }
            const musicEncaded = await returnMusicPlaylist(req.params.playlist)
            res.send(musicEncaded)
        });
    },

    async getAllPlaylists(req, res){
        const user = await mUser
            .findOne({_id: `${req.params.idUser}`})
            .populate({
                path:'playlist',
                populate: {
                    path: 'music'
                }
            }).exec()
        const p = {...user}
        const playlist = makeEncadedList(p._doc.playlist)
        res.send(playlist)
    },

    async getLastMusic(req, res){
        const musicEncaded = await returnMusicPlaylist(req.params.idPlaylist)
        res.send(musicEncaded[0])
    }
}