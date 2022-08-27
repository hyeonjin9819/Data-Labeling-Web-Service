import React, { useState, ReactElement, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import image from "../../images/image.png";
import box from "../../images/box.png";
import close from "../../images/close.png";
import {
  myInfo,
  teamCreate,
  teamMailUser,
} from "../../../_actions/user_action";
import { useDispatch } from "react-redux";
import { NumberOfHumanWorkersPerDataObject } from "aws-sdk/clients/sagemaker";
import "../../css/TeamViewAdd.css";

/*팀 생성 버튼에 대한 modal창을 구현하는 타입스크립트 파일*/
interface props {
  show: boolean;
  onHide: () => void; // 함수 타입 정의할 때 }
  getName: (a: any) => void;
  nextId: number;
}

const TeamViewAdd = (props: props): ReactElement => {
  const dispatch = useDispatch<any>();
  const { show, onHide, getName, nextId } = props;
  let today = new Date(); //날짜를 계산해주는 Date 함수
  let year = today.getFullYear(); // 현재 년도를 가져와주는 getFullYear 함수
  let month = today.getMonth() + 1; // 현재 월을 가져와주는 getMonth 함수
  let date = today.getDate(); //현재 일을 가져와주는 getDate 함수
  const [owner, setowner] = useState(0);
  var token_name = "x_auth";
  token_name = token_name + "=";
  var cookieData = document.cookie;
  var start = cookieData.indexOf(token_name);
  let token = "";
  if (start != -1) {
    start += token_name.length;
    var end = cookieData.indexOf(";", start);
    if (end == -1) end = cookieData.length;
    token = cookieData.substring(start, end);
  }
  let body = {
    token: token,
  };
  useEffect(() => {
    dispatch(myInfo(body)).then(
      (response: { payload: { Success: any; id: number } }) => {
        if (response.payload.Success) {
          setowner(response.payload.id);
          console.log("owner", owner);
        } else {
          alert("아이디 가져오기 실패");
        }
      }
    );
  }, []);

  const [team_text, setText] = useState<{
    team_id?: any;
    team_name?: any;
    team_de?: any;
    team_date?: any;
    team_inviteNum?: any;
  }>();

  const onChangeText = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    console.log(e.target);
    console.log("최종 " + e.target.value);
    setText({
      ...team_text,
      [name]: value,
      team_id: nextId + 1,
      team_date: month.toString() + "월 " + date.toString() + "일",
      team_inviteNum: Math.random().toString().substring(2, 6),
    });
  };

  const add = () => {
    if (team_text?.team_name === null || team_text?.team_de === null) {
      alert("팀명 혹은 설명을 입력해주세요");
    } else {
      getName(team_text);

      let body = {
        name: team_text?.team_name,
        date: team_text?.team_date,
        info: team_text?.team_de,
        inviteNum: team_text?.team_inviteNum,
        _id: "",
        users: [owner],
        owner: owner,
        project: [0],
      };

      console.log("팀뷰 바디 확인" + body.name);

      setText({
        ...team_text,
        team_name: null,
        team_de: null,
      });

      dispatch(teamCreate(body)).then(
        (response: { payload: { success: any } }) => {
          if (response.payload.success) {
            window.location.reload();
            alert("성공");
          } else {
            alert("실패");
          }
        }
      );
      onHide();
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="top">
        {/* <Modal.Header>
      <Modal.Title id="contained-modal-title-vcenter">
      <div className="cl">
      <button onClick={onHide} className="close"><img src={close}></img></button>
      </div>
      </Modal.Title>
  </Modal.Header>*/}
      </div>
      <Modal.Body>
        <div>
          <h1 className="body_sub">팀 명</h1>
          <input
            name="team_name"
            onChange={onChangeText}
            className="pr"
            type=""
            placeholder="팀 명을 입력하세요."
          ></input>
          <h1 className="body_sub">팀 설명</h1>
          <input
            name="team_de"
            onChange={onChangeText}
            className="pr"
            type=""
            placeholder="팀 설명을 입력하세요."
          ></input>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <div className="team_foot">
          <Button className="make" variant="danger" onClick={add}>
            팀 생성
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default TeamViewAdd;
