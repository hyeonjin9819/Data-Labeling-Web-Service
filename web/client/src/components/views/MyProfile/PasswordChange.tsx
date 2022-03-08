import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import '../../css/bootstrap.min.css'
import '../../css/MyProfile.css';
interface Props {
  show? : boolean;
  onHide : () => void;
}

export const PasswordChange  = (props : Props )  => {
  const {show, onHide} = props;
  const [currentpassword, setcurrent] = useState("");
  const [newpassword, setnew] = useState("");
  const [confirmpassword, setconfirm] = useState("");

  const onChange = (e:any) => {
    if(currentpassword.length < 1 || newpassword.length < 1 || confirmpassword.length < 1)  {
      alert('빈칸을 입력해주세요')
    }
  }

  const currentpass = (event:any) => {
    setcurrent(event.target.value)
  }
  const newpass = (event:any) => {
    setnew(event.target.value)
  }
  const confirmpass = (event:any) => {
    setconfirm(event.target.value)
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
            Password Change
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form >
        <div className='password_change'>
        <input className='cp' name = 'cp' type = "text" placeholder='Current Password' onChange={currentpass}></input>
        <input className = 'np' name = 'np'  type = "text" placeholder='New Password' onChange={newpass}></input>
        <input className = 'cnp' name = 'cnp'  type = "text"  placeholder='Confirm New Password' onChange={confirmpass}></input>
        <br/>
        </div>
        </form>
        <button className='pwbt' onClick={onChange}>Change Password</button>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} className='close_bt' > Close</Button>
        </Modal.Footer>
      </Modal>
    )
}