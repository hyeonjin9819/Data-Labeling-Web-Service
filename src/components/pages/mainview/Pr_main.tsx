import React, { useState } from 'react';
import '../../css/Pr_main.css';
import Body from './Pr_modal';
import Sidebar from '../../navs/Sidebar';
import profile from '../../images/profile.png';
import bell from '../../images/bell.png';
import square from '../../images/square.png';
import { Table } from 'react-bootstrap';

/*프로젝트 페이지로 넘어가면 나오는 페이지*/
const Pr_main = () =>{
  const [subject] = useState("프로젝트 페이지");
  const[projects_list] = useState({
      pr_num: "기본값 번호",
      pr_name: "기본값 프로젝트 명",
      label_type: <img src = {square}></img>,
      pr_update: "기본값 갱신일",
      pr_description:"기본 프로젝트입니다.",
  });
  return(
    <div >
    <nav className="sidebar">
   <Sidebar>                                        
       </Sidebar>
    </nav>
        <header>
            <title>프로젝트 페이지</title>
            </header>
                <body  className="view">
                    <div className="view_header">
                    <h2 className="dashboard" >{subject}</h2>
                    <button  className="logout"><img className="icon" src={profile}></img></button>
                    <button  className="logout"><img className="icon" src={bell}></img></button>
                    <Body>
                        </Body>
                    </div>
                    
                    <div className="tables">
                        
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>프로젝트 번호</th>
                            <th>프로젝트 명</th>
                            <th>레이블링 타입</th>
                            <th>마지막 갱신일</th>
                            <th>프로젝트 설명</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>{projects_list.pr_num}</td>
                            <td>{projects_list.pr_name}</td>
                            <td>{projects_list.label_type}</td>
                            <td>{projects_list.pr_update}</td>
                            <td>{projects_list.pr_description}</td>
                            </tr>
                        </tbody>
                        </Table>
                    </div>
                </body> 
                <footer>
                
                </footer>
    </div>
  );
}

export default Pr_main;