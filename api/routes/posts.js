import express from "express"
import { addPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.js"
// 导入文件需要手动写入后缀名

const router = express.Router()

// router.get("/test",(req,res)=>{ //这个url 会出现在index 写好的url之后
//     res.json("this is post")
// }) 
// // 接下来将这个方法封装到controllers 的post里面
// router.get("/test",addPost)


router.get("/",getPosts)
router.get("/:id",getPost)
router.post("/",addPost)
router.delete("/:id",deletePost)
router.put("/:id",updatePost)
// 这些方法是写死的，没有update方法

export default router
// 这行很重要 不然报错