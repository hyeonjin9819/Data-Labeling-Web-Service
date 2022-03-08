import React, { useState, useRef } from 'react';
import { PasswordChange } from './PasswordChange';
import { ProfileChange } from './ProfileChange';
import '../../css/MyProfile.css';
const Teamname = '산기대';
const Email = '이메일';

function MyProfile() {
  const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
  const fileInput = useRef(null)
  const [ImgModalon, setImgModalon] = useState(false);
  const [PassModalon, setPassModalon] = useState(false);
  const [firstName,setfirstName] = useState('Lee');
  const [lastName,setlastName] = useState('jiyoon');
  
  const getData = (Image:string) => {
    setImage(Image);
  }
  const onfirstname = (e:any) => {
    setfirstName(e.target.value);
  }
  
  const onlastname = (e:any) => {
    setlastName(e.target.value);
  }
  const Trim = () => {
    if(firstName.length < 1 || lastName.length < 1) {
      alert('이름을 입력해주세요')
    }
    else {
      alert('저장되었습니다.')
    }
  }
  
      return (
          <>
       <ProfileChange show = {ImgModalon} onHide={() => setImgModalon(false)}
        Image = {Image}
        getData={getData}
  
        />
        <PasswordChange show = {PassModalon} onHide = {() => setPassModalon(false)}/>
     
       <div className='header'>
         <h4>My Profile</h4> 
       </div>
        <hr/> 
  
       <div>
       <img className = 'profile_img'
         src={Image} 
         onClick={()=>setImgModalon(true)}
        />
        </div>
  
        <div className='user_info'>
        <h4>Team name</h4>
        <h5>{Teamname}</h5>
        <h4>Email</h4>
        <h5>{Email}</h5>
        </div>
  
      <div className='wrapper'>
        <h4>First Name</h4>
        <input type='text' className = 'firstName' value={firstName} onChange={onfirstname}></input>
        <h4>Last Name</h4>
        <input type='text' className = 'lastName' value={lastName} onChange={onlastname}></input>
      </div>
      <div className='save'>
        <button className='save_button' onClick={Trim}> Save</button>
      </div>
  
      <div className='Password'>
        <h4>Password</h4>
        <p>You can set a new Password</p>
        <button className='pass_btn' onClick={()=>setPassModalon(true)}>Change Password</button>
      </div>
  
        </>
    );
}

export default MyProfile;
