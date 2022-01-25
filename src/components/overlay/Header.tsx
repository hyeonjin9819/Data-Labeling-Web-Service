/* 헤더 타입스크립트 파일 
   벨 아이콘 삽입 코드<a href="#"><img src={bell}></img></a> */

import React, { Component } from 'react';
import './Header.css';
import profile from './images/profile.png';
import bell from './images/bell.png';

class Header extends Component {
  render(){
    return(
      <div className="Header">
        <div className="Page">
           <h5>프로젝트 페이지</h5>
           </div>
          <ul>
            <li className="Top-li">
           <a href="#"><img src={bell}></img></a> 
            </li>
            <li className="Top-li">
            <a href="#"><img src={profile}></img></a>
            </li>
          </ul>
    </div>
    );
  }
}

export default Header;