import React, {Component, PropsWithChildren, ReactElement } from 'react';
import '../../css/Pr_add.css';
import { Button,Modal } from 'react-bootstrap';
import image from '../../images/image.png';
import box from '../../images/box.png';
import close from '../../images/close.png';

interface props { 
  show: boolean; 
  onHide: () => void; // 함수 타입 정의할 때 }
}

const Pr_add = (props: props): ReactElement => {
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
      <Button className="p_ad" variant="danger">images<img className="img" src = {image}></img></Button>
      <div className="cl">
      <button className="close"><img src={close}></img></button>
      </div>
      </Modal.Title>
    </Modal.Header>
    </div>
    <Modal.Body>
      <h1 className="body_sub">프로젝트 명</h1>
    <input className="pr" type="text" value="이름을 입력하세요."></input>
        <h1 className="body_sub">프로젝트 설명</h1>
            <input className="pr" type="text" value="설명을 입력하세요."></input>
    </Modal.Body>
    <h1 className="footer_sub">레이블링 타입</h1>
    <ul className="label_list">
                <li className="label_menu"><a href="#"><img src={box}></img></a></li>
                <li className="label_menu">레이블링 2</li>
                <li className="label_menu">레이블링 3</li>
                <li className="label_menu">레이블링 4</li>
    </ul>
    <Modal.Footer>
    <Button className="make"variant="danger">프로젝트 생성</Button>
    </Modal.Footer>
  </Modal>
  );
}

export default Pr_add;