import React,{useState,useEffect, useRef} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Table} from 'react-bootstrap';
import '../../css/CustomPage.css';
import { setEnvironmentData } from 'worker_threads';
const CustomPage = () => {

    const [dashboard] = useState("폼 페이지");
    const [user_name] = useState("기본 이름");
    
    const[projects]:any[] = useState({
        num: "기본값 숫자",
        project_name: "기본값 프로젝트",
        team_name: "기본값 팀",
        roles: "기본값 관리자",
    });

    const[learns,setLearns] = useState([
        {
            id: 1, 
            name: '1번 내용'
        },
        {
            id: 2,
            name: '2번 내용'
        },
        {
            id: 3,
            name: '3번 내용'
        },
    ])
    const[learn,setLearn] = useState("");
 
    const change = (e:any) => {
        setLearn(e.target.value);
     

    }
    const nextId = useRef(4); //아이디 그냥 순차적으로 주는거...간단

    const submit = (e:any) => {
        e.preventDefault(); //SPA 구현을 위해 submit 새로고침을 방지해줌
        console.log("서브밋 완료");
        console.log(learn);

        const addLearn = {
            id: nextId.current,
            name: learn,
        }
        setLearns([...learns, addLearn])
        console.log(learns);

        nextId.current += 1
    }


    return (
        <div>
            <div >
                <header>
                    <title>폼 페이지</title>
                </header>
                    <body  className="view" style = {{display:'fixed'}}>
                        <div className="view_header">
                        <h2 className="dashboard" >{dashboard}</h2>
                        </div>
                        <form className="learnList" onSubmit={submit}>
                            <input  name="lists" className="inputClass" type="text" value={learn} placeholder="클래스 이름을 입력하세요" onChange={change}></input>
                            <button type="submit">테스트용 버튼</button>
                            </form>
                        <div className="tables">
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                            <th>프로젝트</th>
                            <th>프로젝트 명</th>
                            <th>팀 명</th>
                            <th>내 등급</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>{projects.num}</td>
                            <td>{projects.project_name}</td>
                            <td>{projects.team_name}</td>
                            <td>{projects.roles}</td>
                            </tr>
                        </tbody>
                        </Table>
                    </div>
                </body> 
            </div>
        </div>
    );
};

export default CustomPage;