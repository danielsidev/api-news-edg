const Token = require('../models/database/token.model');
class TokenController{

  saveTokenBlackList(req, res, token, user_id){
    const tokenBlackList = new Token({
      token: token,
      user_id: user_id
    });
        
    tokenBlackList.save().then(tkn => {
      console.log(tkn);
      res.status(201).json({ logout: true, message:'Success Logout' });              
    }).catch(error => res.status(500).json(error));
  }

  getByToken(token){
    return new Promise((resolve, reject)=>{
      Token.find({'token':token}).then(tk => {
        (tk==null || tk =='' || tk == false)?resolve('token free'):reject('token blacklist');     
      })
      .catch(error => reject(error) );
    });

  }
}

module.exports = TokenController