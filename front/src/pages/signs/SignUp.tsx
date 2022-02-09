import React, {  useState } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom"

const SignUp = () => { 
    const navigate = useNavigate()

    const[user, setUser] = useState({
        name:'',
        email:'',
        password: '',
        reEnterPassword: ''
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const{name, value} = e.target
        setUser({
            ...user,
            [name] : value
        })
    }

    const signup = () =>{
        const {name, email, password, reEnterPassword} = user
        if(name && email && password && (password=== reEnterPassword)){
            axios.post("http://localhost:9007/SignUp",user)
            .then(res =>  {
    
                //회원 가입 후 로그인 화면으로 
                navigate("/SignIn")
                alert(res.data.message) //회원가입 성공 어디감?
                
        })
     } else{
                alert("비밀번호가 일치하지 않습니다")
        }
    }

    return(
        <div className="form-container sign-up-container">
        <form className="form">
            <h1 className="form-title">회원가입</h1>

            <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="이름"/>
            <input type="email" name ="email" value ={user.email} onChange={handleChange} placeholder="이메일"/>
            <input type="password" name ="password" value = {user.password} onChange={handleChange} placeholder="패스워드"/>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} onChange={handleChange} placeholder="패스워드 확인"/>
            <button className='form-button' onClick ={signup}>sign up</button>
  
        </form>
    </div>
    )
}


// type SignUpProps ={
//     onSubmit: (form: {name: string; email: string; password: string; reEnterPassword: string}) => void;
// };

// function SignUp({onSubmit}: SignUpProps){

//     const[user, setUser] = useState({
//         name:'',
//         email:'',
//         password: '',
//         reEnterPassword: ''
//     });
//     const {name, email, password, reEnterPassword} = user;

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
//             name: '',
//             email: '',
//             password: '',
//             reEnterPassword: ''
//         }); // 초기화
//     };

//     const signup = () => {
//         const {name, email, password, reEnterPassword} = user
//         if(name && email && password && (password=== reEnterPassword)){
//             axios.post("http://localhost:9007/SignUp",user)
//             .then(res =>  alert(res.data.message))
//         } else{
//             alert("invalid input")
//         }
//     }

//     return(
//         <div className="form-container sign-up-container">
//                 <form onSubmit = {handleSubmit} className="form" action="#">
//                     <h1 className="form-title">회원가입</h1>

//                     <input type="text" name="name" value={name} placeholder="이름" onChange={ onChange }/>
//                     <input type="email" name="email" value={email} placeholder="이메일" onChange={ onChange }/>
//                     <input type="password" name="password" value={password} placeholder="패스워드" onChange={ onChange }/>
//                     <input type="password" name="reEnterPassword" value={reEnterPassword}  placeholder="패스워드 확인" onChange={ onChange}/>
//                     <button type = "submit" className="form-button" onClick={signup}>sign up</button>
//                 </form>
//             </div>
//     );
// }

export default SignUp;
