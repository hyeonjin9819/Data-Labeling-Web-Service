import React, { useEffect, useRef, useState } from 'react';
import '../../css/ProjectPage.css';
import TeamViewAdd from '../TeamViewAdd/TeamViewAdd';
import Sidebar from '../SideBar/SideBar';
import profile from '../../images/profile.png';
import bell from '../../images/bell.png';
import square from '../../images/square.png';
import box from '../../images/box.png';
import { Table } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const TeamMainView = () =>{
    let today = new Date(); //날짜를 계산해주는 Date 함수
    let year = today.getFullYear(); // 현재 년도를 가져와주는 getFullYear 함수
    let month = today.getMonth() + 1; // 현재 월을 가져와주는 getMonth 함수
    let date = today.getDate(); //현재 일을 가져와주는 getDate 함수
  const [subject, setsubject] = useState("팀 페이지");
  const [proModal, setproModal] = useState(false);
  const navigate = useNavigate();

  const [Team_list, setTeam] = useState<any>([
    {
    team_id : 1,
    team_name : '팀 이름',
    team_de : '팀 설명',
    team_date : '3월 13일',
    
    team_inviteNum: 1234
    }
])
  const nextId = Team_list.length // list 개수
  console.log('next',nextId)
  const getName = (user:any)=>{
    setTeam ([...Team_list, user])
  }

  const handleRowClick = (e:any) => {
      console.log(e)
      navigate(`/TeamMainView/${e}`)
  }

//  <Test projects_list = {projects_list} />
  return(
   <div>
   <nav className="sidebar">
   <Sidebar >                                        
   </Sidebar>
   </nav>
        <header>
            <title>팀 페이지</title>
            </header>
                <body  className="view">
                    <div className="view_header">
                    <h2 className="dashboard" >{subject}</h2>
                   {/* <Link to = "/MyProfile">
                    <button  className="logout"><img className="icon" src={profile}></img></button>
  </Link>*/}
                    {/* 아래 알림 버튼 일단 초대 코드로 대체 */}
                    {/* <button  className="logout"><img className="icon" src={bell}></img></button> */} 
                    <TeamViewAdd show ={proModal} getName={getName} nextId = {nextId}  onHide={()=>setproModal(false)} />
                     <input className="pro_search" placeholder='팀 검색'></input>
                    <button className="pr_add_btn" onClick={ ()=>setproModal(true)} >팀 생성 </button> 
                    <input className='addMember' placeholder='초대 코드 입력'></input>
                    <button className="addMEmber_btn">확인</button>
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
                                
                                {
                                    Team_list.map(
                                        (team: any) => (
                                            <>
                                            <tr onClick={()=> handleRowClick(team.team_name)}>
                                            <td>{team.team_id}</td>
                                            <td>{team.team_name}</td>
                                            <td>{team.team_de}</td>
                                            <td>{team.team_date}</td>
                                            </tr>
                                            </>
                                        )
                                    )
                                }
                                    
                            </tbody>
                        </Table>
                    </div>
                </body> 
            <footer>
        </footer>
    </div>
  );
}

export default TeamMainView;