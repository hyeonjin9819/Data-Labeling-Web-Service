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
import { projectImg } from '../../../_actions/user_action';
import { message } from 'antd';
import Labeling_tool from '../labeltool/Labeling_tool';
import Pagenation  from '../Pagenation/Pagenation';
import Posts from '../Posts/Posts';

const DataPage = () => {
    const dispatch = useDispatch<any>();
    const{projectId, dataId} = useParams() //라우팅 처리용 함수?(현진쓰)
    console.log('project', projectId);
    console.log('id',dataId);
    const [idx, setidx] = useState(dataId);
    const [Imagefilename, setImagefilename] = useState([]);
    const [data_list, setData] = useState<any>([//테이블 데이터 받아주는 배열
    ])
    const [fileImage, setFileImage] = useState<any>([]);
    const imgName = [...data_list]
    const nextId = data_list.length // list 개수
    const nowImageUrl = [...fileImage];
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const ImageUpload = (e:any) => {
        const file = e.target.files;
        //const nowImageUrl = [...fileImage]
        
        console.log('next_id', nextId);
        for(let i = 0; i< file.length; i++){
            
            const name = file[i].name.toString()  
            const result = name.replace(/(.png|.jpg|.jpeg|.gif)$/, ''); //이미지 확장자 제거하는 replace 함수
            const url = URL.createObjectURL(file[i]);
            const url2:String = url.toString().substr(27)

            imgName.push(
                {
                'data_id' :  i + data_list.length , 
                'name' : url2,
                'state' : false,
                '_id'   : idx,
                'label' : ' ',
                'width' : 0,
                'height' : 0,
                'x' : 0,
                'y' : 0, 
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
        console.log('next_id', nextId)
      

  //썸네일이 다 똑같이바뀜...setFileImage useState를 배열로 선언?
        e.target.value = '' //중복 파일 초기화를 위한 처리 
      
    }
    imgName.splice(0);
    const navigate = useNavigate();
    const handleRowClick = (event1:any, event2:any) => {
        console.log(event1 + "이미지 파일 이름")
        console.log(event2 + "index")
        const img : String = nowImageUrl[event2].toString().substr(27)
        navigate(`/DataPage/${event1}/${img}`)
        //console.log(nowImageUrl[event2])
        //setInputValue(inputValue => nowImageUrl[event2])
        //console.log({setInputValue} + "setInput 확인")
    }

    const Navigate = useNavigate();

    const onClickHandler = () => {
        axios.get('/api/users/logout')
          .then(response => {
       if(response.data.success) {
         console.log('logout')
        Navigate('/')
       }else {
         alert("Logout Failed")
       }
      }
      )
    }

    const currentPosts =(tmp:any) => {
      let currentPosts = 0;
      currentPosts = tmp.slice(indexOfFirst, indexOfLast);

      return currentPosts;
    }

    
  
    //const pageList = data_list.map((data:any)=><li key={data.data_id}>{data.data_id}</li>);

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
        <div>
            <header>
                <title>메인뷰 페이지</title>
                </header>
                <nav className="sidebar">
                <Sidebar>                                        
                    </Sidebar>
                 </nav>
                    <body className="view"  style = {{display:'fixed'}}> {/*body 오류 떠서 div로 바꿨는디.. */}
                        <div className="view_header">
                        <h2 className="dashboard" >'{projectId}' 데이터 리스트</h2>
                        <label htmlFor = "data" className="addData">이미지 업로드
                        <input multiple id= "data" className="inputHide" type="file" accept="image/*" onChange={ImageUpload}></input>
                        </label>

                        <button  className="logout" onClick = {onClickHandler}><img className="icon" src={logout}></img></button>
                          {/* <h3 className="welcome">원우연님 환영합니다</h3> */} 
                        <button className="del" onClick={onDelete}>선택 데이터 삭제</button>
            
                        </div>
                        <div className="tables">
                        <Table  striped bordered hover >
                            <thead>
                                <tr>
                                    <th className="checks"><input className="boxs" type="checkbox" value='select' onClick={onCheckAll}></input>
                                        <label htmlFor="allCheck">전체 선택</label></th>
                                    <th>번호</th>
                                    <th>이미지 썸네일</th>
                                <th>데이터 명</th>
                                </tr>
                            </thead>

                            <tbody className="files" id="tablelength">
                            {
                               currentPosts(
                                  (data_list.map(
                                        (data: {name: String, data_id:any}) => (
                                            <tr onClick={() => handleRowClick(data.name, data.data_id)}>
                                                <td></td>
                                                <td><input id = {data.data_id} className="check"  type="checkbox" onChange={onCheck}></input></td>
                                                <td>{data.data_id+1}</td>
                                                <td >{fileImage && (<img className="imgThumb" src={fileImage[data.data_id]}/>)}</td>
                                                <td>{data.name}</td>
                                                <td>{data.name}</td>
                                            </tr>
                                        )
                                    )
                                  )
                               )
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