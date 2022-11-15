import React, { useState } from "react";
import Sidebar from "../../views/SideBar/SideBar";
import { Table } from "react-bootstrap";
import "../../css/Mainview.css";
import TeamViewAdd from "../TeamViewAdd/TeamViewAdd";
import TeamMemberAdd from "../TeamMemberAdd/TeamMemberAdd";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { teammemberList, teamNumber } from "../../../_actions/user_action";
import TeamAssign from "../TeamAssign/TeamAssign";

/*팀 페이지에 대한 구현을 해준 타입스크립트 파일*/
const TeamView = () => {
  const [assignModal, setAssignModal] = useState(false);
  const dispatch = useDispatch<any>();
  const { teamId, idx } = useParams();
  console.log("idx", idx);
  const [proModal, setproModal] = useState(false);
  const [subject, setsubject] = useState("팀" + idx);
  const [Number, setNumber] = useState(0);
  const [teams, setteams] = useState([
    {
      team_name: null,
      team_email: null,
      team_id: null,
    },
  ]);
  let body = {
    _id: idx,
  };

  useEffect(() => {
    dispatch(teamNumber(body)).then(
      (response: { payload: { Success: any; number: any } }) => {
        if (response.payload.Success) {
          //alert("초대 코드 성공" + response.payload.number)
          setNumber(response.payload.number);
        } else {
          // alert('이미지 업로드 실패')
        }
      },
      []
    );

    dispatch(teammemberList(body)).then(
      (response: { payload: { success: any; teamlist: any } }) => {
        if (response.payload.success) {
          //alert("초대 코드 성공" + response.payload.number)
          //  alert(response.payload.teamlist)
          const Data = response.payload.teamlist.map(
            (data: { name: String; email: String; id: Number }) => ({
              team_name: data.name,
              team_email: data.email,
              team_id: data.id,
            })
          );
          console.log("Data", Data);
          setteams(teams.concat(Data));
        } else {
          alert("팀 유저들 가져오기 실패");
        }
      }
    );
  }, []);

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
          <h2 className="dashboard">{teamId}</h2>
          <div>
            <TeamAssign
              teams={teams}
              show={assignModal}
              onHide={() => setAssignModal(false)}
            />
            <button
              className="pr_assign_btn"
              onClick={() => setAssignModal(true)}
            >
              프로젝트 배정
            </button>
          </div>
          <div>
            <TeamMemberAdd
              Number={Number}
              show={proModal}
              onHide={() => setproModal(false)}
            />
            <button className="tm_add_btn" onClick={() => setproModal(true)}>
              팀원 초대{" "}
            </button>
          </div>
        </div>
        <div className="tables">
          <Table striped bordered hover>
            <thead className="t_head">
              <tr className="team_members">
                <h3>구성원 목록</h3>
              </tr>
              <tr>
                <th>{"이름"}</th>
                <th>{"이메일"}</th>
              </tr>
            </thead>
            <tbody>
              {teams?.map(
                (team_list: { team_name: String; team_email: String }) =>
                  team_list.team_name !== null ? (
                    <tr>
                      <th>{team_list.team_name}</th>
                      <th>{team_list.team_email}</th>
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

export default TeamView;
