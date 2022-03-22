import React, {Component, PropsWithChildren,useRef, ReactElement,useState, ChangeEvent } from 'react';
import { Button,Modal } from 'react-bootstrap';
import image from '../../images/image.png';
import box from '../../images/box.png';
import {IEmail} from './Interfaces'
import TeamEmail from './TeamEmail';
import MemberAddtwo from './MemberAddtwo';

/*팀 생성 버튼에 대한 modal창을 구현하는 타입스크립트 파일*/
interface props { 
  show: boolean; 
  onHide: () => void; // 함수 타입 정의할 때 }
}

const TeamMemberAdd = (props: props): ReactElement => {
  const { show, onHide } = props;

  const [email, setEmail] = useState<string>("");
  const [emailList, setEmailList] = useState<IEmail[]>([]);
  const [proModal, setproModal] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if(event.target.name === 'email'){
      setEmail(event.target.value)
    }
  };

  const addEmail = (): void => {
    const newEmail = {emailName: email}
    setEmailList([...emailList, newEmail]);
    console.log(emailList);
    setEmail("")
  }

  const deleteEmail = (emailNameToDelete: string):void => {
    setEmailList(emailList.filter((email)=>{
      return email.emailName != emailNameToDelete
    }))
  }

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
      <h3>팀원 초대</h3>
      <div className ="inputContainer">
      <input type ="text" name ='email' value={email} onChange={handleChange} placeholder = "이메일을 입력해주세요"/>
      <button onClick={addEmail}>추가</button>
      </div>
      <h3>팀원 리스트</h3>
      <div className ="EmailList">
        {emailList.map((email: IEmail) => {
          return <TeamEmail email={email} deleteEmail = {deleteEmail}/>;
        })}
        </div>
      </div>

    </Modal.Body>

    <Modal.Footer>
        <div className="team_foot">
          <MemberAddtwo show = {proModal} onHide={()=>setproModal(false)}/>
    <Button className="make"variant="danger" onClick={()=>setproModal(true)}>next</Button>
    </div>
    </Modal.Footer>
  </Modal>
  );
}

export default TeamMemberAdd;