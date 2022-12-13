import React, { useState } from "react";
import {Link,useNavigate} from 'react-router-dom'
import axios from "axios"

const Register =() =>{
    const[inputs,setInputs]=useState({
        username:"",
        email:"",
        password:"",
    })//useState 也是一个钩子 但是我不知道是什么

    const [err,setError] =useState(null)
    // 他这一步是获取error 重复的data

    const navigate = useNavigate()

    const handleChange = e =>{
        setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try{
            await axios.post("/auth/register",inputs)
            // 这一步是将input 交给后端 前后端交互
            navigate("/login")
            // 这个是app 的url 
        //     path:"/register",
        //     element: <Register/>,
        //   },
        //   {
        //     path:"/login",
        //     element: <Login/>


            // const res = await axios.post("/auth/register",inputs)
            // 这一步好像可以直接动用数据库了，但是我感觉还是少了cors
            // console.log(res)
        }catch(err){
           setError(err.response.data) 
        }
        
        // 因为之前代理写好了默认地址，因此只用写默认地址之后的url即可
    }

    console.log(inputs)
    // 这一行可以保证我控制台看见错误
    return(
        <div className="auth">
            <h1>Register</h1>
            <form>
                <input required type= "text" onChange={handleChange}  name ="username" placeholder ='username'/>
                <input required type= "email" onChange={handleChange} name = "email" placeholder="email"/>
                <input required type = "password" onChange={handleChange} name = "password" placeholder ='password'/>
                <button onClick={handleSubmit}>Register</button>
                {err && <p>{err}!</p>}
                {/* 如果catch err 显示这个文本框并展示 err的文字 */}
                <span>Do you have an account?<Link to ="/login">Login</Link>
                {/* Link 用的也是 react-router-dom的 */}
                </span>
            </form>
        </div>
    )
}

export default Register