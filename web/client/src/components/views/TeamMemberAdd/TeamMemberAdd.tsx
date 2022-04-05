import React, {Component, PropsWithChildren,useRef, ReactElement,useState, ChangeEvent } from 'react';
import { Button,Modal } from 'react-bootstrap';
import image from '../../images/image.png';
import box from '../../images/box.png';
import {IEmail} from './Interfaces'
import TeamEmail from './TeamEmail';
import MemberAddtwo from './MemberAddtwo';
import {useDispatch} from 'react-redux'
import {teamMailUser} from '../../../_actions/user_action';
import close from '../../images/close.png';
import { getValue } from '@testing-library/user-event/dist/utils';
import { useCallback } from 'react';
import { AnyRecord } from 'dns';


/*팀 생성 버튼에 대한 modal창을 구현하는 타입스크립트 파일*/
interface props { 
  show: boolean; 
  //getEmail: (a:any) => void;
  onHide: () => void; // 함수 타입 정의할 때
  //nextId : number;
}

const TeamMemberAdd = (props: props): ReactElement => {
  const { show, onHide } = props;
  const dispatch = useDispatch<any>();
  const [email, setEmail] = useState<string>("");
  const [emailList, setEmailList] = useState<IEmail[]>([]);
  const [proModal, setproModal] = useState(false);
  const [checkedList, setCheckedLists] = useState([]);
  const [addMemEmail, setAddMemEmail] = useState("")
  const [number, setnumber] = useState("")
  const [Auth, setAuth] = useState("")


  const [projecList, setProjectList] = useState<any>([
    {
      project_id: 1,
      project_name: 'kpu 프로젝트'
    },
    {
      project_id: 2,
      project_name: '의류 프로젝트'
    }

  ])



  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if(event.target.name === 'email'){
      setEmail(event.target.value)
    }
  };



  const addEmail = (): void => {
    const newEmail = {emailName: email}
    if(email.length < 1){
      alert("이메일을 입력해주세요!")
    }else{
      setEmailList([...emailList, newEmail]);
      console.log(emailList);
      setEmail("")
    }
  }


  const deleteEmail = (emailNameToDelete: string):void => {
    setEmailList(emailList.filter((email)=>{
      return email.emailName != emailNameToDelete
    }))
  }


    // 이메일 보내기
    const sendEmail = (e:{ preventDefault: () => void; }) =>{
      e.preventDefault();
      console.log('email', addMemEmail);
  
      let body = {
        email : emailList
      }
  
      dispatch(teamMailUser(body))
      .then((response: {payload: {success: any, number: any};})=>{
        if(response.payload.success) {
          setnumber(response.payload.number);
          alert("인증 번호 보내기 완료")
        }
        else{
          alert('인증번호 보내기 실패')
        }
      })
    }

    // submit
    const onSubmitHandler = (e: {preventDefault : () => void;}) => {
      e.preventDefault();

      console.log('addMemEmail', addMemEmail);

      if(Auth === "" || Auth !== number){
        console.log(Auth + "누구인가")
        console.log(number + "인증번호? 맞는지 확인 필요")
        return alert('이메일 인증을 완료해주세요')
      }

      let body = {
        email: addMemEmail // 근데 eamil 하나 보내는게 아니라 리스트를 보내야함
      }

    }

    

  // const getCheckboxValue = (event:any):any => {
  //   var result = ;
  //   if(event.target.checked){
  //     result = event.target.value;
  //   }else{
  //     result = '';
  //   }
  //   console.log(result)
  // }



  return (
    <Modal
  show = { show }
   onHide = { onHide }
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >

    <Modal.Body>
    <div className="TeamMemberAdd">
      <h4>팀원 초대</h4>
      <div className ="inputContainer">
      <input type ="text" name ='email' value={email} onChange={handleChange} placeholder = "이메일을 입력해주세요"/>
      <button onClick={addEmail}>추가</button>
      </div>
      <h4>팀원 리스트</h4>
      <div className ="EmailList">
        {emailList.map((email: IEmail) => {
          return <TeamEmail email={email} deleteEmail = {deleteEmail}/>;
        })}
        </div>
      </div>

    <h4>프로젝트 선택</h4>
    <div className="ProjectAdd">
      {
      projecList.map((project:any)=>(
        <label key={project.project_id} className="projectBox">
        <input type="checkbox" name = 'project' value={project.project_name} ></input>
        {project.project_name}

        <div id = 'result'></div>
        <br/>
        </label>
      ))}
      {/* <table>
        <tbody id = "table">
          {
            projecList.map((project:any)=>(
              <tr>
                <td>{project.project_name}</td>
              </tr>
            ))
          }
        </tbody>
      </table> */}
    </div>



    </Modal.Body>

    <Modal.Footer>
        <div className="team_foot">
          <MemberAddtwo show = {proModal} onHide={()=>setproModal(false)}/>
    <Button onClick={sendEmail}>invite</Button>
    </div>
    </Modal.Footer>
  </Modal>
  );
}

export default TeamMemberAdd;