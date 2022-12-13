import express from "express"
import { login, logout, register } from "../controllers/auth.js"
// 记得写js

const router = express.Router()

router.post("/register",register)

router.post("/login",login)

router.post("/logout",logout)
// 三个post 对应相应的模块有三个输出
// 区别于 posts 的router.get 方法，这个是post

export default router