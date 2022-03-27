const mongoose = require('mongoose');//몽구스 불러오기
const saltRounds=10
const Schema = mongoose.Schema;
const Team_info = new mongoose.Schema({
    id : Schema.Types.ObjectId,
    name : String 
  });

  const imageurlSchema = mongoose.Schema({
    url: String
  });

  const dataSchema = mongoose.Schema({
    index : Number,
    label : String,
    width : Number,
    height : Number,
    x : Number,
    y : Number
  });

//스키마 생성창
const projectSchema = mongoose.Schema({
    user_token:{
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
    image : {
        type : imageurlSchema
    }
    })
const Project =mongoose.model('Project',projectSchema)//화려한 모델이 스키마를 감싸네
module.exports={Project}//외부 사용 가능하게