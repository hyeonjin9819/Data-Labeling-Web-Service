import React from 'react';
import {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Sidebar from '../SideBar/SideBar';
import '../../css/DataPage.css';
import logout from '../../images/logout.png';

const DataPage = () => {
    const [Imagefilename, setImagefilename] = useState("")
    // 다중 이미지 선택 배열로 바꿔서 업로드한 이미지 이름들 저장하면 될듯?

    const [data_list, setData] = useState<any>([
    ])
    const name = [...data_list]

    const onClickUpload = (e:any) => {
     //const hiddenInput = (document.getElementById('data') as HTMLInputElement).files[0];
        const file = e.target.files;
        console.log(file);

        for(let i =0; i< file.length; i+=1){
            const name2 = file[i].name.toString()
            const length = file.length;
            console.log(length);
            length.push;
            name.push(name2)
            
        }
        
        setData(name)
        console.log('name', name)
        e.target.value = ''
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
                        <h2 className="dashboard" >데이터 리스트</h2>
                        <label htmlFor = "data" className="addData">이미지 업로드
                        <input multiple id= "data" className="inputHide" type="file" accept="image/*" onChange={onClickUpload}></input>
                        </label>
                        <button  className="logout" onClick = {onClickHandler}><img className="icon" src={logout}></img></button>
                        <h3 className="welcome">원우연님 환영합니다</h3>
                        </div>
                        <div className="tables">
                        <Table striped bordered hover >
                            <thead>
                                <tr>
                                    <th>체크 박스</th>
                                    <th>이미지 썸네일</th>
                                <th>데이터 명</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody id="datas">
                            {
                                    name.map(
                                        (Image: any) => (
                                            <>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td>{Image}</td>
                                            <td></td>
                                            </tr>
                                            </>
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