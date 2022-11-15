import { message } from "antd";
import { String } from "aws-sdk/clients/apigateway";
import React, { useState, ReactElement, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  myInfo,
  projectData,
  projectInsert,
} from "../../../_actions/user_action";
import "../../css/TeamAssign.css";

/*팀 생성 버튼에 대한 modal창을 구현하는 타입스크립트 파일*/
interface props {
  show: boolean;
  onHide: () => void; // 함수 타입 정의할 때 }
  //getName: (a:any) => void;
  //nextId : number;
  teams: any;
}

const TeamAssign = (props: props): ReactElement => {
  // 내가 속해 있는 프로젝트 목록 가져오기
  // 토큰 -> 내 아이디 번호
  const [Id, setId] = useState(0);
  const dispatch = useDispatch<any>();
  const { show, onHide, teams } = props;
  console.log("teams", teams);
  const [projecList, setProjectList] = useState<any>([
    {
      pr_name: null,
      pr_id: null,
    },
  ]);

  const [nn, setnn] = useState({
    number: null,
  });

  let project_num: any = [];
  let user_num: any = [];
  for (let i = 1; i < teams.length; i++) {
    user_num.push({ _id: teams[i].team_id });
  }
  console.log("mn", user_num);
  //[{user : num},{},{}]
  // setnn({...nn, number : user_num})
  // let user_num : any= teams.team_id
  const projectinsert = () => {
    let body = {
      pro_id: project_num,
      user_id: user_num,
    };
    console.log("pro_id", body.pro_id);
    console.log("user_id", body.user_id);
    dispatch(projectInsert(body)).then(
      (response: { payload: { success: any; message: String } }) => {
        if (response.payload.success) {
          // alert(message)
        } else {
          alert("아이디 가져오기 실패");
        }
      }
    );
  };
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
          // 내 id값
          setId(response.payload.id);
          console.log("id값", response.payload.id);
        } else {
          alert("아이디 가져오기 실패");
        }
      }
    );
  }, [Id]);
  let bodys = {
    id: Id,
  };
  // ㄴㅐ id값을 넘겨줘야함
  useEffect(() => {
    console.log("body", bodys);
    dispatch(projectData(bodys)).then(
      (response: { payload: { success: any; project: any } }) => {
        if (response.payload.success) {
          const Data = response.payload.project.map(
            (data: { name: String; _id: Number }) => ({
              pr_name: data.name,
              pr_id: data._id,
            })
          );
          setProjectList(projecList.concat(Data));
        } else {
          alert("실패");
        }
      }
    );
  }, [Id]);

  const onCheck = (e: any) => {
    //개별 체크박스를 선택, 해제 시켜주는 함수
    if (e.target.checked) {
      e.target.checked = true;
      project_num.push(parseInt(e.target.id));
      console.log("e.target.id", e.target.id);
    } else {
      e.target.checked = false;
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
      <Modal.Body>
        <div className="body_sub">
          <h1>프로젝트 목록</h1>
        </div>
        <div className="body_main">
          <div>
            {projecList.map(
              (project: { pr_name: any; pr_id: any }, num: number) =>
                project.pr_name !== null ? (
                  <h5>
                    <input
                      id={project.pr_id}
                      className="check"
                      type="checkbox"
                      onChange={onCheck}
                    ></input>
                    {project.pr_name}
                  </h5>
                ) : (
                  <h5></h5>
                )
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="team_foot">
          <Button className="make" variant="danger" onClick={projectinsert}>
            프로젝트 배정
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default TeamAssign;
