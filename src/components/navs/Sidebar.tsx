/*sidebar를 구현해주는 타입스크립트 파일, 리액트 연결*/
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import  '../css/Sidebar.css';
import folder from '../images/folder.png';
import data from '../images/data.png';
import setting from '../images/setting.png';
import user from '../images/user.png';
import home from '../images/home.png';

/* 토글 버튼 구현 */
const Sidebar=(any:any)=> {
    const [pr_name] = useState("프로젝트 1");
    const [Visible,setVisible] = useState(false);
    const [Visible2,setVisible2] = useState(false);
    const toggleNav = () => {
        setVisible(Visible=>!Visible);
    }
    const toggleNav2 = () => {
        setVisible2(Visible2=>!Visible2);
    }
        return (
            <div className="sidebar">
            <ul className="menu">
            <li className="list">
                <Link className="hi" to="/">
                    <button className="btn"> <img className="icon" src = {home}></img>메인 뷰</button>'
                    </Link>
                </li>
                <li className="list">
                     <button onClick={toggleNav} className="btn"> <img className="icon" src = {folder}></img>프로젝트</button>
                    <ul className={Visible ? "show - menu" : "hide-menu"}>
                        <Link to = "/Pr_main">
                        <button className="sub_list">
                            {pr_name}
                        </button>
                        </Link>
                    </ul>
                    
                </li>
                <li className="list">
                <button className="btn"><img className="icon" src = {data}></img>데이터</button>
                </li>
                <li className="list">
                <button onClick={toggleNav2} className="btn"><img className="icon" src = {user}></img>팀 변경</button>
                <div className="sub_menu">
                <ul className={Visible2 ? "show - menu" : "hide-menu"}>
                    <Link to = "/Teamview">
                    <button className="sub_list">팀 1</button>
                    </Link>
                </ul>
                </div>
                </li>
                <li className="list">
                <button className="btn"><img className="icon" src = {setting}></img>설정</button>
                </li>
            </ul>
            </div>
        );
}

export default Sidebar;
