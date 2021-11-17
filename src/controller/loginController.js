const mUser = require('../model/user')
const mPlaylist = require('../model/playlist')
const hex = require('amrhextotext')

function createPlaylists(user_id){
    const feelings = ['Triste', 'Feliz', 'Raiva', 'Angustia']
    const playlist = []

    feelings.forEach((feel)=>{
        const item = new mPlaylist({
            title: feel,
            subtitle: `Organize suas musicas`,
            user: user_id
        })
        playlist.push(item)
        item.save()
    })
    
    return playlist
}

module.exports = {
    createLogin(req, res){
        try{
            const User = new mUser({...req.body})
            if(User.senha !="" && User.login !="") {
                User.encriptPassword()
                const playlists = createPlaylists(User._id)
                User.playlist = playlists
                User.save(function(err){
                    if(err){
                        res.json({ msg: 'Login já existe', resp: err})
                        return
                    } 
                    res.json({ msg: 'Login cadastrado', resp: User})
                })
            }else{
                res.json({ 'Não foi possivel cadastrar Login': msg, resp: User})
            }
        }catch(e){
            console.log(e)
            res.json({msg: "error ao cadastrar login", resp: e})
        }
        
    },

    async validateLogin(req, res){
        try{
            const user = await mUser
                .findOne({login: req.query.login, password: hex.textToHex(req.query.password)})
                .exec()
            
            if(user){
                res.send({msg: 'Login efetuado com sucesso', resp: user})
            }else{
                res.send({msg:'Login ou Senha não achados', resp: null})
            }
            
        }catch(e){
            res.json({msg: "error ao cadastrar login", resp: e})
        }
    },
}
