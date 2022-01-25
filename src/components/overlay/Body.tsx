import React, { Component } from 'react';
import './Body.css';
import {Button} from 'react-bootstrap';

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