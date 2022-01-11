import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import '../bootstrap.min.css';
import '../App.css';

const onChange = () => {
  var current = document.Password.cp.value;
  var new_Pass = document.Password.np.value;
  var con_Pass = document.Password.cnp.value;

  if(current.length < 1 || new_Pass < 1 || con_Pass < 1)  {
    alert('빈칸을 입력해주세요')
  }
}

export const PassChag = ({show, onHide}) => {
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
        <form name = 'Password'>
        <div className='password_change'>
        <input className='cp' name = 'cp' type = "text" placeholder='Current Password'></input>
        <input className = 'np' name = 'np' type = "text" placeholder='New Password'></input>
        <input className = 'cnp' name = 'cnp' type = "text" placeholder='Confirm New Password'></input>
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