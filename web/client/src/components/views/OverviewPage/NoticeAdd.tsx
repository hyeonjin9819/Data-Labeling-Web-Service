import React, {
  Component,
  PropsWithChildren,
  useRef,
  ReactElement,
  useState,
  ChangeEvent,
} from "react";
import "../../css/NoticeAdd.css";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { project_notice } from "../../../_actions/user_action";

/*팀 생성 버튼에 대한 modal창을 구현하는 타입스크립트 파일*/
/*프로젝트 생성 modal 버튼을 구현해주는 파일*/

interface props {
  show: boolean;
  id: any;
  onHide: () => void;
  getNotice: (a: any) => void;
}

const NoticeAdd = (props: props): ReactElement => {
  const dispatch = useDispatch<any>();
  const { show, onHide, getNotice, id } = props;

  const [idx, setid] = useState<any>(id);
  const [noti, setNoti] = useState<String>(null);

  const onChangeNotice = (e: any) => {
    console.log(e.target.value);

    setNoti(e.target.value);
  };

  const addNotice = () => {
    // 공지사항 API 저장
    getNotice(noti);

    dispatch(
      project_notice({
        id: idx,
        notice: noti,
      })
    ).then((response: { payload: { success: any; notice: any } }) => {
      if (response.payload.success) {
        console.log("굿");
      } else {
        console.log("no");
      }
    });
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <h1 className="notice_sub">공지 사항</h1>
      <hr></hr>
      <Modal.Body className="test">
        <div className="team_foot">
          <input
            className="notice_input"
            type="text"
            placeholder="공지사항을 입력하세요."
            onChange={onChangeNotice}
          ></input>
        </div>
        <Button className="make" variant="danger" onClick={addNotice}>
          공지 올리기
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default NoticeAdd;
