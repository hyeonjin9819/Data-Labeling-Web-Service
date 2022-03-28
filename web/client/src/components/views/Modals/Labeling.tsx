
import React,{useRef, useState} from 'react';
import '../App.css';
import BBoxAnnotator,{EntryType} from '../BBoxAnnotator';
import Polygon from '../Polygon/Polygon';
import { Modal, Button } from 'react-bootstrap'
import '../bootstrap.min.css';
import { useEffect } from 'react';

interface Props {
    show? : boolean;
    onHide : () => void;

  }

 const Labeling  = (props : Props ) =>  {
 const {show, onHide} = props;
 const [labels,setlabels] = useState(['Person', 'tie']);
  const [entries, setEntries] = useState<EntryType[]>();
  const [labelTool, setlabelTool] = useState<String>('select');
  const [image, setimage] = useState('https://img9.yna.co.kr/photo/cms/2019/09/29/08/PCM20190929000008005_P4.jpg');
  console.log(labels.indexOf('tie'));

  window.onresize = function(event){
    var innerWidth = window.innerWidth;
    
    console.log('screen', window.innerWidth);
  }
  

  let [tool, settool] = useState('bbox');
  const changeOn = (to : String) => {
    setlabelTool(to);
  }
  const changetool = (to : string) => {
    settool(to);
  }


  return (

    <Modal 
    show = { show }
    onHide = { onHide }
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered

 >
{/* 
  { tool === 'bbox' ? ( // bounding box
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
        
  /> )
  : // polygon
  (<div>
  <Polygon/>
  </div> )
  }*/}
  {/*<div id='tool'  >
  <ul>
    <li value = 'text'><a href = '#' onClick={()=> changeOn('text') }> text </a></li>
    <li value = 'select'><a href = '#' onClick={()=> changeOn('select')}> select </a></li>
    <li value = 'bbox'><a href = '#' onClick={()=> changetool('bbox')}> bbox </a></li>
    <li value = 'canvas_polygon'><a href = '#' onClick={()=> changeOn('polygon')}> polygon </a></li>
    <li value = 'polygon'><a href = '#' onClick={()=> changetool('polygon')}> polygon </a></li>
  </ul>
  <pre>{JSON.stringify(entries)}</pre>
</div>
*/}
  </Modal>

  );
}

export default Labeling;