const mongoose = require('mongoose');//몽구스 불러오기
const saltRounds=10

//스키마 생성창
const teamSchema = mongoose.Schema({
    _id : {
      type:Number
    },
    users:[],
    owner : Number,
    name:{
        type:String,
        maxlength:50
    },
    date:{
        type:String,
        maxlength:50
    },
    info:{
        type:String,
        maxlength:500
    },
    inviteNum:{
        type:Number
    }
    })

     

const Team =mongoose.model('Team',teamSchema)//화려한 모델이 스키마를 감싸네
module.exports={Team}//외부 사용 가능하게