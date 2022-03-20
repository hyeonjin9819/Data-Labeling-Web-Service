import React from 'react';
import {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Sidebar from '../SideBar/SideBar';
import '../../css/DataPage.css';
import logout from '../../images/logout.png';

const DataPage = () => {

    const{projectId} = useParams() //라우팅 처리용 함수?(현진쓰)
    const [Imagefilename, setImagefilename] = useState([]) // 다중 이미지 선택 배열로 바꿔서 업로드한 이미지 이름들 저장하면 될듯?
    const [data_list, setData] = useState<any>([//테이블 데이터 받아주는 배열
    ])
    
    
    const [fileImage, setFileImage] = useState<any>([]);
    const imgName = [...data_list]
    const imgName2= [...fileImage]
    const ImageUpload = (e:any) => {
    
     //const hiddenInput = (document.getElementById('data') as HTMLInputElement).files[0];
        const file = e.target.files;
        for(let i =0; i< file.length; i++){
            const name = file[i].name.toString()  
            const url = URL.createObjectURL(e.target.files[i]);
            imgName.push({'data_id' : i+1 , 'name' : name }) 
            imgName2.push({'name' : URL.createObjectURL(file[i]).toString()})
            console.log(URL.createObjectURL(file[i]));
           // setFileImage([...fileImage,URL.createObjectURL(file[i])]);


        }
        setData(imgName)
        setFileImage(imgName2)
        console.log('name', imgName) //이름 확인
        console.log('fileimg', fileImage.name) //이름 확인

  //썸네일이 다 똑같이바뀜...setFileImage useState를 배열로 선언?
        e.target.value = '' //중복 파일 초기화를 위한 처리 
    }

    const Navigate = useNavigate();
    useEffect(()=> {
      axios.get('api/hello')
      .then(response => {console.log(response)})
    }, [])

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
                        <h2 className="dashboard" >{projectId} 데이터 리스트</h2>
                        <label htmlFor = "data" className="addData">이미지 업로드
                        <input multiple id= "data" className="inputHide" type="file" accept="image/*" onChange={ImageUpload}></input>
                        </label>
                        <button  className="logout" onClick = {onClickHandler}><img className="icon" src={logout}></img></button>
                        <h3 className="welcome">원우연님 환영합니다</h3>
                        </div>
                        <div className="tables">
                        <Table striped bordered hover >
                            <thead>
                                <tr>
                                    <th>체크 박스</th>
                                    <th>번호</th>
                                    <th>이미지 썸네일</th>
                                <th>데이터 명</th>
                                </tr>
                            </thead>
                            <tbody id="datas">
                            {
                                    data_list.map(
                                        (data: {name: String, data_id:any}) => (
                                            <tr>
                                                <td></td>
                                                <td>{data.data_id}</td>
                                                <td >{fileImage && (<img className="imgThumb" src={fileImage.name}/>)}</td>
                                                <td>{data.name}</td>
                                            </tr>
                                        )
                                    )
                                }
                            
                            </tbody>
                            </Table>
                        </div>
                    </body> 
                    <footer>
                    </footer>
        </div>
      );
    }


export default DataPage;