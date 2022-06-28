import dotenv from 'dotenv';
import {ACCESS_KEY,SECRET_ACCESS_KEY,S3_BUCKET,REGION  } from './s3.js';
import React, {useEffect, useRef, useState} from 'react'
import { Modal, Button } from 'react-bootstrap'
import '../../css/MyProfile.css';
import '../../css/bootstrap.min.css'
import AWS from 'aws-sdk';
import { useDispatch } from 'react-redux';
import { profileChange } from '../../../_actions/user_action'


interface props {
  show? : boolean;
  onHide : () => void;
  Image? : any;
  getData : (a : any) => void;
}

export const ProfileChange = (props:props) => {
  const {show, onHide, Image, getData } = props;
  const dispatch = useDispatch<any>();


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

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET},
  region: REGION,
});

    const fileInput = useRef<any>(null)
    const [Image2, setImage] = useState<any>(Image)
    console.log('Imageeee ', Image);
    
    const [selectedFile, setSelectedFile] = useState<any>(null);
    function uploadFile(file: any): void {
      const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: "profile/" + file.name
      };

      const body = {
        token : token,
        profile : file.name
        }

      myBucket.putObject(params)  
      .send((err) => {
        if (err) {console.log(err); return err}
      })
      
      dispatch(profileChange(body))
      .then((response: { payload: { Success: any; } }) => {
        if(response.payload.Success) {
          // alert("디비에 파일명 업로드")
        }  
        else {
          alert('실패')
        }
      })
    }
    
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
                setSelectedFile(e.target.files[0]) //DB 관련
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
        <img className='profile_Img'
        src = {Image2}
        style={{margin:'20px',width:'400px'}} 
        alt="profile" 
        onClick={()=>{fileInput.current.click()}}
        />
        </div>
       <div className='input_file'>
        <label className="input-file-button" htmlFor="input-file" > {/* label의 for속성을 이용해 커스터마이징 */}
            Select file 
        </label>
        {selectedFile?(
          <Button color="primary" onClick={() => uploadFile(selectedFile)}> Upload</Button>
        ) : null }
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