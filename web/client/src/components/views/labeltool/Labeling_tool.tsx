import React, { Component, useEffect, useRef, useState } from 'react';
import '../../css/Labeling_tool.css';
import Tool_menu from '../toolmenu/Tool_menu';
import {Link, useParams, useNavigate} from 'react-router-dom';
import BBoxAnnotator,{EntryType} from '../BBoxAnnotator';
import Polygon from '../Polygon/Polygon';
import '../../css/tool_menu.css';
import DataPage from '../DataPage/DataPage';


const Labeling_tool : any=  () => {
    const{imageId, checkId} = useParams() 
    const [labels,setlabels] = useState(['Person', 'tie', 'flower']);
    const [entries, setEntries] = useState<EntryType[]>();
    const [labelTool, setlabelTool] = useState<String>('text');
    const [image, setimage] = useState('blob:http://localhost:3000/'+checkId);
    console.log(labels.indexOf('tie'));
    let [tool, settool] = useState('bbox');
    const navigate = useNavigate();

  

    const changeOn = (to : String) => {
      setlabelTool(to);
    }
    const changetool = (to : string) => {
      settool(to);
    }
    useEffect(
     () => {
      setlabelTool(labelTool);
      console.log('useEffect', labelTool);
    }    
,[labelTool ])

    return(
      <>
         
      <BBoxAnnotator
      imageId = {imageId}

      url= {image}
      // 주석을 달 이미지 링크
      inputMethod= {labelTool} 
      // 주석이 달린 객체의 레이블을 추출하기 위한 방식
      // select and text 제공  
      labels={labels}
      // 레이블 목록으로 select 메소드를 사용할 시 사용된다
      onChange={(e: EntryType[]) => setEntries(e)}
      // 사진에 새로운 레이블링을 추가할 시 발생
      setlabels= {setlabels}
      />
      {/* 사용자 화면에는 안떠도 괜찮 것 같아서 주석처리 */}
       <pre>{JSON.stringify(entries)}</pre> 
</>
    /*   
       <div  >
        <header>
        <title>레이블링 툴 페이지</title>
        <div className="labeling_header">
        <button title="레이블링 모드 켜기" className="header_button"><img className="check" src ={draw}></img></button>
        <button className="header_button"><img className="check" src ={save}></img></button>
            <h3>해당 이미지 파일 이름</h3>
            </div>
        </header>
        <body className="labeling_tool" style =  {{width : '100%'}}>
            <div className="tool_menus" style = {{width : '15%'}}>
            <h3>레이블링 객체</h3>
            <select >
            {labels.map((label) => (
              <option key={label} value={label}>
                  {label}
              </option>
          ))}
          </select>
             <select className="label_selection">
                <option value="person">사람</option>
                <option value="animal">동물</option>
                <option value="plant">식물</option>
            </select>
            
            </div>
          <div className = 'workspace' style = {{ float : 'left', width : '69%', height : '700px'}}
        >
            <BBoxAnnotator
            url= {image}
            // 주석을 달 이미지 링크
            inputMethod= {labelTool} 
            // 주석이 달린 객체의 레이블을 추출하기 위한 방식
            // select and text 제공  
            labels={labels}
            // 레이블 목록으로 select 메소드를 사용할 시 사용된다
            onChange={(e: EntryType[]) => setEntries(e)}
            // 사진에 새로운 레이블링을 추가할 시 발생
            setlabels= {setlabels}
            />
</div>
        <div className="tool_menuss" style = {{
          float: 'left', width: "15%"
      }}>
      
      <h3>레이블링 객체3</h3>
      <ul>
      <li value = 'text'><a href = '#' onClick={()=> changeOn('text') }> text </a></li>
      <li value = 'select'><a href = '#' onClick={()=> changeOn('select')}> select </a></li>
      <li value = 'bbox'><a href = '#' onClick={()=> changetool('bbox')}> bbox </a></li>
      <li value = 'canvas_polygon'><a href = '#' onClick={()=> changeOn('polygon')}> polygon </a></li>
      <li value = 'polygon'><a href = '#' onClick={()=> changetool('polygon')}> polygon </a></li>
    </ul>
     
      <br/>
      <pre>{JSON.stringify(entries)}</pre>
    </div>
    

        </body>
         <footer>
         </footer>
    </div> */
    
          );
           }
 

export default Labeling_tool;