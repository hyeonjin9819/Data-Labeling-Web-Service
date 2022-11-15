const mongoose = require('mongoose');//몽구스 불러오기
const saltRounds=10
const Schema = mongoose.Schema;


const DataSchema =  mongoose.Schema({
    _id : {
        type : Number,
    },
    data : [
        {   _id : Number, 
            project_id: Number,
            name: String,
            label : String, 
            width : Number,
            height : Number,
            x : Number,
            y: Number,
            state : Boolean,
            ing: String,
            data_id: Number,
        }
    ],
    auto_data : [
        {   _id : Number, 
            project_id: Number,
            name: String,
            ing: String,
        }
    ],
    object : [],
});

const Data = mongoose.model('Data', DataSchema)//화려한 모델이 스키마를 감싸

module.exports={Data}//외부 사용 가능하게