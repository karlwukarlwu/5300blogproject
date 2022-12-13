import { createContext, useState, useEffect } from "react";
import axios from "axios"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
    //检查本地储存 看看是否登录

    //inputs意味着login 需要一个参数
    const login = async (inputs) => {
        const res = await axios.post("/auth/login", inputs);

        setCurrentUser(res.data)
        //等于是在这里把参数传了进去 设置了currentUser
    }

    //inputs 这里不需要 那个人写错了
    const logout = async (e) => {
        await axios.post("/auth/logout");
        setCurrentUser(null)
    }

    //通过这个实时更新不同的登录用户的loaclstorage
    // 这个叫useEffect 不叫userEffect 
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
        // 你只要调用了这个包 就可以得到 currentUser,login,logout
    )
}


//这个文件的意义好像是可以让用户一直拿着自己的信息到处走

