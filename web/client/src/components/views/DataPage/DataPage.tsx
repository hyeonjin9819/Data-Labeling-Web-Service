import {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Sidebar from '../SideBar/SideBar';
import '../../css/DataPage.css';
import logout from '../../images/logout.png';
import Labeling_tool from '../labeltool/Labeling_tool';

const DataPage = () => {

    const{projectId} = useParams() //라우팅 처리용 함수?(현진쓰)
    //const [imageurl, setImageurl] = useState("");
    var imageurl;
    const [Imagefilename, setImagefilename] = useState([]) // 다중 이미지 선택 배열로 바꿔서 업로드한 이미지 이름들 저장하면 될듯?
    const [data_list, setData] = useState<any>([//테이블 데이터 받아주는 배열
    ])
    const [fileImage, setFileImage] = useState<any>([]);
    const imgName = [...data_list]
    const nextId = data_list.length // list 개수
    const nowImageUrl = [...fileImage]
    
    const ImageUpload = (e:any) => {
    
     //const hiddenInput = (document.getElementById('data') as HTMLInputElement).files[0];
        const file = e.target.files;
        //const nowImageUrl = [...fileImage]
        
        console.log('next_id', nextId)
        for(let i = 0; i< file.length; i++){
            const name = file[i].name.toString()  
        
            const url = URL.createObjectURL(file[i]);
            imgName.push({'data_id' :  i + data_list.length , 'name' : name }) 
           // imgName2.push({'name' : URL.createObjectURL(file[i]).toString()})
           // console.log(URL.createObjectURL(file[i]));
           // setFileImage([...fileImage,URL.createObjectURL(file[i])]);
            nowImageUrl.push(url)
            setData(imgName)
            setFileImage(nowImageUrl)
        }
        console.log('name', imgName) //이름 확인
        console.log('fileimg', nowImageUrl) //이름 확인

  //썸네일이 다 똑같이바뀜...setFileImage useState를 배열로 선언?
        e.target.value = '' //중복 파일 초기화를 위한 처리 

    }


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


    const onClickHandler = () => {
        axios.get('/api/users/logout')
          .then(response => {
       if(response.data.success) {
         console.log('logout')
        navigate('/')
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
                        <h2 className="dashboard" >'{projectId}' 데이터 리스트</h2>
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
                                            
                                            <tr onClick={() => handleRowClick(data.name, data.data_id)}>
                                                <td></td>
                                                <td>{data.data_id+1}</td>
                                                <td >{fileImage && (<img className="imgThumb" src={fileImage[data.data_id]}/>)}</td>
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