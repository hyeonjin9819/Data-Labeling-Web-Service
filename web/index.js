const dotenv = require('dotenv')
const express = require('express') //express 모듈을 가져오는것
const app = express() // 모듈을 사용해 app을 선언
const nodemailer = require('nodemailer');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require("./models/User");
const {Project} = require("./models/Project")
const {auth}=require("./middleware/auth");

dotenv.config();

const Mongoose_URI = process.env.Mongoose_URI;
const Email = process.env.Email;
const Pass = process.env.Pass;


//web socket연결
// const http = require('http').createServer(app)
// const io = require('socket.io')(http) // http -> app?

// io.on('connection', socket =>{
//   socket.on('message', ({name, message}) => {
//     io.emit('message', {name, message})
//   })
// })



const ejs = require('ejs');
const path = require('path');
var appDir = path.dirname(require.main.filename);

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(cookieParser());


const mongoose = require('mongoose');
const { json } = require('body-parser');
mongoose.connect(Mongoose_URI,  {
 
}) .then(() => console.log('MongoDB Connect()...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  collection.find().toArray((err, items) => {
    console.log(items)
  })
})

app.get('/api/hello', (req, res) => {
  res.send('api Hello')
})

<<<<<<< HEAD
=======
// app.post('/api/users/findemail',(req, res) => {
//   User.findOne({token : req.body.tokens}, (err, users)=> {
//     if(!users) {
//       return res.json ({
//         data : '토큰 '+req.body.tokens,
//         Success : false,
//         message: "제공된 토큰에 해당하는 유저가 없습니다.",
//       })
//     }
//     return res.send({
//       data : '토큰 '+req.body.tokens,
//       Success : true,
//       email : users.email
//           })
//   })
// })

app.post('/api/projects/image',(req,res) => {
  console.log('image req',req.body)
  // _id가 일치하면 업데이트
  // 그렇지 않으면 추가
  Data.findOne({_id:req.body[0]._id},(err, project)=>{
    if(project === null){
      Data.insertMany({
       "_id" : req.body[0]._id,
       "data" : req.body,
       "object" : [null]
       })}
    else{ 
  
    Data.updateOne(
      {_id : req.body[0]._id},
      {$push : {data : {$each: req.body}}
    },(err) => {
      console.log(err)
    }
    )
  }
  })


 
  // Project.findOne({ name: req.body.name},(err, item) => {
  //   if(!item) {
  //     return res.json({
  //       success : false,
  //       message : req.body.name
  //     })
  //   }
  //   item.update({ image : req.body.url } ,(err) => {
  //     if(err) return res.json({
  //       success : false,
  //       message : req.body.url
  //     });
  //     return res.json({
  //       success : true,
  //       message : item
  //     })
  //   })
  // })
})

// 데이터 불러오기 

>>>>>>> jiyoon
app.post('/api/projects/create',(req,res) => {
  // 프로젝트 생성
  const project = new Project(req.body)
  console.log(req.body)
  project.save((err,projectInfo) => {
    if(err) return re.json({success:false, err})
    return res.status(200).json({
      success:true
    })
  })
})

app.post('/api/users/register',(req, res) => {
  // 회원가입할 때 필요한 정보들을 클라이언트에서 가져오면
  // 그것들을 데이터베이스에 저장

  //save 하기 전에 비밀번호 암호화해야하는데 그 전에 몽구스를 이용해야한다 
  const user = new User(req.body)

  user.save((err,userInfo) => {
    if(err) return res.json({success:false, err})
<<<<<<< HEAD
=======
    else {
      Counter.updateOne({name : "memberCount"},{$inc : {totalCount:1}}, (err, count) => {
        if(err){
          return console.log(err);
        } 
       }) 
      }
>>>>>>> jiyoon
    return res.status(200).json({
      success : true
    })
  })
})

<<<<<<< HEAD
app.post('/api/users/findemail',(req, res) => {
  User.findOne({token : req.body.tokens}, (err, users)=> {
    if(!users) {
=======
// users 배열에 내 id가 있는지 확인 후 있으면 목록 가져오기
app.post('/api/projects/data', (req,res) => {
 console.log(req.body.id)
  // 프로젝트 목록 가져오기
  Project.find({"users" : [req.body.id]},(err, project)=> {
console.log("project", project)
   // return res.status(200).json(items)
       if(!project) {
         return res.json ({
         success : false,
         message : "프로젝트 목록을 가져오지 못했다."
       })
     }

    return res.status(200).json({
       success:true,
       message : "프로젝트 가져오기 성공적",
       project : project
     })
   })
})

app.post('/api/users/myinfo',(req, res) => {
  User.findOne({token : req.body.token}, (err, user) => {
    if(!user){
>>>>>>> jiyoon
      return res.json ({
        data : '토큰 '+req.body.tokens,
        Success : false,
        message: "제공된 토큰에 해당하는 유저가 없습니다.",
      })
    }
    return res.send({
      data : '토큰 '+req.body.tokens,
      Success : true,
      email : users.email
          })
  })
})

app.post('/api/users/login',(req, res) => {
    // 1. 요청된 이메일을 데이터베이스에 있는지 확인한다.
    
    User.findOne({ email : req.body.email }, (err, user) => { // 몽고디비에서 제공하는 함수
      if(!user){
      return res.json ({
        loginSuccess : false,
        message: "제공된 이메일애 해당하는 유저가 없습니다."
      })
      }
  
    // 2. 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
  user.comparePassword(req.body.password, (err, isMatch) => {
    if(!isMatch)
     return res.json({loginSuccess:false, message : "비밀번호가 틀렸습니다."})

    // 3. 비밀번호도 동일하다면 유저에 대한 토큰을 생성한다.
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);

      // 토큰을 저장한다. 어디에? 쿠키 혹은 로컬스토리지
      // 쿠키를 하려면 라이브러리 설치 -> express에서 제공되는 쿠크파서가 있음
      res.cookie("x_auth", user.token)
      .status(200)
      .json({loginSuccess: true, userId : user._id})
      })
    }) 
  })
})
//auth route만들기
app.get('/api/users/auth',auth,(req,res)=>{
  res.status(200).json({
    _id:req.user._id,
    isAdmin:req.user.role===0?false:true,//0이면 일반유저
    isAuth:true,
    email:req.user.email,
    name:req.user.name,
    role:req.user.role,
    image:req.user.image
  })
})

app.get('/api/users/logout',auth,(req,res)=>{
  User.findOneAndUpdate({_id:req.user._id},{token:""},(err,user)=>{
    if(err) return res.json({success:false,err});
    return res.status(200).send({
      success:true
    })
  })
})

app.post('/api/users/mail', (req,res)=> {
  let authNum = Math.random().toString().substring(2,6);
  let emailTemplate ;
  ejs.renderFile(appDir+'/template/authMail.ejs', {authCode : authNum}, function (err, data){
    if(err){console.log(err)}
    emailTemplate = data;
  }
  );

  let transporter = nodemailer.createTransport({
    service : 'gmail',
    host : 'stmp.gmail.com',
    port:'587',
    secure : false,
    auth: {
      user : Email,
      pass : Pass
    },
  });

  let mailOption = transporter.sendMail({
    from : 'WebLabeling',
    to : req.body.email,
    subject : '회원가입을 위해 인증번호를 입력해주세요',
    html : emailTemplate,
  });

  transporter.sendMail(mailOption, function(error, info){
    if(error) {
      console.log(error)
    }
  //  console.log("Finish sending email: " + info.response);

    res.send({
      success : true,
      number : authNum
    }
      );
    transporter.close()
  })

})


<<<<<<< HEAD
=======
// 팀원 초대 이메일 보내기
app.post('/api/users/teamMail', (req,res)=> {
let teamNum = Math.random().toString().substring(2,6);
let emailTemplatetwo;
ejs.renderFile(appDir + '/template/teamMail.ejs', {teamCode: teamNum}, function(err,data){
  if(err){console.log(err)}
  emailTemplatetwo = data;
}
);

const transportertwo = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: Email,
    pass: Pass
  }
});

const options = {
  from: Email,
  to: req.body.email,
  subject: "[Web Labling Service] 팀에 초대받았습니다",
  html: emailTemplatetwo
}

transportertwo.sendMail(options, function(err, info){
  if(err){
    console.log(err);
    return;
  }
  console.log("Sent: " + info.response);

  res.send({
    success: true,
    number: teamNum
  }
  );
  transportertwo.close()
})
});


>>>>>>> jiyoon
const port = process.env.PORT || 5000 // 5000번 포트를 백서버로 둔다

app.listen(port, () => { // 5000번에서 이 앱을 실행한다.

  console.log(`Example app listening at http://localhost:${port}`)
})