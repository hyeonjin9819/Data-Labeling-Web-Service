import React, { ReactElement, useState } from 'react';
import '../../css/Pr_add.css';
import { Button,Modal } from 'react-bootstrap';
import image from '../../images/image.png';
import text from '../../images/text.png';
import close from '../../images/close.png';
import square from '../../images/square.png';

/*프로젝트 생성 modal 버튼을 구현해주는 파일*/
interface props { 
  show: boolean; 
  getName: (a:any) => void;
  onHide: () => void; // 함수 타입 정의할 때 }
  nextId : number;
}

const Pr_add = (props: props): ReactElement => {
  let today = new Date(); //날짜를 계산해주는 Date 함수
  let year = today.getFullYear(); // 현재 년도를 가져와주는 getFullYear 함수
  let month = today.getMonth() + 1; // 현재 월을 가져와주는 getMonth 함수
  let date = today.getDate(); //현재 일을 가져와주는 getDate 함수
  const { show, getName,onHide, nextId } = props;
  const [pr_text, setText] = useState<{
  pr_id? : any,
  pr_name?: any,
  pr_de?:any,
  pr_date?: any,
  pr_tool? : any
  }>();
  const onChangeText = (e:{target :{name:any; value:any;}}) =>{
    const{name, value} = e.target;
    console.log(e.target);
    console.log('최종 '+e.target.value);
    setText ({
      ...pr_text,
    [name]:value,
    pr_id : nextId + 1,
    pr_date : month.toString() + '월'+ date.toString() + '일'
    })
  }
  const add= () =>{
    console.log('함수',pr_text?.pr_name); 
     console.log('함수',pr_text?.pr_de);
     console.log('함수',pr_text?.pr_date);
    getName(pr_text);
    onHide();
  }

  const onclick = (e:any) => {
      const tool = e.target.value;
      console.log('tool', tool);
      setText ({
        ...pr_text,
        pr_tool : tool
      })

}

  return (
    <Modal
  show = { show }
   onHide = { onHide }
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <div className="top">
    <Modal.Header>
      <Modal.Title id="contained-modal-title-vcenter">
      <Button className="p_ad" variant="danger">images<img className="img" src = {image}></img></Button> 
      <Button className="p_ad" variant="danger">texts<img className="img" src = {text}></img></Button> 
      <div className="cl">
      <button onClick={onHide} className="close"><img src={close}></img></button>
      </div>
      </Modal.Title>
    </Modal.Header>
    </div>
    <Modal.Body>
      <div>
      <h1 className="body_sub">프로젝트 명</h1>
      <input name = "pr_name"  className="pr" placeholder="이름을 입력하세요." onChange={onChangeText}></input>
        <h1 className="body_sub">프로젝트 설명</h1>
            <input name = "pr_de"  className="pr"  placeholder="설명을 입력하세요." onChange={onChangeText}></input>
            </div>
    </Modal.Body>
    <h1 className="footer_sub">레이블링 타입</h1>
    {/*<ul className="label_list">
                <input type="radio" value= "sqaure" className="label_menu"><div className="sqa"></div></input>
                <li className="label_menu">레이블링 2</li>
                <li className="label_menu">레이블링 3</li>
                <li className="label_menu">레이블링 4</li>
  </ul>*/}
  <div className="te">
  <label className="labels"  htmlFor="asdf">
  <input  onClick={onclick} name="label" type="radio" value= "sqaure" className="label_menu"></input>
  <div className="sqa"></div>

  </label>
  <label className="labels"  htmlFor="asdf">
  <input name="label" type="radio" value= "sqaure2" className="label_menu" onClick={onclick}></input>
  <div className="sqa"></div>

  </label>
  </div>
    <Modal.Footer>
    <button onClick={add} className="make">프로젝트 생성</button>
    </Modal.Footer>
  </Modal>
  );
}

export default Pr_add;