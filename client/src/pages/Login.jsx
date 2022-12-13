import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { AuthContext } from "../context/authContext";



const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });
    const [err, setError] = useState(null);

    const navigate = useNavigate();

    const {login}= useContext(AuthContext)
    
    // console.log(currentUser)

    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // await axios.post("/auth/login", inputs)
            // // 在这里将数据交给后端进行交互
            // 优化过后，把这行拿到authContext里面去了 登录不用验证有一条是这里没用await
            await login(inputs)

            navigate("/")

        } catch (err) {
            setError(err.response.data)
        }

    }
    console.log(inputs)

    return (
        <div className="auth">
            <h1>Login</h1>
            <form>
                <input required type="text" name="username" onChange={handleChange} placeholder='username' />
                <input required type="password" name="password" onChange={handleChange} placeholder='password' />
                <button onClick={handleSubmit} >Login</button>
                {err && <p>{err}!</p>}
                <span>Don't you have an account?<Link to="/register">Register</Link>
                    {/* Link 用的也是 react-router-dom的 */}
                </span>
            </form>
        </div>
    )
}

export default Login