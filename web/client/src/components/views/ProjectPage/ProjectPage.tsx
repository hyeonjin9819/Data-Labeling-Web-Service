import React, { useEffect, useRef, useState } from 'react';
import '../../css/ProjectPage.css';
import ProjectAddPage from '../ProjectAddPage/ProjectAddPage';
import Sidebar from '../SideBar/SideBar';
import Notification from '../Notification/Notification';
import profile from '../../images/profile.png';
import bell from '../../images/bell.png';
import square from '../../images/square.png';
import box from '../../images/box.png';
import { Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

/*프로젝트 페이지로 넘어가면 나오는 페이지*/
const ProjectPage = () =>{
    let pr_cnt:number = 0;
    let today = new Date(); //날짜를 계산해주는 Date 함수
    let year = today.getFullYear(); // 현재 년도를 가져와주는 getFullYear 함수
    let month = today.getMonth() + 1; // 현재 월을 가져와주는 getMonth 함수
    let date = today.getDate(); //현재 일을 가져와주는 getDate 함수
    
  const [subject, setsubject] = useState("프로젝트 페이지");
  const [proModal, setproModal] = useState(false);
  const [notiModal, setNotiModal] = useState(false);
  const [num, setNum] = useState(0)
  const [Id, setId] = useState(0)

  const [projects_list, setproject] = useState<any>([
    {
    //pr_id : 1,
    pr_name : "지윤", 
    pr_de : "레이블링" ,
    pr_date : "2월 17일",
    pr_tool : "square",
    pr_category : "의료",
    pr_upload : "Image",
    }
    // {
    // pr_id : 2,
    // pr_name : "지윤", 
    // pr_de : "레이블링" ,
    // pr_date : "2월 17일",
    // pr_tool : "box",
    // pr_category : "농업",
    // pr_upload : "Text",
    // }
])
  const nextId = projects_list.length // list 개수
  console.log('next',nextId)
  const getName = (user:any)=>{
    setproject ([...projects_list, user])
  }

  // 프로젝트 목록에서 한줄 클릭하면 그 줄에 해당하는 페이지로 이동시키기 위한 onclick 이벤트
  const navigate = useNavigate();
  const handleRowClick = (e:any) => {
      console.log(e)
      navigate(`/DataPage/${e}`)
  }

//  <Test projects_list = {projects_list} />
  return(
   <div>
  
   <nav className="sidebar">
   <Sidebar projects_list = {projects_list} >                                        
   </Sidebar>
   </nav>
        <header>
            <title>프로젝트 페이지</title>
            </header>
                <body  className="view">
                    <div className="view_header">
                    <h2 className="dashboard" >{subject}</h2>
                   {/* <Link to = "/MyProfile">
                    <button  className="logout"><img className="icon" src={profile}></img></button>

  </Link>*/}
                    <button  className="logout" onClick={() => setNotiModal(true)}><img className="icon" src={bell}></img></button>
                    <Notification show = {notiModal} getName={getName} nextId = {nextId} onHide ={()=>setNotiModal(false)}/>
                    <ProjectAddPage show ={proModal} getName={getName} nextId = {nextId} onHide={()=>setproModal(false)} />
                     <input className="pro_search" placeholder='프로젝트 검색'></input>
                    <button className="pr_add_btn" onClick={ ()=>setproModal(true)} >프로젝트 생성 </button> 
                     </div>
                    <div className="tables">               
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>프로젝트 번호</th>
                                    <th>프로젝트 명</th>
                                    <th>카테고리</th>
                                    <th>업로드 타입</th>
                                    <th>레이블링 타입</th>
                                    <th>생성일</th>
                                    <th>프로젝트 설명</th>
                                </tr>
                            </thead>
                            <tbody id="tables">
                                {
                                    projects_list?.map(
                                        (project: { pr_name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; pr_category: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; pr_upload: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; pr_tool: any; pr_date: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; pr_de: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; } ,num: number) => (
                                            <>
                                            <tr onClick={()=> handleRowClick(project.pr_name)}>
                                            <td>{num+1}</td>
                                            <td>{project.pr_name}</td>
                                            <td>{project.pr_category}</td>
                                            <td>{project.pr_upload}</td>
                                            <td> 
                                            <img src = {require(`../../images/${project.pr_tool}.png`)}/>
                                            </td>
                                            <td>{project.pr_date}</td>
                                            <td>{project.pr_de}</td>
                                            </tr>
                                            </>
                                        )
                                    )
                                }
                               {/* {
                                    projects_list.pr_name != null ? (
                                    <>
                                    <td></td>
                                    <td>{projects_list.pr_name}</td>
                                    <td>{projects_list?.pr_tool}</td>
                                    <td>{projects_list?.pr_date}</td>
                                    <td>{projects_list?.pr_de}</td>
                                    </>
                                ) :
                                (
                                   <>
                                   </>
                                )
                                }*/}
                            </tbody>
                        </Table>
                    </div>
                </body> 
            <footer>
        </footer>
    </div>
  );
}

export default ProjectPage;