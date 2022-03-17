import React, {Component, PropsWithChildren,useRef, ReactElement,useState } from 'react';
import { Button,Modal } from 'react-bootstrap';
import image from '../../images/image.png';
import box from '../../images/box.png';
import close from '../../images/close.png';

/*팀 생성 버튼에 대한 modal창을 구현하는 타입스크립트 파일*/
interface props { 
  show: boolean; 
  onHide: () => void; // 함수 타입 정의할 때 }
}

const TeamMemberAdd = (props: props): ReactElement => {
  const { show, onHide } = props;
  // 개인 이메일 담는 곳
  const [email, setEmail] = useState('');
  // 전체 이메일 배열로 담음
  const[Email_text, setText] = useState<{
    Email? :any
  }>()

  const onChangeText = (e:{target :{name:any; value:any;}}) =>{
    const{name, value} = e.target;
    setText ({
      ...Email_text,
    [name]:value,
    })
  }

  const getEmail = (user:any)=>{
    setLists([...Email_lists, user])
  }

  const Emailadd= ()=>{
    if(Email_text?.Email === null){
      alert("초대할 팀원을 입력해주세요")
    }
    else{
      getEmail(Email_text);
      setText({
        ...Email_text,
        Email : null
      })
      onHide();
    }
  }


  const [Email_lists, setLists] = useState<any>([
    {
      email: '',
    }
  ]);
  const nextId = Email_lists.length // email 갯수
  



  return (
    <Modal
  show = { show }
   onHide = { onHide }
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >

    <Modal.Body>
      <div>
      <h1 className="body_sub">팀원 초대</h1>
    <input className="pr" type="" onChange={onChangeText} placeholder="초대할 팀원의 아이디를 입력해주세요."></input>
    <button onClick={Emailadd}>추가</button>
        <h1 className="body_sub">초대 목록</h1>
        <div>
          {Email_lists.map(
            (email: any) =>{
              <li>{email}</li>
            }
          )}
        </div>
            </div>
    </Modal.Body>

    <Modal.Footer>
        <div className="team_foot">
    <Button className="make"variant="danger">next</Button>
    </div>
    </Modal.Footer>
  </Modal>
  );
}

export default TeamMemberAdd;