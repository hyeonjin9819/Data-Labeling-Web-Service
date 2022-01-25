import React, { Component } from 'react';
import './Header.css';
import folder from './images/folder.png';
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