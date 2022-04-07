import React,{useRef, useState} from 'react';
import '../../../App.css'
import BBoxAnnotator,{EntryType} from '../BBoxAnnotator';
import Polygon from '../Polygon/Polygon';
import { Modal, Button } from 'react-bootstrap'

import '../../css/bootstrap.min.css'
import { useEffect } from 'react';

interface Props {
    show? : boolean;
    onHide : () => void;
    getName: (a:any) => void;
    nextId : number;
  }

 const Notification  = (props : Props ) =>  {
 const {show, onHide} = props;


  return (

    <Modal 
    show = { show }
    onHide = { onHide }
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered >

<Modal.Body>
      <div >
      <h3 className="body_sub" style = {{marginTop: '5px'}}>알림을 확인하세요</h3>

            </div>
            </Modal.Body>
       <h4 className="footer_sub">초대 프로젝트 목록</h4>
       <button>수락</button>
      
     <h4 className="footer_sub">커밋 알림 목록</h4>

 
  </Modal>

  );
}

export default Notification;