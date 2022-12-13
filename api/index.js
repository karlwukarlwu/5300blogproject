import express from "express"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"
import postRoutes from "./routes/posts.js"
import cookieParser from "cookie-parser"
import multer from "multer"
// 好像这个import 的导入不是导入指定模块 而是根据export给他命名

const app = express()

app.use(express.json())

//在这里加上一层自己要的
app.use(cookieParser())


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload')
    //    将所有文件存到这个文件夹里面
    },
    filename: function (req, file, cb) {
        cb(null,Date.now()+file.originalname)
    //    在保护已经上传的文件的情况下留原来的后缀名

    }
})
//这个api是从外部引入的

const upload = multer({storage})

//这里要具体写api是因为代理只配了client的
app.post('/api/upload',upload.single('file'),function (req,res){
    const file = req.file;
    res.status(200).json(file.filename)
})
//这个也是外部引入的 手动配置你要存入的文件夹


app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);

// app.get("/test",(req,res)=>{
//     res.json("it works!")
// })

app.listen(8800,()=>{
    console.log("connected!!")
})