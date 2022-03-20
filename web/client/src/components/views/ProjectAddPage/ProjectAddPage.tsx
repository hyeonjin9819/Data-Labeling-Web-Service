import React, { ReactElement, useState } from 'react';
import '../../css/ProjectAddPage.css';
import {useDispatch} from 'react-redux'
import {projectCreate, findEmail} from '../../../_actions/user_action';
import { Button,Modal } from 'react-bootstrap';
import image from '../../images/image.png';
import text from '../../images/text.png';
import close from '../../images/close.png';
import square from '../../images/square.png';

/*프로젝트 생성 modal 버튼을 구현해주는 파일*/
interface props { 
  show: boolean; 
  onHide: () => void; // 함수 타입 정의할 때 }
  getName: (a:any) => void;
  nextId : number;
}

const ProjectAddPage = (props: props): ReactElement => {
  const dispatch = useDispatch<any>();
  let today = new Date(); //날짜를 계산해주는 Date 함수
  let year = today.getFullYear(); // 현재 년도를 가져와주는 getFullYear 함수
  let month = today.getMonth() + 1; // 현재 월을 가져와주는 getMonth 함수
  let date = today.getDate(); //현재 일을 가져와주는 getDate 함수
  const { show, getName,onHide, nextId } = props;

  const [email_user, setemail_user] = useState<any>(null)

  var token_name = 'x_auth'
  token_name = token_name + '='; 
  var cookieData = document.cookie; 
  var start = cookieData.indexOf(token_name);
  let token = ''; 
  if(start != -1){
       start += token_name.length; 
       var end = cookieData.indexOf(';', start); 
       if(end == -1) end = cookieData.length; 
       token = cookieData.substring(start, end);
}
// let bodys = {
//   tokens : token
// }
// console.log("바디",bodys)
 // 로그인 되어 있는 사람의 토큰값

  const [pr_text, setText] = useState<{
  pr_id? : any,
  pr_name?: any,
  pr_de?:any,
  pr_date?: any,
  pr_tool? : any,
  pr_upload? : any,
  pr_category? : any
  }>();

  const onChangeText = (e:{target :{name:any; value:any;}}) =>{
    const{name, value} = e.target;
    setText ({
      ...pr_text,
    [name]:value,
    pr_id : nextId + 1,
    pr_date : month.toString() + '월'+ date.toString() + '일'
    })
  }
  const add= () =>{
    if(pr_text?.pr_name === null || pr_text?.pr_de ===null){
      alert("프로젝트명 혹은 설명을 입력해주세요");
    }
    else {

    let body = {
      user_token : token,
      id : pr_text?.pr_id,
      name:pr_text?.pr_name,
      category :pr_text?.pr_category,
      upload: pr_text?.pr_upload,
      tool: pr_text?.pr_tool,
      date: pr_text?.pr_date,
      info:pr_text?.pr_de
    }

    getName(pr_text);

    // if(email_user===null){
    // dispatch(findEmail(bodys))
    //    .then((response: { payload: { Success: any; email : any}; }) => {
    //      if(response.payload.Success) {
    //          setemail_user(response.payload.email.toString())
    //      }  
    //      else {
    //        alert(token)
    //      }
    //    })}
    
  setText({
    ...pr_text,
    pr_name : null,
    pr_de : null
  })

    dispatch(projectCreate(body))
    .then((response: { payload: { success: any; }; }) => {
      if(response.payload.success) {
          alert("성공")
      }  
      else {
        alert('실패')
      }
    })

    onHide();
    }
  }

const cus_input = (e: any) => {
  const category = e.target.value;

  setText ({
   ...pr_text,
   pr_category : category
 })
}

  const ontool = (e:any) => {
      const tool = e.target.value;
      console.log('tool', tool);
      setText ({
        ...pr_text,
        pr_tool : tool
      })
}

const onupload = (e:any) => {
  const upload = e.target.value;
  console.log('upload', upload);
  setText ({
    ...pr_text,
    pr_upload : upload
  })
}

const oncategory = (e:any) => {
  const category2 = e.target.value;
  console.log('category234', category2);
  (document.getElementById('as') as HTMLInputElement).value = '';
  setText ({
    ...pr_text,
    pr_category : category2
  })
  document.getElementById('as')?.setAttribute('disabled', 'true');
}

const dis_check = () => {
   const cc = document.getElementById('as')
   cc?.removeAttribute("disabled");
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
  { /* <Modal.Header>
      <Modal.Title id="contained-modal-title-vcenter">
      <Button className="p_ad" variant="danger">images<img className="img" src = {image}></img></Button> 
      <Button className="p_ad" variant="danger">texts<img className="img" src = {text}></img></Button> 
      <div className="cl">
      <button onClick={onHide} className="close"><img src={close}></img></button>
      </div>
      </Modal.Title>
  </Modal.Header>*/}
    </div>
    <Modal.Body>
      <div >
      <h4 className="body_sub" style = {{marginTop: '5px'}}>프로젝트 명</h4>
      <input name = "pr_name"  className="pr" placeholder="이름을 입력하세요." onChange={onChangeText} style = {{width : '50%'}}></input>
        <h4 className="body_sub">프로젝트 설명</h4>
        <input name = "pr_de"  className="pr"  placeholder="설명을 입력하세요." onChange={onChangeText} style = {{width : '50%'}}></input>
            </div>
            </Modal.Body>
       <h4 className="footer_sub">카테고리 선택</h4>
       <div className="te" style = {{textAlign : 'center'}}>
       <label className="labels"  htmlFor="asdf">
       <input  onClick={oncategory} name="category" type="radio" value= "의료" className="label_method"></input>
       <div>의료</div>
       </label>
       <label className="labels"  htmlFor="asdf">
       <input name="category" type="radio" value= "농업" className="label_method" onClick={oncategory}></input>
       <div>농업</div>
       </label>

       <label className="labels"  htmlFor="asdf" style={{display :'inlineBlock'}}>
       <input name="category" type="radio" id = "label_" value= "사용자입력"  className="label_" onClick={dis_check}></input>
       <div>사용자 입력</div>
      
       </label>
       <label>
       <input type = "text" id = "as" name = "as" className = "text1" style={{display :'inlineBlock'}} onChange = {cus_input} disabled></input>
       </label>
       </div>
     <h4 className="footer_sub">업로드 타입</h4>
    <div className="te">
    <label className="labels"  htmlFor="asdf">
    <input  onClick={onupload} name="upload" type="radio" value= "Image" className="label_method"></input>
    <div>Image</div>
    </label>
    <label className="labels"  htmlFor="asdf">
    <input name="upload" type="radio" value= "text" className="label_method" onClick={onupload}></input>
    <div>Text</div>
    </label>
    </div>
    <h4 className="footer_sub">레이블링 타입</h4>
    {/*<ul className="label_list">
                <input type="radio" value= "sqaure" className="label_menu"><div className="sqa"></div></input>
                <li className="label_menu">레이블링 2</li>
                <li className="label_menu">레이블링 3</li>
                <li className="label_menu">레이블링 4</li>
  </ul>*/}

  <div className="te">
  <label className="labels"  htmlFor="asdf">
  <input  onClick={ontool} name="label" type="radio" value= "square" className="label_menu"></input>
  <div className="square"></div>

  </label>
  <label className="labels"  htmlFor="asdf">
  <input name="label" type="radio" value= "box" className="label_menu" onClick={ontool}></input>
  <div className="box"></div>
  </label>
  </div>
    <Modal.Footer>
    <Button onClick={add} className="make">프로젝트 생성</Button>
    </Modal.Footer>
  </Modal>
  );
}

export default ProjectAddPage;