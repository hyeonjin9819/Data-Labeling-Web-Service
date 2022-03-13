import React, {Component, PropsWithChildren, ReactElement } from 'react';
import { Button,Modal } from 'react-bootstrap';
import image from '../../images/image.png';
import box from '../../images/box.png';
import close from '../../images/close.png';

/*팀 생성 버튼에 대한 modal창을 구현하는 타입스크립트 파일*/
interface props { 
  show: boolean; 
  onHide: () => void; // 함수 타입 정의할 때 }
}

const TeamViewAdd = (props: props): ReactElement => {
  const { show, onHide } = props;
  return (
    <Modal
  show = { show }
   onHide = { onHide }
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <div className="top">
    <Modal.Header>
      <Modal.Title id="contained-modal-title-vcenter">
      <div className="cl">
      <button onClick={onHide} className="close"><img src={close}></img></button>
      </div>
      </Modal.Title>
    </Modal.Header>
    </div>
    <Modal.Body>
      <div>
      <h1 className="body_sub">팀 명</h1>
    <input className="pr" type="" placeholder="팀 명을 입력하세요."></input>
        <h1 className="body_sub">팀 설명</h1>
            <input className="pr" type="" placeholder="팀 설명을 입력하세요."></input>
            </div>
    </Modal.Body>

    <Modal.Footer>
        <div className="team_foot">
    <Button className="make"variant="danger">팀 생성</Button>
    </div>
    </Modal.Footer>
  </Modal>
  );
}

export default TeamViewAdd;