const mongoose = require('mongoose');//몽구스 불러오기
const bcrypt = require('bcrypt');
const saltRounds=10
const jwt = require('jsonwebtoken');
const {autoIncrement} = require( "mongoose-auto-increment");

//스키마 생성창
const userSchema = mongoose.Schema({
    id : {
        type : Number, 
        default : 0
    },
    // id : {
    //     type: Number,
    // },
    name:{
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        maxlength:500
    },
    role:{
        type:Number,
        default:0
    },
    profile: String,
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    }
})
//저장하기전에 수행할 일 
userSchema.pre('save',function(next){
    var user=this;
    //비밀변호가 변경되는경우
    if(user.isModified('password')){
        //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                user.password=hash
                next()
            });
        });
    }else{
        next()
    }
})

userSchema.methods.comparePassword= function(plainPassword,cb){
    //평문 비밀번호와 데이터베이스에 있는 암호화된 비밀번호 같은지 체크
    //평문도 암호화 해서 비교해봐야한다
    bcrypt.compare(plainPassword,this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    })
}

userSchema.methods.generateToken= function(cb){
    var user=this;
    
    //jsonwebtoken을 이용해서 token 생성하기
    var token = jwt.sign(user._id.toHexString(),'secretToken');
    
    user.token=token;
    user.save(function(err,user){
        if(err)return cb(err)
        cb(null,user)
    })
}

userSchema.statics.findByToken=function(token,cb){
    var user=this;
    //token을 decode 한다
    jwt.verify(token,'secretToken',function(err,decoded){
       //유저 id를 이용해서 유저를 찾은후 client에서 가져온 토큰과 
       //DB에 보관된 token이 일치하는지 확인 
       user.findOne({"_id":decoded,"token":token},function(err,user){
           if(err) return cb(err);
           cb(null,user);
       }) 
    })
}


const User =mongoose.model('User',userSchema)//화려한 모델이 스키마를 감싸네
module.exports={User}//외부 사용 가능하게