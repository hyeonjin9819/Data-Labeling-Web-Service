import React, { Component, useState } from 'react';
import axios from "axios"
import {Link, Navigate, useNavigate} from "react-router-dom" // 버전 6 부터 useHistory useNavigate로 바뀜


const SignIn = ({setLoginUser}: {setLoginUser:any}) => { 

    const navigate = useNavigate()

    const[user, setUser] = useState({
        email:'',
        password: '',
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const{name, value} = e.target
        setUser({
            ...user,
            [name] : value
        })
    }

    const signin = () =>{
        axios.post("http://localhost:9007/SignIn", user)
        .then(res => {
            alert(res.data.message)
            setLoginUser(res.data.user)
            navigate("/")
        })
        
    }

    return(

        <div className="form-container sign-in-container">
            <form className="form">
                <h1 className="form-title">로그인</h1>
                <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="이메일" />
                <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="패스워드" />

                <Link to ="/"><button className='form-button' onClick={signin}>sign in</button></Link>

                <a className="find-password" href="#">패스워드 찾기</a>
            </form>
        </div>
        
    )
}

// type SignInProps ={
//     onSubmit: (form: {email: string; password: string}) => void;
// };

// function SignIn({onSubmit}: SignInProps){

//     const[user, setUser] = useState({
//         email:'',
//         password: ''
//     });
//     const {email, password} = user;

//     const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
//         console.log(e.target)
//         const{name, value} = e.target;
//         setUser({
//             ...user,
//             [name]:value
//         });
//     };
//     const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
//         e.preventDefault();
//         onSubmit(user);
//         setUser({
//             email: '',
//             password: ''
//         }); // 초기화
//     };

//     const signin = () =>{
//         axios.post("http://localhost:9007/SignIn", user)
//         .then(res => alert(res.data.message))
//     }

//     return(
//         <div className="form-container sign-in-container">
//         <form onSubmit = {handleSubmit} className="form" action="#">
//             <h1 className="form-title">로그인</h1>

//             <input type="email" name ="email" value ={email} placeholder="이메일" onChange={ onChange } />
//             <input type="password" name ="password" value ={password} placeholder="패스워드" onChange={ onChange }/>
           
//             <button type = "submit" className="form-button" onClick={signin}>sign in</button>
//             <a className="find-password" href="#">패스워드 찾기</a>
//         </form>
//     </div>
//     );
// }


export default SignIn;
