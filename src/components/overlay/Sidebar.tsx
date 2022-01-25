/*sidebar를 구현해주는 타입스크립트 파일, 리액트 연결
   <span>▶</span> 사이드바 접혀있을 때 나옴
   <span>▼</span>사이드바 펼치면 나옴
    <a href="#"> <img src = {folder}></img>프로젝트</a>프로젝트 탭 및 아이콘을 구현해주는 코드*/
import React, { Component,useState } from 'react';
import './Sidebar.css';
import folder from './images/folder.png';
import data from './images/data.png';
import setting from './images/setting.png';
import user from './images/user.png';

class Sidebar extends Component {
  render(){
    return(
        <div className="left-side-bar">
        <div className="status-ico">
            <span>▶</span> 
            <span>▼</span>
        </div>
        <ul>
            <li>
                <a href="#"> <img src = {folder}></img>프로젝트</a>
            </li>
            <li>
                <a href="#"><img src = {data}></img>데이터</a>
            </li>
            <li>
                <a href="#"><img src = {user}></img>팀 구성원</a>
            </li>
            <li>
                <a href="#"><img src = {setting}></img>설정</a>
            </li>
        </ul>
    </div>
    );
  }
}

export default Sidebar;