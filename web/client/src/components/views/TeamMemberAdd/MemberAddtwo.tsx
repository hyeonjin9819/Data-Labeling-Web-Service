import React, {Component, PropsWithChildren,useRef, ReactElement,useState, ChangeEvent } from 'react';
import { Button,Modal } from 'react-bootstrap';
import image from '../../images/image.png';
import box from '../../images/box.png';
import {IEmail} from './Interfaces'
import TeamEmail from './TeamEmail';

/*팀 생성 버튼에 대한 modal창을 구현하는 타입스크립트 파일*/
interface props { 
  show: boolean; 
  onHide: () => void; // 함수 타입 정의할 때 }
}

const MemberAddtwo = (props: props): ReactElement => {
  const { show, onHide } = props;
  const [projectList, setProjectList] = useState<any>([
    {
    pr_id: 1,
    pr_name: "농업 레이블링",
},
{
    pr_id: 2,
    pr_name: "의료 레이블링",
},
{
    pr_id: 3,
    pr_name: "기업 레이블링",
},
{
    pr_id: 4,
    pr_name: "동물 레이블링",
}

  ])

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
      <h3>프로젝트 리스트</h3>
      <div className ="ProjectList">
       {projectList?.map((project: any)=>{
           <ul>{project.pr_name}</ul>
       })}
        </div>
      </div>

    </Modal.Body>

    <Modal.Footer>
        <div className="team_foot">
    <Button className="make"variant="danger">invite</Button>
    </div>
    </Modal.Footer>
  </Modal>
  );
}

export default MemberAddtwo;