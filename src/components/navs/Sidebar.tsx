/*sidebar를 구현해주는 타입스크립트 파일, 리액트 연결
   <span>▶</span> 사이드바 접혀있을 때 나옴
   <span>▼</span>사이드바 펼치면 나옴
    <a href="#"> <img src = {folder}></img>프로젝트</a>프로젝트 탭 및 아이콘을 구현해주는 코드*/
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import '../css/Sidebar.css';
import folder from '../images/folder.png';
import data from '../images/data.png';
import setting from '../images/setting.png';
import user from '../images/user.png';
import home from '../images/home.png';


const Sidebar=(any:any)=> {
    const [pr_name] = useState("프로젝트 1");
        return (
            <div className="sidebar">
            <ul>
            <li className="list">
                <Link to="/">
                    <button className="btn"> <img className="icon" src = {home}></img>메인 뷰</button>'
                    </Link>'
                </li>
                <li className="list">
                     <button className="btn"> <img className="icon" src = {folder}></img>프로젝트</button>
                     <div className="sub_menu">
                    <ul>
                        <Link to = "/Pr_main">
                        <button className="sub_list" >
                            {pr_name}
                        </button>
                        </Link>
                    </ul>
                    </div>
                </li>
                <li className="list">
                <button className="btn"><img className="icon" src = {data}></img>데이터</button>
                </li>
                <li className="list">
                <button className="btn"><img className="icon" src = {user}></img>팀 변경</button>
                </li>
                <li className="list">
                <button className="btn"><img className="icon" src = {setting}></img>설정</button>
                </li>
            </ul>
            </div>
        );
}

export default Sidebar;
