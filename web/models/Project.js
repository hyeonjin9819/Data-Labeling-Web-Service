const mongoose = require('mongoose');//몽구스 불러오기
const saltRounds=10
const Schema = mongoose.Schema;
const Team_info = new mongoose.Schema({
    id : Schema.Types.ObjectId,
    name : String 
  });

  const dataSchema = mongoose.Schema({
    index : Number,
    label : String,
    width : Number,
    height : Number,
    x : Number,
    y : Number
  });

  const imageurlSchema = mongoose.Schema({
    url: String,
    data: dataSchema
  });

//스키마 생성창
const projectSchema =  mongoose.Schema({
    _id : {
      type : Number,
    },
    users : [{
        _id : Number,
        todo : []
    }],
    // user_token:{
    //     type: String
    // },
    owner : {
        type : Number
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
    date:{
        type:String,
        maxlength:50
    }
   ,
    info:{
        type:String,
        maxlength:500
    },
    notice : {
      type : String,
  
    }
    // imageHistory:[String]
    // image : {
    //     type : [imageurlSchema],
    //     data : [dataSchema]
    // }
    //image: {imageurlSchema}
    })

const Project = mongoose.model('Project',projectSchema)//화려한 모델이 스키마를 감싸네
//const Img = mongoose.model('Img',imageurlSchema)//화려한 모델이 스키마를 감싸네
//const Data = mongoose.model('Data',dataSchema)

module.exports={Project}//외부 사용 가능하게