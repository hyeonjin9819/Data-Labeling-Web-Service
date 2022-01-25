/*페이지 이동하는 버튼에 대한 타입스크립트,리액트 연결 파일*/

import React, { Component } from 'react';
import './Page_list.css';

class Page_list extends Component {
  render(){
    return(
      <div className="page">
        <ul className="pagenation">
          <li><a href="#" className="first">처음 페이지</a></li>
          <li><a href="#" className="arrow_left">\\</a></li>
          <li><a href="#" className="cur_num">1</a></li>
          <li><a href="#" className="num">2</a></li>
          <li><a href="#" className="num">3</a></li>
          <li><a href="#" className="num">4</a></li>
          <li><a href="#" className="num">5</a></li>
          <li><a href="#" className="num">6</a></li>
          <li><a href="#" className="num">7</a></li>
          <li><a href="#" className="num">8</a></li>
          <li><a href="#" className="num">9</a></li>
          <li><a href="#" className="arrrow_right">//</a></li>
          <li><a href="#" className="last">끝 페이지</a></li>
        </ul>
    </div>
    );
  }
}

export default Page_list;