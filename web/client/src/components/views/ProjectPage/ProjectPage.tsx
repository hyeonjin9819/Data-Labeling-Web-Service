import React, { useEffect, useRef, useState } from 'react';
import '../../css/ProjectPage.css';
import ProjectAddPage from '../ProjectAddPage/ProjectAddPage';
import Sidebar from '../SideBar/SideBar';
import profile from '../../images/profile.png';
import bell from '../../images/bell.png';
import square from '../../images/square.png';
import box from '../../images/box.png';
import { Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { projectData } from '../../../_actions/user_action';
import { AnyLengthString } from 'aws-sdk/clients/comprehend';

/*프로젝트 페이지로 넘어가면 나오는 페이지*/
const ProjectPage = () =>{
    const dispatch = useDispatch<any>();
    let pr_cnt:number = 0;
    let today = new Date(); //날짜를 계산해주는 Date 함수
    let year = today.getFullYear(); // 현재 년도를 가져와주는 getFullYear 함수
    let month = today.getMonth() + 1; // 현재 월을 가져와주는 getMonth 함수
    let date = today.getDate(); //현재 일을 가져와주는 getDate 함수
    
  const [subject, setsubject] = useState("프로젝트 페이지");
  const [proModal, setproModal] = useState(false);
  const [num, setNum] = useState(0);


const [projects_list, setproject] = useState<any>(
    [{
    pr_id : null,
    pr_name : null, 
    pr_de : null,
    pr_date : null,
    pr_category : null,
    pr_upload : null,
    pr_token : null
    }]
    )

    const getCookie: any = (name : String) => {
       // var name
    }

useEffect(()=> {
    dispatch(projectData())
    .then((response: { payload: { success: any; project : any; }; }) => {
        console.log(response.payload.project)
        if(response.payload.success) {
        const Data = response.payload.project.map(
            (data: {info : String, name: String, id:any, date: String, category:String, upload  :String, token : String}, index : number) => ({
            //  projects_list.push(data)
            //  setproject.push(data)  
            //  as(data, _id)
                
            // setproject(
            // [{...projects_list,
                   pr_id : index + 1 ,
                   pr_name : data.name,
                   pr_de : data.info,
                   pr_date : data.date,
                   pr_category : data.category,
                   pr_upload : data.upload,
                   pr_token : data.token,
            // }])    
            })
        )
        setproject(projects_list.concat(Data))
        // response.payload.project
        // setproject({projects_list})
        // console.log(response.payload.project)
        // setproject({projects_list})
        // console.log(response.payload.project)
      }
      else {
        alert('실패')
      }
     })
    },[])

  const nextId = projects_list.length // list 개수
  console.log('next',nextId)
  const getName = (user:any) => {
    setproject ([...projects_list, user])
  }

  // 프로젝트 목록에서 한줄 클릭하면 그 줄에 해당하는 페이지로 이동시키기 위한 onclick 이벤트
  const navigate = useNavigate();
  const handleRowClick = (e:any) => {
      console.log(e)
      navigate(`/ProjectPage/${e}`)
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
                    <button  className="logout"><img className="icon" src={bell}></img></button>
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
                                    <th>생성일</th>
                                    <th>프로젝트 설명</th>
                                </tr>
                            </thead>
                            <tbody id="tables">
                                {
                                    projects_list?.map(
                                        (project: {pr_id : String, pr_name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal  | undefined; pr_category: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal  | undefined; pr_upload: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal  | undefined;  pr_date: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal  | undefined; pr_de: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal  | undefined; } ,num: number) => (
                                                (project.pr_id !== null) ?
                                                (
                                            <tr onClick={()=> handleRowClick(project.pr_name)}>
                                            <td>{num}</td>
                                            <td>{project.pr_name}</td>
                                            <td>{project.pr_category}</td>
                                            <td>{project.pr_upload}</td>
                                            <td>{project.pr_date}</td>
                                            <td>{project.pr_de}</td>
                                            </tr>
                                                ) : (
                                                 <tr >
                                                </tr>
                                                ) 
                                            
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