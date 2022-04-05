const mongoose = require('mongoose');//몽구스 불러오기
const saltRounds=10
const Schema = mongoose.Schema;

const counterSchema =  mongoose.Schema({
    name:{
        type: String
    },
    totalCount : {
        type : Number
    }
    })

const Counter = mongoose.model('Counter', counterSchema)//화려한 모델이 스키마를 감싸

module.exports={Counter}//외부 사용 가능하게