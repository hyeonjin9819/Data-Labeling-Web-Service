import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react'
import axios from 'axios';
import Sidebar from '../SideBar/SideBar';
import {Table} from 'react-bootstrap';
import logout from '../../images/logout.png';
import Mainview from '../MainViewPage/MainView';
import {Link} from 'react-router-dom';
import '../../css/LearnPage.css';


/*일단은 이미지 썸네일이랑 해당 이미지 URL 읽어서 뜨게하는 페이지만 만든다.
  그리고 데이터들을 받아주는 배열을 만들어서 이미지 URL과 텍스트파일의 이름이 일치하면
  같은 배열에 저장을 시키는 것을 구현하여 console에 찍어볼 수 있게한다. */

const LearnPage = () => {
  
    const [dashboard] = useState("학습 페이지");
    const [user_name] = useState("기본 이름");
    const navigate = useNavigate();

    const [data_list, setData] = useState<any>([//테이블 데이터 받아주는 배열
    ])

    const [txt_list,setTxt] = useState<any>([

    ])

    const [fileImage, setFileImage] = useState<any>([]);
    const [fileText, setFileText] = useState<any>([]);
    const imgName=[...data_list];
    const txtName=[...txt_list];

    const nextId = data_list.length // list 개수
    const nowImageUrl = [...fileImage]
    const nowTextUrl = [...fileText]
  
 

  const Navigate = useNavigate();

  useEffect(()=> {
    axios.get('api/hello')
    .then(response => {console.log(response)})
  }, [])

  const onClickRoute  = ()=> {
    navigate(`/CustomPage`)
  }

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

  const textUpload = (e:any) => {

    const txt = e.target.files;
 
    for(var i = 0; i< txt.length; i++){ //txt렝쓰 기준이라서 순회를 하려면 좀 빡셈.

      const name = txt[i].name.toString().replace(/(.txt|)$/,'');
      const url = URL.createObjectURL(txt[i]);
      const url2:String = url.toString().substr(27);

  

      if( name == data_list[i].name){
        console.log("텍스트와 이미지 이름 일치");
        txtName.push({
          'txt_id' : i + txt_list.length,
          'txt' : name,
        })
        const lists = [...txt_list || [] , ...data_list || []];

     
        setTxt(txtName);
        setFileText(nowTextUrl);
        console.log('텍스트 배열 목록:',{txt_list});
        console.log('합친 배열 목록:',lists);
      }
   
    
 

    }
  
    e.target.value = '';
  }
  
  const fileUpload = (e:any) => {

    const file = e.target.files;

    for(var i = 0; i < file.length; i++){

      const name = file[i].name.toString().replace(/(.png|.jpg|)$/,'');
      const url = URL.createObjectURL(file[i]);
      const url2:String = url.toString().substr(27);
    
      imgName.push(
        {
          'img_id' : i + data_list.length,
          'name' : name,
        }
      )
      nowImageUrl.push(url)
      setData(imgName);
      setFileImage(nowImageUrl);
      console.log(url2);
      console.log('이미지 배열 목록',data_list);
    }
    e.target.value = '';
  }


    
  
  return (

    <div>
        <header>
            <title>메인뷰 페이지</title>
            </header>
            <nav className="sidebar" >
            <Sidebar>                                        
                </Sidebar>
             </nav>
                <body  className="view"  style = {{display:'fixed'}}>
                    <div className="view_header">
                    <h2 className="dashboard" >{dashboard}</h2>
                    <label className="uploadLabel" htmlFor = "data1">텍스트 업로드
                        <input className="upload" multiple id= "data1" type="file" accept=".text" onChange={textUpload}></input>
                        </label>
                    <label className="uploadLabel" htmlFor = "data">이미지 업로드
                        <input className="upload" multiple id= "data" type="file" accept=".png,.jpg" onChange={fileUpload}></input>
                        </label>
                    <button className="logout" onClick = {onClickHandler}><img className="icon" src={logout}></img></button>
                    <h3 className="welcome">{user_name}님 환영합니다</h3>
                    </div>
                    <div className="tables">
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                            <th>이미지 썸네일</th>
                            <th>텍스트 데이터</th>
                            </tr>
                        </thead>
                        <tbody>
                          {
                          data_list.map(
                            (data: {name: String, data_id:any}) => (
                            <tr onClick={onClickRoute}>
                            <td>{fileImage && (<img className="imgThumb" src={fileImage[data.data_id]}/>)}</td>
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
};

export default LearnPage;