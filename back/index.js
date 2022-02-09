import express from "express"
import cors from "cors"
import mongoose from "mongoose"


const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/UserDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () =>{
    console.log("DB connected")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)


//Routes

//로그인 부분
app.post("/SignIn", (req,res)=>{
    const{email, password} = req.body
    User.findOne({email: email}, (err,user)=>{
        if(user){ // 입력한 이메일이 디비에 있으면
            if(password === user.password){ // 디비에 있는 이메일과 비밀번호가 일치하면 성공
                res.send({message:"로그인 완료",user:user})
            }else{ // 실패하면 실패 메시지 출력
                res.send({message:"비밀번호가 일치하지 않습니다",user:user})
            }
        }else{ // 입력한 이메일이 디비에 없으면
            res.send({message: "가입되지 않은 회원입니다"})
        }
    })
})

// 회원가입 부분
app.post("/SignUp", (req,res)=>{
    const{name, email, password} = req.body
    User.findOne({email: email}, (err, user)=>{
        // DB 내에 같은 이메일이 존재하면 에러
        if(user){
            res.send({message: "이미 가입된 이메일입니다"})
        } else{ // 새로운 이메일 이면
            const user = new User({
                name,
                email,
                password
            })
            // 실패 시 에러 메시지 전송, 성공시 회원가입 성공 메세지 뜸
            user.save(err =>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message: "회원가입 완료! 로그인을 해주세요"})
                }
            })
        }
    })
    
})

app.listen(9007,() => {
    console.log("BE started at port 9007")
})