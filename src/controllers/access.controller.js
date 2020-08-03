const Crypto          = require("../models/crypto");
const User            = require('../models/database/user.model');
const AuthenticationController  = require('./authentication.controller');
const TokenController = require('./token.controller');

class AccessController{
    constructor(){
        this.authentication = new AuthenticationController();
        this.crypto         = new Crypto();
        this.tokenBlack     = new TokenController();
    }


    login(req, res){
        if(req && req.body){
            User.find({email:req.body.email, password:this.crypto.encrypt(req.body.password) })
            .then(user => {
                if(user && user.length>0){
                    console.log(JSON.stringify(user))
                    let token = this.authentication.sign(user[0]["_id"], 3600);     
                    res.status(200).send({ auth: true, token: token, message:'Valid Login' });
                }else{
                    res.status(200).send({ auth: false, token: null , message:'Invalid Login'});
                }
            })
            .catch(error => {
                console.log(error);
                res.status(422).send({ auth: false, token: null , message:'Invalid Login'});
            });
        }else{
            res.status(422).send({ auth: false, token: null , message:'Invalid Login'});
        }
    }

    logout(req, res){
        let token = req.headers['x-access-token'];
        let user = this.authentication.verify_sync(token);
        if(user && user.data){
            User.findById({ _id: user.data })
                .then(user => {
                    if(user){
                        this.tokenBlack.saveTokenBlackList(req, res, token, user["_id"]);
                    }else{
                        res.status(200).send({ logout: false , message:'Error Logout'});
                    }
                })
                .catch(error => {
                    console.log(error);
                    res.status(422).send('Invalid Logout!');
                });
        }else{
            console.log(JSON.stringify(id));
            res.status(422).send('Invalid Logout!');
        }
        
    }
}

module.exports = AccessController