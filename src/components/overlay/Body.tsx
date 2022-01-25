/* body 타입스크립트 파일, 리액트 연결
 <Button variant="danger">프로젝트 생성 </Button> 프로젝트 생성 버튼
 <input className="pro_search" placeholder='프로젝트 검색'></input>프로젝트 검색창*/
import React, { Component } from 'react';
import './Body.css';
import {Button} from 'react-bootstrap'; /*버튼에 대한 부트스트랩을 import해주는 명령어*/

class Body extends Component {
  render(){
    return(
      <div className="Body">
        <Button variant="danger">프로젝트 생성 </Button> 
       <input className="pro_search" placeholder='프로젝트 검색'></input>
    </div>

    
    );
  }
}

export default Body;