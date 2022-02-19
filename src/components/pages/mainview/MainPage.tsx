import React, { Component, useState } from 'react';
import {Table} from 'react-bootstrap';
import logout from '../../images/logout.png';
import Sidebar from '../../navs/Sidebar';
import '../../css/Mainview.css';

/*로그인 시 나오는 메인뷰 페이지를 구현해주는 타입스크립트 파일*/
const MainPage=()=> {
    const [dashboard] = useState("dash board");
    const [user_name] = useState("기본 이름");
    const[projects]:any[] = useState({
        num: "기본값 숫자",
        project_name: "기본값 프로젝트",
        team_name: "기본값 팀",
        roles: "기본값 관리자",
    });

        return (
            <div >
                <nav className="sidebar">
               <Sidebar>                                        
                   </Sidebar>
                </nav>
                    <header>
                        <title>메인뷰 페이지</title>
                        </header>
                            <body  className="view">
                                <div className="view_header">
                                <h2 className="dashboard" >{dashboard}</h2>
                                <button  className="logout"><img className="icon" src={logout}></img></button>
                                <h3 className="welcome">{user_name}님 환영합니다</h3>
                                </div>
                                <div className="tables">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                        <th>프로젝트</th>
                                        <th>프로젝트 명</th>
                                        <th>팀 명</th>
                                        <th>내 등급</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td>{projects.num}</td>
                                        <td>{projects.project_name}</td>
                                        <td>{projects.team_name}</td>
                                        <td>{projects.roles}</td>
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
export default MainPage;