const mongoose = require('mongoose');//몽구스 불러오기
const { User } = require('./User');
const saltRounds=10

//스키마 생성창
const projectSchema = mongoose.Schema({
    user_email:{
        type: String
    },
    id : {
      type:Number
    },
    name:{
        type:String,
        maxlength:50
    },
    category : {
        type:String,
        maxlength:50
    },
    upload: {
        type:String,
        maxlength:50
    },
    tool:{
        type:String,
        maxlength:50
    },
    date:{
        type:String,
        maxlength:50
    }
   ,
    info:{
        type:String,
        maxlength:500
    },
    })

     

const Project =mongoose.model('Project',projectSchema)//화려한 모델이 스키마를 감싸네
module.exports={Project}//외부 사용 가능하게