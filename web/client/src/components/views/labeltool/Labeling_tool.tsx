import React, { Component, useEffect, useRef, useState } from 'react';
import '../../css/Labeling_tool.css';
import Tool_menu from '../toolmenu/Tool_menu';
import {Link, useParams, useNavigate} from 'react-router-dom';
import draw from '../../images/draw.png';
import save from '../../images/save.png';
import BBoxAnnotator,{EntryType} from '../BBoxAnnotator';
import Polygon from '../Polygon/Polygon';
import '../../css/tool_menu.css';
import DataPage from '../DataPage/DataPage';
import { useDispatch } from 'react-redux';
import { dataTxt, imageList } from '../../../_actions/user_action';
import { isDeleteExpression } from 'typescript';
import UrlImageDownloader from 'react-url-image-downloader';
import { message } from 'antd';

const Labeling_tool : any=  () => {
  const dispatch = useDispatch<any>();
  const a = window.screen.height;
    const{imageId, idx, projectId, label} = useParams() 
    const [labels,setlabels] = useState(['객체를 선택해주세요']);
    const [addlabel,setaddlabel] = useState([]);
    const [entries, setEntries] = useState<EntryType[]>();
    const [labelTool, setlabelTool] = useState<String>('text');
    const [image, setimage] = useState('https://weblabeling.s3.ap-northeast-2.amazonaws.com/'+label+'/'+projectId+'/'+imageId+'.jpeg');
    console.log(labels.indexOf('tie'));
    let [tool, settool] = useState('bbox');
    const navigate = useNavigate();

    const changeOn = (to : String) => {
      setlabelTool(to);
    }
    const changetool = (to : string) => {
      settool(to);
    }
    function download(content: BlobPart, fileName: string, contentType: string) {
      var a = document.createElement("a");
      var file = new Blob([content], {type: contentType});
      a.href = URL.createObjectURL(file);
      a.download = fileName;
      a.click();
  }
  function download2() {
    const link = document.createElement('a')
           link.href = `https://weblabeling.s3.ap-northeast-2.amazonaws.com/manual/${projectId}/${imageId}.jpeg`
            link.setAttribute('download', `${imageId}.jpeg`)
            document.body.appendChild(link)
            link.click()
}


function jsonToCSV(json_data: any) { // 1-1. json 데이터 취득 
  const json_array = json_data; // 1-2. json데이터를 문자열(string)로 넣은 경우, JSON 배열 객체로 만들기 위해 아래 코드 사용 // const json_array = JSON.parse(json_data); // 2. CSV 문자열 변수 선언: json을 csv로 변환한 문자열이 담길 변수 
  let csv_string = ''; 
  // 3. 제목 추출: json_array의 첫번째 요소(객체)에서 제목(머릿글)으로 사용할 키값을 추출 
  const titles = Object.keys(json_array[0]); 
  // 4. CSV문자열에 제목 삽입: 각 제목은 컴마로 구분, 마지막 제목은 줄바꿈 추가 
  titles.forEach((title, index)=>{ csv_string += (index !== titles.length-1 ? `${title},` : `${title}\r\n`); });
   // 5. 내용 추출: json_array의 모든 요소를 순회하며 '내용' 추출 
   json_array.forEach((content:any, index: any)=>{ let row = ''; 
   // 각 인덱스에 해당하는 '내용'을 담을 행 
   for(let title in content){ // for in 문은 객체의 키값만 추출하여 순회함.
     // 행에 '내용' 할당: 각 내용 앞에 컴마를 삽입하여 구분, 첫번째 내용은 앞에 컴마X 
     row += (row === '' ? `${content[title]}` : `,${content[title]}`); }
      // CSV 문자열에 '내용' 행 삽입: 뒤에 줄바꿈(\r\n) 추가, 마지막 행은 줄바꿈X 
      csv_string += (index !== json_array.length-1 ? `${row}\r\n`: `${row}`); }) 
      // 6. CSV 문자열 반환: 최종 결과물(string)
       return csv_string; 
      }
  
    const save_fun : any = () => {
     // const csv_string = jsonToCSV(entries);
     // setaddlabel(addlabel.concat())
      let body = {
        entries : entries,
        imageId : imageId,
        _id : idx,
        object : labels,
        projectId : projectId,
        label : label
      }
     
      
      dispatch(dataTxt(body))
      .then((response: { payload: { Success: any; message:any}; }) => {
          //console.log('index 파일 생성 완료')
          if(response.payload.Success){
            console.log('message', response.payload.message);

          }
   })   
  }
    useEffect(
     () => {
      setlabelTool(labelTool);
      console.log('useEffect', labelTool);
    }    
,[labelTool ])

useEffect(()=>{
  let body = {
    _id : idx
  }
  
  dispatch(imageList(body))
    .then((response: { payload: { Success: any; imagelist : any; imageobject:any}; }) => {
    if(response.payload.Success) {
        setlabels(response.payload.imageobject)
    }}
    )
},[])
    return(
      <>
    
      
      {  tool === 'bbox'? (
      <BBoxAnnotator
      imageId = {imageId}
      idx = {idx}
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
      saveFun = {save_fun}
      setaddlabel = {setaddlabel}
      addlabel = {addlabel}
      projectId = {projectId}
      label = {label}
      /> 
    
      )
      : (<><polygon/></>) }
  
       {/*  <button onClick={aa}>aa</button>
    <pre>{JSON.stringify(entries)}</pre> */} 

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