import React, {useState, ReactElement } from 'react';
import { Button,Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

/*팀 생성 버튼에 대한 modal창을 구현하는 타입스크립트 파일*/
interface props { 
  show: boolean; 
  onHide: () => void; // 함수 타입 정의할 때 }
  getName: (a:any) => void;
  nextId : number;
}

const TeamAssign = (props: props): ReactElement => {
  const { show, onHide, getName, nextId } = props;

    
  return (
    <Modal
  show = { show }
   onHide = { onHide }
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <div className="top">
    </div>
    <Modal.Body>
      <div>
      <h1 className="body_sub">프로젝트 목록</h1>
    
            </div>
    </Modal.Body>

    <Modal.Footer>
        <div className="team_foot">
    <Button className="make"variant="danger">프로젝트 배정</Button>
    </div>
    </Modal.Footer>
  </Modal>
  );
}

export default TeamAssign;