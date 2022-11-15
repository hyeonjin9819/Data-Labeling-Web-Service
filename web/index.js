const  convert = require( "./convert");
const dotenv = require('dotenv')
const AWS=  require( 'aws-sdk');
const express = require('express') //express 모듈을 가져오는것
const app = express() // 모듈을 사용해 app을 선언
const nodemailer = require('nodemailer');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require("./models/User");
const {Project} = require("./models/Project")
const {Team} = require("./models/Team")
const {auth}=require("./middleware/auth");
const {Counter} = require("./models/Counter");
const {Data} = require("./models/data")
const {Message} = require("./models/Message");
const fs = require('fs');
const {spawn} = require('child_process');
//const {jsonToCSV, csvToJSON} = require("./convert.js");

dotenv.config();
const ACCESS_KEY = process.env.REACT_APP_GITHUB_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_GITHUB_SECRET_ACCESS_KEY;
const REGION = process.env.REACT_APP_REGION;
const S3_BUCKET = process.env.REACT_APP_GITHUB_S3_BUCKET ;
const Mongoose_URI = process.env.REACT_APP_GITHUB_Mongoose_URI;
const Email = process.env.REACT_APP_GITHUB_Email;
const Pass = process.env.REACT_APP_GITHUB_Pass;
const ejs = require('ejs');
const path = require('path');
var appDir = path.dirname(require.main.filename);

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET},
  region: REGION,
});

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(express.json());
app.use(cookieParser());

const mongoose = require('mongoose');
const { json } = require('body-parser');
const { response } = require('express');
mongoose.connect(Mongoose_URI,  {
 
}) .then(() => 
  console.log('MongoDB Connect()...'))
  .catch(err => console.log(err))

app.post('/api/python', (req, res) => {
    let dataToSend;
    console.log('값 전달', req.body.index)
    console.log('값 전달', req.body.data)
    console.log(req.body.index)
    let number = []
    req.body.index.map(i=>
      number.push(Number(i)) 
      )
    console.log('인덱스 확인', number)

    const python = spawn('python', ['./testyolo/yolov5/y_callDetect.py', encodeURI(req.body.data), 'detectResult', req.body.projectId, [req.body.index]]);
    python.stderr.on('data', function(data) {
      console.log(data.toString());
  });
  python.on('close', (code) => {
    console.log("디텍팅 완료")
    //console.log(res)
    console.log(code)
    const python2 = spawn('python', ['./testyolo/S3UpDownLoader/y_call_S3Uploader.py'])
    python2.on('close', (code) => {
      console.log("업로드 완료")
      res.send(`<script>alert('success')</script>`);
    })



  })
})

// 프로젝트 생성자 뽑아오기
app.post('/api/project/owner', (req, res) => {
  Project.find({_id : req.body.id},{_id : 0, owner:1, notice : 1}, (err, project) => {
    if(err) {console.log(err)}
    else {
        return res.status(200).json({
        success : true,
        project_owner : project[0].owner,
        project_notice : project[0].notice
    })
  }
})
})

// 프로젝트 공지사항 저장
app.post('/api/project/notice', (req, res) => {
  Project.updateOne({_id : req.body.id},{$set:{notice : req.body.notice}}, (err, notice) => {
    if(err) {console.log(err)}
    else {
       return res.status(200).json({
       success : true,
   })
  }
})
})

// app.post('/api/project/notice_view', (req, res) => {
//   Project.findOne({_id : req.body.id},{_id : 0, notice:1}, (err, notice) => {
//     if(err) {console.log(err)}
//     else {
//        return res.status(200).json({
//        success : true,
//         notice : notice
//    })
//   }
// })
// })


// 프로젝트 유저 뽑아오기
app.post('/api/project/member', (req, res) => {
  // 프로젝트 문서에서 USER들을 다 뽑아온 뒤 그 그 값을 포함하는 USER들을 담아 보내준다.
  Project.find({_id : req.body.id},{_id : 0, users:1}, (err, members) => {
    if(err) {console.log(err)}
    else {
      User.find({id: {$in: members[0].users}},(err,project_users) => {
        return res.status(200).json({
        success : true,
        project_users : project_users 
        })
    })
  }
})
})

// data마다 진행 중 혹은 완료 인 값을 가진 데이터의 개수를 반환
app.post('/api/project/chart', (req, res) => {
  Data.find({_id :Number(req.body.id)},{_id : 0, "data.ing": 1, "auto_data.ing" : 1}, (err, chart) => {
    if(err) console.log(err)
    else {
      return res.status(200).json({
        success : true,
        chart : chart 
        })
    }
  })
})

app.post('/api/datatxt', (req ,res) => {

  const json_data = req.body.entries;
   // 2. jsonToCSV 함수 호출: json을 csv로 변환 
 //  const csv_string = jsonToCSV(json_data); // 
 const csv_string = convert.jsonToCSV(json_data)
 //  3. 결과 확인 
 console.log('슏ㅎㅇ에소 csv'+csv_string);

  const params = {
    ACL: 'public-read',
    Body: csv_string,
    Bucket: S3_BUCKET,
   // Key: "Data"+req.body._id+"/"+req.body.imageId+'.txt'
   // req.body._id -> 프로젝트 이름으로 바뀜
   Key: req.body.label+"/"+req.body.projectId+"/labels/"+req.body.imageId+'.csv'
  };

  myBucket.putObject(params)  
  .send((err,nn) => {
    if (err) {console.log(err); return err}
  })
  console.log('bbf', req.body.object);
      Data.update({"_id" : req.body._id},{object: req.body.object},(err) => {
        if(err){
          return res.json({
            Success : false,
            message : " 객체 추가 실패",
        })
        }
        else {
          return res.status(200).json({
            Success : true,
            message : "썽공",
        })
       
        }})

  console.log('Item: %o', req.body);
  console.log(req.toString()+'aa')
  console.log("파일 생성기")
})


app.post('/api/data/draw', (req ,res) => {
  const s3 = new AWS.S3({ accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_ACCESS_KEY });
    const idx = req.body.idx // project id
    const imageId = req.body.imageId

    var params = {Bucket: S3_BUCKET, Key : req.body.label+"/"+req.body.projectId+'/labels/'+imageId+'.csv'};
      // Key: 'Data'+idx+'/'+imageId+'.txt'}; 
    s3.getObject(params, function(err, data) {
       if (err) { console.log(err, err.stack)
        // an error occurred 
      } else { 
        //const datas = fs.readFileSync(data,{encoding:'utf8', flag : 'r'})
        console.log('data_Body', data.Body)
        const datas=  data.Body.toString('utf8')
        console.log(typeof datas+'l'); // successful response 
        // 3. JSON으로 변환 
        
        const arr_json = convert.csvToJSON(datas); 
        // 4. JSON을 문자열로 변환
        console.log('arr', arr_json)
        var newArray = arr_json.filter((item) => item.id !=='');
         const string_json = JSON.stringify(newArray);
         console.log('json', string_json)
        res.json({success : true, datas:string_json})
      } });
})

app.post('/api/projects/image',(req,res) => {
  console.log('image req',req.body)
  // _id가 일치하면 업데이트
  // 그렇지 않으면 추가
  Data.findOne({_id:req.body[0].project_id},(err, project)=>{
    if(project === null){ 
      Counter.findOne({name : "dataCount"},(err, count)=> {
        if(!err){
        for(let i = 0; i< Object.keys(req.body).length;   i++){
        req.body[i]._id = count.totalCount + 1
        }
      }
      // 프로젝트가 없는데 manual 이면
      if(req.body[0].labels == "manual"){
        Data.insertMany({
          "_id" : req.body[0].project_id,
          "data" : req.body,
          "object" : [null],
          },(err, success) => {
            if(err) return res.json({success:false, err})
            else {
              console.log('12345',req.body)
              Counter.updateOne({name : "dataCount"},{$inc : {totalCount:1}}, (err, count) => {
                if(err){
                  return console.log(err);
                } else {
                return res.status(200).json({
                  success:true
                })
              }
              }) 
            }
          })
        }
          else { //프로젝트가 없는데 manual 아닐 때
            Data.insertMany({
          "_id" : req.body[0].project_id,
        //  "data" : [null],
           "object" : [null],
          "auto_data" : req.body,
          },(err, success) => {
            if(err) return res.json({success:false, err})
            else {
              console.log('12345',req.body)
              Counter.updateOne({name : "dataCount"},{$inc : {totalCount:1}}, (err, count) => {
                if(err){
                  return console.log(err);
                } else {
                return res.status(200).json({
                  success:true
                })
              }
              }) 
            }
          })
          }
          
        })
  }

    else{ // 이미 프로젝트가 존재할 때
      // id  
      Counter.findOne({name : "dataCount"},(err, count)=> {
        if(!err){
        for(let i = 0; i< Object.keys(req.body).length;   i++){
        req.body[i]._id = count.totalCount + 1
        }
      }
      if(req.body[0].labels === "manual"){
        Data.updateOne(
          {_id : req.body[0].project_id},
          {$push : {data : {$each: req.body}}
         },(err,data) => {
           if (err) {return console.log(err)}
           else {
            Counter.updateOne({name : "dataCount"},{$inc : {totalCount:1}}, (err, count) => {
              if(err){
                return console.log(err);
              } else {
              return res.status(200).json({
                success:true
              })
            }
            }) 
           }
          }
          )
      }
      else {
        Data.updateOne(
        {_id : req.body[0].project_id},
       {$push : {auto_data : {$each: req.body}}
       },(err,data) => {
         if (err) {return console.log(err)}
         else {
          Counter.updateOne({name : "dataCount"},{$inc : {totalCount:1}}, (err, count) => {
            if(err){
              return console.log(err);
            } else {
            return res.status(200).json({
              success:true
            })
          }
          }) 
         }
        }
        )
      }
      })
  }
})

})

// 데이터 불러오기 
app.post('/api/projects/create',(req,res) => {
  // 프로젝트 생성
  Counter.findOne({name : "projectCount"},(err, count)=> {
    req.body._id = count.totalCount + 1
 
  const project = new Project(req.body)
  console.log('프로젝트 생성 '+req.body)
  project.save((err,projectInfo) => {
    if(err) return res.json({success:false, err})
    else {
      Counter.updateOne({name : "projectCount"},{$inc : {totalCount:1}}, (err, count) => {
        if(err){
          return console.log(err);
        } 
       
      }) 
    }
    return res.status(200).json({
      success:true
    })
  })
})
})

app.post('/api/team/create',(req,res) => {
  // team 생성

  Counter.findOne({name : "teamCount"},(err, count)=> {
    req.body._id = count.totalCount + 1
 
  const team = new Team(req.body)
  console.log(req.body)
  team.save((err,projectInfo) => {
    if(err) return res.json({success:false, err})
    else {
      Counter.updateOne({name : "teamCount"},{$inc : {totalCount:1}}, (err, count) => {
        if(err){
          return console.log(err);
        } 
      }) 
    }
    return res.status(200).json({
      success:true
    })
  })
})
})

app.post('/api/team/memberlist',(req,res) => {
  // team id 값
  // memberlist
  Team.findOne({_id : req.body._id }, (err, count)=> {
 // console.log('팀 유저', count.users)
  User.find({id: {$in: count.users}},(err,teamlist) => {
    console.log('팀 유저 Users 컬렉션', teamlist)
    if(err) return res.json({success:false, err})
    else {
      return res.status(200).json({
        success:true,
        teamlist : teamlist
        })
      }
    })
  })
})

app.post('/api/users/register',(req, res) => {
  // 회원가입할 때 필요한 정보들을 클라이언트에서 가져오면
  // 그것들을 데이터베이스에 저장
  //save 하기 전에 비밀번호 암호화해야하는데 그 전에 몽구스를 이용해야한다 
  Counter.findOne({name : "memberCount"},(err, count)=> {
    req.body.id = count.totalCount+1
    const user = new User(req.body)
    user.save((err,userInfo) => {
    if(err) return res.json({success:false, err})
    else {
      Counter.updateOne({name : "memberCount"},{$inc : {totalCount:1}}, (err, count) => {
        if(err){
          return console.log(err);
        } 
       }) 
      }
    return res.status(200).json({
      success : true
      })
    })
  })
})

// users 배열에 내 id가 있는지 확인 후 있으면 목록 가져오기
app.post('/api/projects/data', (req,res) => {
 console.log(req.body.id)
  // 프로젝트 목록 가져오기
  Project.find({"users._id" :{$all : [req.body.id]}},(err, project)=> {
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

// users 배열에 내 id가 있는지 확인 후 있으면 목록 가져오기
app.post('/api/team/data', (req,res) => {
  console.log(req.body.id)
   // 프로젝트 목록 가져오기
   Team.find({users :{$all : [req.body.id]}},(err, team)=> {
 console.log("team", team)
    // return res.status(200).json(items)
        if(!team) {
          return res.json ({
          success : false,
          message : "팀 목록을 가져오지 못했다."  
        })
      }
 
     return res.status(200).json({
        success:true,
        message :"팀 가져오기 성공적",
        team : team
      })
    })
 })

app.post('/api/users/myinfo',(req, res) => {
  User.findOne({token : req.body.token}, (err, user) => {
    if(!user){
      return res.json ({
        Success : false,
        message: "토큰에 해당하는 회원이 없다."
      })
    }
  return res.status(200).json({
      Success : true,
      email : user.email,
      name : user.name,
      profile : user.profile,
      id : user.id
  })
  })
})

app.post('/api/projects/imagelist',(req, res) => {
  Data.findOne({_id : req.body._id}, (err, imagelist) => {
    if(!imagelist){
      return res.json ({
        Success : false,
        message: "토큰에 해당하는 회원이 없다."
      })
    }
    
    else{
       if(req.body.label == 'manual'){
          return res.status(200).json({
         Success : true,
        imagelist : imagelist.data,
        imageobject : imagelist.object
      })
     }
       else {
         return res.status(200).json({
        Success : true,
        imagelist : imagelist.auto_data,
        imageobject : imagelist.object
      })
    }   
    }
  })
})

app.post('/api/team/code_chk',(req, res) => {
  Team.findOne({inviteNum : req.body.Number}, (err, team_number) => {
    if(!team_number){
      return res.json ({
        Success : false,
        message: "일치하는 초대 번호 없음"
      })
    }
    // users에 내 아이디 값 삽입 
    else{
      Team.update({"inviteNum" : req.body.Number},{ $push: { users:req.body.id  } },(err) => {
        if(err){
          return res.json({
            Success : false,
            message : " 팀원 초대 추가 실패",
        })
        }
        else {
          return res.status(200).json({
            Success : true,
            message : "썽공",
            id :  req.body.id
        })
        }
      })
}})
})

// 프로젝트 배정
// 프로젝트들의 _id와 구성원들 id
app.post('/api/projects/insertmember',(req,res) => {
  Project.updateMany({"_id" : {$in : req.body.pro_id}},{ $addToSet: {"users" : req.body.user_id}},(err, count)=> {
    if(!count){
      return res.json ({
        success : false,
        message: "프로젝트 배정 실패"
      })
    }
    else res.status(200).json( {
      success : true,
      message: "프로젝트 배정 성공"
    })
})
})

app.post('/api/team/number',(req, res) => {
  Team.findOne({_id : req.body._id}, (err, team_number) => {
    if(!team_number){
      return res.json ({
        Success : false,
        message: "초대코드 못 찾아옴"
      })
    }
  return res.status(200).json({
      Success : true,
      number : team_number.inviteNum
   })
  })
})

app.post('/api/users/profilechange', (req, res) => {
  
  let query = {token : req.body.token}
  let value = {$set: {profile : req.body.profile}}
  User.updateMany(query, value,(err, result) => {
    if(!result) {
      return res.json ({
        Success : false,
        message: "사진 변경 실패."
      })
    } 
    return res.status(200).json({
      Success : true,
      message : req.body.token
  })
  })
})

app.post('/api/projects/showMs', (req, res) => {
  Message.findOne({_id: req.body.key}, (err, document)=>{
    if(!document) {
      console.log(err)
    }
    return res.send({Success : true, message: document});
  })
})

app.post('/api/overview/todolist', (req, res) => {
  console.log(JSON.stringify(req.body)) //  {$push : {data : {$each: req.body}}
  Project.updateOne({_id: req.body.id , "users._id" : Number(req.body.Id)}, {$addToSet : {"users.$.todo" :{$each :req.body.todo}}}, (err, document)=>{
  if(!document) {
     console.log(err)
  }
  else {
     console.log('')
  }
  })
})

app.post('/api/overview/todo_delete', (req, res) => {
  Project.updateOne({_id: req.body.id , "users._id" : Number(req.body.Id)}, {$pullAll : {"users.$.todo" :req.body.todo}}, (err, document)=>{
    if(!document) {
       console.log(err)
    }
    else {
       console.log(req.body.todo)
    }
    })
})

app.post('/api/overview/todoview', (req, res) => {
  Project.find({$and : [{_id: req.body.id },{ "users._id" : req.body.Id}]}, (err, document)=>{
    if(!document) {
      console.log(err)
    }
    return res.status(200).json({
      Success : true,
      document : document
  })
  })
})



// 진행사항 빼오기
app.post('/api/projects/showIng', (req, res) => {
  Message.findOne({_id: req.body.key}, (err, document) => {
    if(!document){
      console.log(err)
    }
    return res.send({Success: true, message: document});
  })
})

app.post('/api/projects/createMs', (req,res)=>{ 
  Message.findOne({_id: req.body.key}, (err, document) => {
    if(!document){
      const message = new Message({
        _id: req.body.key, // 프로젝트 아이디 _ 데이터 아이디
        project_id : req.body.idx, // 프로젝트 아이디
        data_id : req.body.data_id, // 데이터 아이디
        message : req.body
      })

      message.save((err) => {
        if(err) return console.log(err)
      })
    }else{
      console.log(req.body)
      Message.findOneAndUpdate({_id: req.body.key}, {$push : {message : req.body}},
      (err) => {
        if(err)
          console.log("Err : "+err)
      }
      )
    }
  })
})


app.post('/api/users/namechange', (req, res) => {
  let query = {email : req.body.email}

  let value = {$set: {name : req.body.name}}
  User.updateMany(query, value,(err, result) => {
    if(!result) {
      return res.json ({
        Success : false,
        message: "이름 변경 실패."
      })
    } 
    return res.status(200).json({
      Success : true
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

// 코드 입력 -> DB에 있는 팀 목록 중에 invite_num을 찾아 동일한 것이 있다면
// users 목록에 내 id값을 넣어준다.


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

    res.send({
      success : true,
      number : authNum
    }
      );
    transporter.close()
  })

})

// 팀원 초대 이메일 보내기
app.post('/api/users/teamMail', (req,res)=> {
  let teamNum = req.body.Number
  let emailTemplatetwo;
  ejs.renderFile(appDir + '/template/teamMail.ejs',{teamcode: teamNum}, function(err,data){
    if(err){console.log(err)}
    emailTemplatetwo = data;
  }
  );
  
  const transportertwo = nodemailer.createTransport({
    service: 'gmail',
    host : 'stmp.gmail.com',
    port:'465',
    secure: true,
    auth: {
      user: Email,
      pass: Pass
    }
  });
  
  const options = {
    from: Email,
    to: req.body.email,
    //to: "loop3458@naver.com",
    subject: "[Web Labling Service] 팀에 초대받았습니다",
    //html: emailTemplatetwo
    text: `${teamNum}`
  }
  
  transportertwo.sendMail(options, function(err, info){
    if(err){
      console.log(err);
      return;
    }
    console.log("Sent: " + info.response);
    res.send({
      success: true,
      //number: teamNum
    }
    );
    transportertwo.close()
  })
  });

// 커밋 완료 저장 누를 시 팀원에게 이메일 보내기
app.post('/api/users/submitMail', (req, res) => {
  // 필요한거: 작성자, 어떤 프로젝트에 메시지가 올라왔는지, 메시지 내용? 받는사람: 팀원
  let emailTemplateSubmit;
  ejs.renderFile(appDir + '/template/submitMail.ejs', function(err, data){
    if(err){console.log(err)}
    emailTemplateSubmit = data;
  }
  );

  const templateSubmit = nodemailer.createTransport({
    service: 'gmail',
    host: 'stmp.gmail.com',
    port: '465',
    secure: true,
    auth: {
      user: Email,
      pass: Pass
    }
  });

  const options = {
    from: Email,
    //to: ,  // 팀에 들어있는 모든 인원
    subject: "[Web Labeling Service] 새로운 커밋 메시지가 있습니다.",
    html: emailTemplateSubmit,
  }

  templateSubmit.sendMail(options, function(err, info){
    if(err){
      console.log(err);
      return;
    }
    console.log("Send: " + info.response);
    res.send({
      success: true,
    });
    templateSubmit.close()
  })
});

// 팀원 초대 이메일 보내기
app.post('/api/users/teamMail', (req,res)=> {
  //let teamNum = Math.random().toString().substring(2,6);
  let teamNum = req.body.Number
  let emailTemplatetwo;
  ejs.renderFile(appDir + '/template/teamMail.ejs',{teamcode: teamNum}, function(err,data){
    if(err){console.log(err)}
    emailTemplatetwo = data;
  }
  );
  
  const transportertwo = nodemailer.createTransport({
    service: 'gmail',
    host : 'stmp.gmail.com',
    port:'465',
    secure: true,
    auth: {
      user: Email,
      pass: Pass
    }
  });
  
  const options = {
    from: Email,
    to: req.body.email,
    //to: "loop3458@naver.com",
    subject: "[Web Labling Service] 팀에 초대받았습니다",
    //html: emailTemplatetwo
    text: `${teamNum}`
  }
  
  transportertwo.sendMail(options, function(err, info){
    if(err){
      console.log(err);
      return;
    }
    console.log("Sent: " + info.response);
    res.send({
      success: true,
      //number: teamNum
    }
    );
    transportertwo.close()
  })
  });


  // 상태 바꾸는 API
app.post('/api/datas/ingUpdate', (req,res)=> {  
  // 수동
  if(req.body.label == 'manual'){
    Data.update({_id: req.body.idx , "data.name": req.body.data_id} , {$set: {"data.$.ing": "작업 완료"}}, (err) => {
      if(err) console.log("fuck")
    })

    //자동
  }else{
    Data.update({_id: req.body.idx , "auto_data.name": req.body.data_id} , {$set: {"auto_data.$.ing": "작업 완료"}}, (err) => {
      if(err) console.log("errw")
    })
}});

// 사진 삭제 
app.post('/api/data/delete',(req,res) => {
  // _id 값 즉, 프로젝트 번호
  const csv_params = {
    Bucket: S3_BUCKET,
    Key: req.body.label+"/"+req.body.projectId+"/labels/"+req.body.name+'.csv'
  };
  const img_params = {
    Bucket: S3_BUCKET,
    Key: req.body.label+"/"+req.body.projectId+"/"+req.body.name+'.jpeg'
  };
  if(req.body.label == 'manual'){
    Data.updateOne({_id: req.body._id , "data.name": req.body.name},{"$pull": {'data': {'name':req.body.name }}}, (err) => {
      if(err) console.log("manual 삭제X")
      else {
        myBucket.deleteObject(csv_params, function(err, data){
          if(err) console(err)
        })
        myBucket.deleteObject(img_params, function(err, data){
          if(err) console(err)
        })
      }
    })
 }

else {
  console.log("aaaaa", req.body)
  Data.deleteMany({_id: req.body._id , "auto_data.name": req.body.name},{"$pull": {'auto_data': {'name':req.body.name }}}, (err,cc) => {
    if(err) console.log("auto_Data 삭제X")
    else {
      myBucket.deleteObject(csv_params, function(err, data){
        if(err) console(err)
      })
      myBucket.deleteObject(img_params, function(err, data){
        if(err) console(err)
      })

    }
  })
}
})

const port = process.env.PORT || 5000 // 5000번 포트를 백서버로 둔다

app.listen(port, () => { // 5000번에서 이 앱을 실행한다.

  console.log(`Example app listening at http://localhost:${port}`)
})