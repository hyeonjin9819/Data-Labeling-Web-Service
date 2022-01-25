import React, { Component,useState } from 'react';
import './Sidebar.css';
import folder from './images/folder.png';
import data from './images/data.png';
import setting from './images/setting.png';
import user from './images/user.png';

class Navbar extends Component {
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

export default Navbar;