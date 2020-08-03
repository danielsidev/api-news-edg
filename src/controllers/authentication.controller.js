const jwt = require('jsonwebtoken');
const TokenController = require('./token.controller');
class AuthenticationController {
  constructor(){
    this.tokenBlack = new TokenController();
  }

  verify_sync(token){
    if (!token) return false;
      
    let decoded = jwt.verify(token, process.env.APP_SECRET);
    return decoded;
  }
   verify(req, res, next){
    let bearerHeader = req.headers['authorization']
    if (!bearerHeader) return res.status(401).json({ auth: false, message: 'No token provided.' });
      
    let bearer = bearerHeader.split(" ");
    let bearerToken = bearer[1];
    let tokenBlack = new TokenController();
        tokenBlack.getByToken(bearerToken).then((response)=>{
          if(response=="token free"){
            jwt.verify(bearerToken, process.env.APP_SECRET, function(err, decoded) {
              if (err) return res.status(401).json({ auth: false, message: 'Authenticate token fail. Token invalid or expired!' });
              req.userId = decoded;
              next();
            });
          }else{
            return res.status(400).json({ auth: false,message: 'Authenticate token fail. Token invalid!' });
          }

        }).catch((err)=>{return res.status(401).json({ auth: false, err:err,message: 'Authenticate token fail. Token invalid!' }); });    
  }  
  sign(id, time_seconds){
    let token = jwt.sign({ data:id }, process.env.APP_SECRET, {
      expiresIn: time_seconds
    });     
    return token;
  }
}
module.exports = AuthenticationController
