import React, { useEffect, useRef, useState } from 'react';
import '../../css/Pr_main.css';
import Pr_add from './Pr_add';
import Sidebar from '../../navs/Sidebar';
import profile from '../../images/profile.png';
import bell from '../../images/bell.png';
import square from '../../images/square.png';
import { Table } from 'react-bootstrap';
import {Link} from 'react-router-dom';


/*프로젝트 페이지로 넘어가면 나오는 페이지*/
const Pr_main = () =>{
    let pr_cnt:number = 0;
    let today = new Date(); //날짜를 계산해주는 Date 함수
    let year = today.getFullYear(); // 현재 년도를 가져와주는 getFullYear 함수
    let month = today.getMonth() + 1; // 현재 월을 가져와주는 getMonth 함수
    let date = today.getDate(); //현재 일을 가져와주는 getDate 함수
  const [subject] = useState("프로젝트 페이지");
  const [proModal, setproModal] = useState(false);

  const [projects_list, setproject] = useState<any>([
    {
    pr_id : 1,
    pr_name : "지윤", 
    pr_de : "레이블링" ,
    pr_date : "2월 17일",
    pr_tool : "bounding box"
    },
    {
    pr_id : 2,
    pr_name : "지윤", 
    pr_de : "레이블링" ,
    pr_date : "2월 17일",
    pr_tool : "bounding box"
    }
])
  const nextId = projects_list.length // list 개수
  console.log('next',nextId)
  const getName = (user:any)=>{
    setproject ([...projects_list, user])
  }

  
  return(
    <div >
    <nav className="sidebar">
   <Sidebar>                                        
       </Sidebar>
    </nav>
        <header>
            <title>레이블링 페이지</title>
            </header>
                <body  className="view">
                    <div className="view_header">
                    <h2 className="dashboard" >{subject}</h2>
                    <button  className="logout"><img className="icon" src={profile}></img></button>
                    <button  className="logout"><img className="icon" src={bell}></img></button>
                    <Pr_add show ={proModal} getName={getName} nextId = {nextId} onHide={()=>setproModal(false)} />
                     <input className="pro_search" placeholder='프로젝트 검색'></input>
                    <button className="pr_add_btn" onClick={ ()=>setproModal(true)} >프로젝트 생성 </button> 
                     </div>

                    <div className="tables">               
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>프로젝트 번호</th>
                                    <th>프로젝트 명</th>
                                    <th>레이블링 타입</th>
                                    <th>마지막 갱신일</th>
                                    <th>프로젝트 설명</th>
                                </tr>
                            </thead>
                            <tbody id="tables">
                                
                                {
                                    projects_list.map(
                                        (project: any) => (
                                            <>
                                            <tr key={project.pr_id}>
                                            <td>{project.pr_id}</td>
                                            <td>{project.pr_name}</td>
                                            <td>{project.pr_tool}</td>
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

export default Pr_main;