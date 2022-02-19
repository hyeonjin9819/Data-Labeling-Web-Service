import React, { Component } from 'react';
import '../../css/Labeling_tool.css';
import Tool_menu from '../../navs/Tool_menu';
import farm from '../../images/farm.jpeg';
import draw from '../../images/draw.png';       
import save from '../../images/save.png';

const Labeling_tool =  () => {
    return(
        <div>
        <nav className="">
            <Tool_menu></Tool_menu>
        </nav>
        <header>
            <title>레이블링 툴 페이지</title>
        </header>
        <body  className="labeling_tool">
            <div className="labeling_header">
            <button title="레이블링 모드 켜기" className="header_button"><img className="check" src ={draw}></img></button>
            <button className="header_button"><img className="check" src ={save}></img></button>
                <h3>해당 이미지 파일 이름</h3>
                <div>
  
                </div>
                </div>
            <div className="labeling_body">
                <img className= "label_image" src={farm}></img>
            </div>
        </body>
        <footer>
        </footer>
        </div>
    );
}

export default Labeling_tool;