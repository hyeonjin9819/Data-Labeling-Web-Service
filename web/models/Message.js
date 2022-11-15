const mongoose = require('mongoose');
const MessageSchema = mongoose.Schema({
    _id:{
        type: String, // 프로젝트 아이디_데이터 아이디 -> 고유해짐
    },
    project_id:{
        type: Number,
    },
    data_id:{
        type: String, // 데이터 아이디
    },
    message: [
        {
            _id: String,
            message: String,
            user_name : String,
        }
    ]
})


const Message = mongoose.model('Message', MessageSchema)

module.exports = {Message}