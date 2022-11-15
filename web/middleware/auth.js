const { User } = require("../models/User");

let auth = (req, res, next) => {
     //1.client cookie에서 token을 가져온다.(cookie parser 이용)
     let token =req.cookies.x_auth;
     //2.token을 복호화 해서 유저ID를 찾는다.
     User.findByToken(token,(err,user)=>{
         if(err) throw err;
         if(!user)return res.json({isAuth:false,error:true})
 
         req.token=token;
         req.user=user;
         next();
     })
     //3.유저가 존재하는경우 인증 O / 없는 경우 X 
}

module.exports = {auth};