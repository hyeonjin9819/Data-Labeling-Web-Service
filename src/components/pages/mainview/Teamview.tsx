import React, { useState } from 'react';
import Sidebar from '../../navs/Sidebar';
import {Table} from 'react-bootstrap';
import '../../css/Mainview.css';
import Team_modal from './Team_modal';

/*팀 페이지에 대한 구현을 해준 타입스크립트 파일*/
const Teamview = ()=> {
    const [subject] = useState("팀 1");
    const[teams] = useState({
        name: "기본값 이름",
        email: "기본값 이메일",
        roles: "기본값 등급",
        date: "기본값 참가일",
    });
        return (
            <div >
            <nav className="sidebar">
           <Sidebar>                                        
               </Sidebar>
            </nav>
                <header>
                    <title>팀 페이지</title>
                    </header>
                        <body  className="view">
                            <div className="view_header">
                            <h2 className="dashboard" >{subject}</h2>
                            <Team_modal>
                            </Team_modal>
                            </div>
                            <div className="tables">
                            <Table striped bordered hover>
                                <thead className="t_head">
                                    <tr className="team_members"><h3>구성원 목록</h3></tr>
                                    <tr>
                                    <th>{"이름"}</th>
                                    <th>{"이메일"}</th>
                                    <th>{"등급"}</th>
                                    <th>{"참가일"}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th>{teams.name}</th>
                                    <th>{teams.email}</th>
                                    <th>{teams.roles}</th>
                                    <th>{teams.date}</th>
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

export default Teamview;