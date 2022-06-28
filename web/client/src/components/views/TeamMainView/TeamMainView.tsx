import React, { useEffect, useRef, useState } from "react";
import "../../css/ProjectPage.css";
import TeamViewAdd from "../TeamViewAdd/TeamViewAdd";
import AssignModal from "../TeamAssign/TeamAssign";
import Sidebar from "../SideBar/SideBar";
import profile from "../../images/profile.png";
import bell from "../../images/bell.png";
import square from "../../images/square.png";
import box from "../../images/box.png";
import { Table } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { codeChk, myInfo, teamData } from "../../../_actions/user_action";
import { CodeDeploy } from "aws-sdk";
import "bootstrap/dist/css/bootstrap.css";
import { message } from "antd";

const TeamMainView = () => {
  const dispatch = useDispatch<any>();
  let today = new Date(); //날짜를 계산해주는 Date 함수
  let year = today.getFullYear(); // 현재 년도를 가져와주는 getFullYear 함수
  let month = today.getMonth() + 1; // 현재 월을 가져와주는 getMonth 함수
  let date = today.getDate(); //현재 일을 가져와주는 getDate 함수
  const [subject, setsubject] = useState("팀 페이지");
  const [code, setcode] = useState(null);
  const [proModal, setproModal] = useState(false);
  const [assignModal, setAssignModal] = useState(false);
  const navigate = useNavigate();
  const [Id, setId] = useState(0);

  const [Team_list, setTeam] = useState<any>([
    {
      team_id: null,
      team_name: null,
      team_de: null,
      team_date: null,
      team_inviteNum: null,
    },
  ]);
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
  // 내 id값을 넘겨줘야함
  useEffect(() => {
    console.log("body", bodys);
    dispatch(teamData(bodys)).then(
      (response: { payload: { success: any; team: any } }) => {
        console.log(response.payload.team);
        console.log(response.payload.success);
        if (response.payload.success) {
          const Data = response.payload.team.map(
            (
              data: { info: String; name: String; _id: any; date: String },
              id: number
            ) => ({
              team_id: data._id,
              team_name: data.name,
              team_de: data.info,
              team_date: data.date,
            })
          );
          setTeam(Team_list.concat(Data));
          // response.payload.project
          // setproject({projects_list})
          // console.log(response.payload.project)
          // setproject({projects_list})
          // console.log(response.payload.project)
        } else {
          alert("실패");
        }
      }
    );
  }, [Id]);

  const code_onchange = (e: any) => {
    setcode(e.target.value);
    console.log("code", code);
  };

  const Number_chk = () => {
    let body = {
      id: Id,
      Number: code,
    };
    dispatch(codeChk(body)).then(
      (response: { payload: { Success: any; message: any; id: any } }) => {
        if (response.payload.Success) {
          alert(response.payload.id);
        } else {
          alert("실패");
        }
      }
    );
  };

  const nextId = Team_list.length; // list 개수
  console.log("next", nextId);
  const getName = (user: any) => {
    setTeam([...Team_list, user]);
  };

  const handleRowClick = (e: any, idx: any) => {
    console.log(e);
    navigate(`/TeamMainView/${e}/${idx}`);
  };

  //  <Test projects_list = {projects_list} />
  return (
    <div>
      <nav className="sidebar">
        <Sidebar></Sidebar>
      </nav>
      <header>
        <title>팀 페이지</title>
      </header>
      <body className="view">
        <div className="view_header">
          <h2 className="dashboard">{subject}</h2>
          <TeamViewAdd
            show={proModal}
            getName={getName}
            nextId={nextId}
            onHide={() => setproModal(false)}
          />
          <button className="pr_add_btn" onClick={() => setproModal(true)}>
            팀 생성{" "}
          </button>
          <input
            className="addMember"
            placeholder="초대 코드 입력"
            value={code}
            onChange={code_onchange}
          ></input>
          <button type="button" className="checkbtn" onClick={Number_chk}>
            확인
          </button>
        </div>
        <div className="tables">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>팀 번호</th>
                <th>팀 이름 </th>
                <th>팀 설명</th>
                <th> 생성일 </th>
              </tr>
            </thead>
            <tbody id="tables">
              {Team_list?.map(
                (
                  team: {
                    team_name: any;
                    team_id: any;
                    team_de: any;
                    team_date: any;
                  },
                  num: number
                ) =>
                  team.team_id !== null ? (
                    <tr>
                      <td
                        onClick={() =>
                          handleRowClick(team.team_name, team.team_id)
                        }
                      >
                        {num}
                      </td>
                      <td
                        onClick={() =>
                          handleRowClick(team.team_name, team.team_id)
                        }
                      >
                        {team.team_name}
                      </td>
                      <td
                        onClick={() =>
                          handleRowClick(team.team_name, team.team_id)
                        }
                      >
                        {team.team_de}
                      </td>
                      <td
                        onClick={() =>
                          handleRowClick(team.team_name, team.team_id)
                        }
                      >
                        {team.team_date}
                      </td>
                    </tr>
                  ) : (
                    <tr></tr>
                  )
              )}
            </tbody>
          </Table>
        </div>
      </body>
      <footer></footer>
    </div>
  );
};

export default TeamMainView;
