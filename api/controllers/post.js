import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat=?"
        : "SELECT * FROM posts"
    //这个是写一个查询语句，判断query后面有没有cat这个选项，
    // 有的话按category来筛选，没有的话直接全选
    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.send(err)

        return res.status(200).json(data)

    });

}

export const addPost = (req, res) => {
    // res.json("from controller")
    // 下面这一部分还是先进行验证
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date,
            userInfo.id
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Post has been created.")
        })
    })
}

export const getPost = (req, res) => {
    //这里的数据库要注意连对了
    const q = "SELECT p.id, `username`,`title`,`desc`,p.img, u.img AS userImg ,`cat`,`date` FROM users u JOIN posts p ON u.id =p.uid WHERE p.id=?";
    //这句话的意思好像是直接查了两个表 当id相等的时候

    //这个params是前面的网址
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json(data[0])

    })
};


// export const deletePost = (req, res) => {
//     //有没有token 是不是正确的token 先过这两个逻辑
//     const token = req.cookies.access_token;
//     if (!token) return res.status(401).json("Not authenticated! ")

//     jwt.verify(token, "jwtkey", (err, userInfo) => {
//         if (err) return res.status(403).json("Token is not valid")

//         const postId = req.params.id
//         const q = "DELETE FROM posts WHERE `id`= ? AND `uid` = ?"

//         db.query = (q, [postId, userInfo.id], (err, data) => {
//             if (err) return res.status(403).json("You can dalete only your post!")

//             return res.json("Post has been deleted!")
//         })
//     })
// }

//我完全不理解为什么同一段代码我和他一样我的跑不出来
export const deletePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const postId = req.params.id;
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

        db.query(q, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You can delete only your post!");

            return res.json("Post has been deleted!");
        });
    });
};

export const updatePost = (req, res) => {
    // res.json()
    // 直接在addpost基础上修改
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        // const q = "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `cat`=? WHERE `id`=? AND `uid`=?";
        const q = "UPDATE posts SET `title`=?, `desc`=?, `cat`=? WHERE `id`=? AND `uid`=?";

        const postId = req.params.id
        const values = [
            req.body.title,
            req.body.desc,
            // req.body.img,
            req.body.cat,
            // req.body.date,
            // userInfo.id
        ]
        // 我也不知道这种写法是什么意思，反正就是传入很多参数
        db.query(q, [...values,postId,userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Post has been updated.")
        })
    })
}




