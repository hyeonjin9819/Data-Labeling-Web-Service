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

const TeamMemberAdd = (props: props): ReactElement => {
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
      <button className="close"><img src={close}></img></button>
      </div>
      </Modal.Title>
    </Modal.Header>
    </div>
    <Modal.Body>
      <div>
      <h1 className="body_sub">팀원 초대</h1>
    <input className="pr" type="" placeholder="초대할 팀원의 아이디를 입력해주세요."></input>
    <button>추가</button>
        <h1 className="body_sub">초대 목록</h1>
           
            </div>
    </Modal.Body>

    <Modal.Footer>
        <div className="team_foot">
    <Button className="make"variant="danger">next</Button>
    </div>
    </Modal.Footer>
  </Modal>
  );
}

export default TeamMemberAdd;