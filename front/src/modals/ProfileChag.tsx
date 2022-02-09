import React, {useRef, useState} from 'react'
import { Modal, Button } from 'react-bootstrap'
import '../bootstrap.min.css';
import '../App.css';
interface props {
  show? : boolean;
  onHide : () => void;
  Image? : any;
  getData : (a : any) => void;
}

export const ProfileChag = (props:props) => {
  const {show, onHide, Image, getData } = props;
    const fileInput = useRef<any>(null)
    const [Image2, setImage] = useState<any>(Image)
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
             //   setFile(e.target.files[0]) //DB 관련
            }else{ //업로드 취소할 시
                setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
                return
            }
            //화면에 프로필 사진 표시
           const reader = new FileReader();
          reader.onload = () => {
              if(reader.readyState === 2){
                setImage(reader.result)
                 getData(reader.result)
             }
          }
         reader.readAsDataURL(e.target.files[0])
          }
      return (

         <Modal
         show = { show }
          onHide = { onHide }
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Change Avatar
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{textAlign:'center'}}>
        <img 
        src={Image2} 
        style={{margin:'20px',width:'400px'}} 
        alt="profile" 
        onClick={()=>{fileInput.current.click()}}
        />
        </div>
       <div className='input_file'>
        <label className="input-file-button" htmlFor="input-file" > {/* label의 for속성을 이용해 커스터마이징 */}
            Select file 
        </label>
        <input type="file"  accept='image/jpg,image/png,image/jpeg'   name='profile_img'
           onChange={onChange}   ref={fileInput} id="input-file" style={{display:"none"}}/> 
        </div>
        
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} className='close_bt' > Close</Button>
        </Modal.Footer>
      </Modal>

    );
}
