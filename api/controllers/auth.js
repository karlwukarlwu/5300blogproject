
import {db} from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = (req, res) => {

    //CHECK USER
    const q ="SELECT*FROM users WHERE email =? or username =?";

    db.query(q,[req.body.email, req.body.name],(err,data)=>{
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("user already exists!");
        // data.length 意思是如果找到了 那么就说明重复了
        // status 409是一种标准码 直接记就行

        // 加密用户的密码 yarn add bcryptjs
        //hash the psw and create a user
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password,salt)

        const q ="INSERT INTO users(`username`,`email`,`password`) VALUES (?)"
        const values =[
            req.body.username,
            req.body.email,
            hash,

        ]
        db.query(q,[values],(err,data)=>{
            if(err) return res.json(err);
            return res.status(200).json("User has been created.");
            // 200意味着成功了
        })

    });


}

export const login = (req, res) => {

    const q = "SELECT * FROM users WHERE username =?"
    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.json(err);
        if(data.length===0) return res.status(404).json("user not found")
        // 在这里根据不同的需求，返回不同的错误

        //检查密码
        const isPassCorrect = bcrypt.compareSync(req.body.password,data[0].password)

        if(!isPassCorrect) return res.status(400).json("Wrong password")

        // 在这里添加验证功能

        const token = jwt.sign({id:data[0].id},"jwtkey");
        // 引入加密的token，后面的是加密的一个东西

        const {password,...other} =data[0]
        //取出 password 和 other 数组
   
        res.cookie("access_token",token,{
            httpOnly:true
        }).status(200).json(other)
        // 引入cookie


    })
    
}

export const logout = (req, res) => {

    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out.")

}


// 这里每多一个输出 ，对应的routes 模块就要多一个post url 传到第二个参数