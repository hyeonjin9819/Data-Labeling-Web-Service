import dotenv from 'dotenv';
import {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import AWS from 'aws-sdk';
import {useNavigate} from 'react-router-dom';
import Sidebar from '../SideBar/SideBar';
import '../../css/DataPage.css';
import logout from '../../images/logout.png';
import { useDispatch } from 'react-redux';
import { imageList, projectImg } from '../../../_actions/user_action';
import { message } from 'antd';
import Labeling_tool from '../labeltool/Labeling_tool';
import Pagenation from '../Pagenation/Pagenation';


const DataPage = () => {
const ACCESS_KEY = 'AKIA35UHY7J327JB5ITD';
const SECRET_ACCESS_KEY = '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';
const REGION = 'ap-northeast-2';
const S3_BUCKET = 'weblabeling';
 // console.log(process.env.ACCESS_KEY+'kk')
    const dispatch = useDispatch<any>();
    const{projectId, dataId} = useParams() //라우팅 처리용 함수?(현진쓰)
    console.log('project', projectId)   
     console.log('id', dataId)
    //const [imageurl, setImageurl] = useState("");
    const [idx, setidx] = useState(dataId);
    const [Imagefilename, setImagefilename] = useState([]) // 다중 이미지 선택 배열로 바꿔서 업로드한 이미지 이름들 저장하면 될듯?
    const [data_list, setData] = useState<any>([//테이블 데이터 받아주는 배열
    ])
    const [fileImage, setFileImage] = useState<any>([]);
    const imgName = [...data_list]
    const nextId = data_list.length // list 개수
    const nowImageUrl = [...fileImage]

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;

    AWS.config.update({
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY
      });

      const myBucket = new AWS.S3({
        params: { Bucket: S3_BUCKET},
        region: REGION,
      });

let body = {
    _id : idx
}
      useEffect(() => {
    dispatch(imageList(body))
    .then((response: { payload: { Success: any; imagelist : any;}; }) => {
    if(response.payload.Success) {
      alert("이미지 업로드 성공" + response.payload.imagelist)
      console.log(response.payload.imagelist)
      setData(response.payload.imagelist)
    
           // setData(imgName)
            
      for (let ids = 0; ids < response.payload.imagelist.length; ids++) {
          console.log(fileImage)
          nowImageUrl.push('https://weblabeling.s3.ap-northeast-2.amazonaws.com/project'+idx+'/'+response.payload.imagelist[ids].name)
        
          //  console.log(`${content} : ${idx}`);
    }
    setFileImage(nowImageUrl)
    //   response.payload.imagelist.map((data : {name : String, id:any}) =>(
    //     setFileImage('https://weblabeling.s3.ap-northeast-2.amazonaws.com/project'+idx+'/'+data.name)
    //   )
 
    //   )
      console.log(fileImage, "fileimg")
    }
    //  setFileImage(nowImageUrl)  
    else {
    alert('이미지 가져오기 실패')
  }
})
      }, [idx]);
    // 이미지 뽑아오기

    const ImageUpload = (e:any) => {
    
    //const hiddenInput = (document.getElementById('data') as HTMLInputElement).files[0];
        const file = e.target.files;
        //const nowImageUrl = [...fileImage]
        
        console.log('next_id', nextId)
        for(let i = 0; i< file.length; i++){
            const name = file[i].name.toString()  
            const url = URL.createObjectURL(file[i]);
            const url2:String = url.toString().substr(27)
            const params = {
                ACL: 'public-read',
                Body: file[i],
                Bucket: S3_BUCKET,
                Key: "project"+idx+"/"+ url2 
              };
        
              myBucket.putObject(params)  
              .send((err) => {
                if (err) {console.log(err); return err}
              })
        imgName.push(
            {
            'data_id' :  i + data_list.length ,
            'name' : url2 , 
            'state' : false,
            '_id' : idx,
            'label' : '', 
            'width' : 0,
            'height' : 0,
            'x' : 0,
            'y': 0,
        }) 
           // imgName2.push({'name' : URL.createObjectURL(file[i]).toString()})
           // console.log(URL.createObjectURL(file[i]));
           // setFileImage([...fileImage,URL.createObjectURL(file[i])]);
            nowImageUrl.push(url)
            setData(imgName)
            setFileImage(nowImageUrl)
           
        }    
        

        // let body = {
        //     url : fileImage,
        //     _id : dataId,
        //     state : false,
        //     label : '', 
        //     width : 0,
        //     height : 0,
        //     x : 0,
        //     y: 0,
        // }
        console.log('body', imgName)
        dispatch(projectImg(imgName))
        .then((response: { payload: { success: any; message : any;}; }) => {
        if(response.payload.success) {
          alert("이미지 업로드 성공" + response.payload.message)
         }  
        else {
        alert('이미지 업로드 실패')
      }
    })
                               
        console.log('name', imgName) //이름 확인
        console.log('fileimg', nowImageUrl) //이름 확인

  //썸네일이 다 똑같이바뀜...setFileImage useState를 배열로 선언?
        e.target.value = '' //중복 파일 초기화를 위한 처리 
      
    }
    


    imgName.splice(0)  
    const navigate = useNavigate();
    const handleRowClick = (event1:any, event2:any) => {
        console.log(event1 + "이미지 파일 이름")
        console.log(event2 + "index")
        const img : String = nowImageUrl[event2].toString().substr(27)
        navigate(`/DataPage/${event1}/${idx}`)
        //console.log(nowImageUrl[event2])
        //setInputValue(inputValue => nowImageUrl[event2])
        //console.log({setInputValue} + "setInput 확인")
    }

    const onClickHandler = () => {
      axios.get('/api/users/logout')
        .then(response => {
     if(response.data.success) {
       console.log('logout')
      navigate('/')
     }else {
       alert("Logout Failed")
     }
  })
  }
  const currentPosts =(tmp:any) => {
      let currentPosts = 0;
      currentPosts = tmp.slice(indexOfFirst, indexOfLast);

      return currentPosts;
    }

    const onCheck = (e:any) => {
      //개별 체크박스를 선택, 해제 시켜주는 함수
      if(e.target.checked){
          e.target.checked = true;
      
      }
      else{
          e.target.checked = false;
     
      }
   
  }

  const onCheckAll = (e:any) => {
      //모든 체크박스를 선택, 해제 시켜주는 함수

      var ele:any =  document.getElementsByClassName('check');

      if(e.target.checked){
          for(var i = 0; i<ele.length; i++){
              ele[i].checked = true;

           
          }
      }

      else{
          for(var i = 0; i<ele.length; i++){
              ele[i].checked  = false;
           
              
          }
      }
  }

  const onDelete = () => {
      
      var chk:any = document.getElementsByClassName('check');
      var th:any = document.getElementById('tablelength'); //테이블 행 갯수 5
 
                  for(let i = th.rows.length - 1; i < th.rows.length; i--){
               
                 if(chk[i].checked == true){
                          chk[i].parentElement.parentElement.remove();      
                 }
      }
     //setData([]);
  }

    
    return (
        <div >
            <header>
                <title>메인뷰 페이지</title>
                </header>
                <nav className="sidebar">
                <Sidebar>                                        
                    </Sidebar>
                 </nav>
                    <body  className="view"  style = {{display:'fixed'}}>
                        <div className="view_header">
                        <h2 className="dashboard" >'{projectId}' 데이터 리스트</h2>
                        <label htmlFor = "data" className="addData">이미지 업로드
                        <input multiple id= "data" className="inputHide" type="file" accept="image/*" onChange={ImageUpload}></input>
                        </label>
                        
                        <button  className="logout" onClick = {onClickHandler}><img className="icon" src={logout}></img></button>
                       {/* <h3 className="welcome">원우연님 환영합니다</h3> */} 
                        </div>
                        <div className="tables">
                        <Table striped bordered hover >
                            <thead>
                                <tr>
                                    <th>체크 박스</th>
                                    <th>번호</th>
                                    <th>이미지 썸네일</th>
                                <th>데이터 명</th>
                                <th>진행 사항</th>
                                </tr>
                            </thead>
                            <tbody id="datas">
                            {
                              currentPosts(
                                data_list.map(
                                    (data: {name: String, data_id:any}) => (
                                        <tr>
                                            <td><input id = {data.data_id} className="check"  type="checkbox" onChange={onCheck}></input></td>
                                            <td  onClick={() => handleRowClick(data.name, data.data_id)}>{data.data_id+1}</td>
                                            <td  onClick={() => handleRowClick(data.name, data.data_id)}>{fileImage && (<img className="imgThumb" src={fileImage[data.data_id]}/>)}</td>
                                            <td  onClick={() => handleRowClick(data.name, data.data_id)}>{data.name}</td>
                                            <td  onClick={() => handleRowClick(data.name, data.data_id)}>{data.name}</td>
                                        </tr>
                                       )
                                   ))
                                    }
                                </tbody>
                            </Table>
                            <Pagenation postsPerPage={postsPerPage} totalPosts={data_list.length} paginate={setCurrentPage}></Pagenation>
                        </div>
                    </body> 
                 <footer>
            </footer>
        </div>
      );
    }


export default DataPage;