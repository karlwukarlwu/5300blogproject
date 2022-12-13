import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom"
import moment from "moment";

const Write = () => {

    const state = useLocation().state

    // const [value, setValue] = useState('');
    // 接下来改这个↑
    // 有state的是改的 没用state的是空的 是新写的
    const [value, setValue] = useState(state?.title || "")

    // console.log(value);
    // 这个是搭配react-quill用的,这个我记得搭配下面的那个value={value} onChange={setValue} 可以实时获取输入
    const [title, setTitle] = useState(state?.desc || "")
    const [file, setFile] = useState(null)
    const [cat, setCat] = useState(state?.cat || "")

    const navigate = useNavigate()


    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file)
            //    这个“file"名字要和index里面的uplod.single名字一样
            const res = await axios.post("./upload", formData)
            // console.log(res.data)
            return res.data
        } catch (err) {
            console.log(err)
        }

    }

    const handleClick = async (e) => {
        e.preventDefault()
        //这个是在上面写好的
        // upload()
        // 这个仅仅是传输图片，接下来将图片和title已经文章内容一起传过来
        const imgUrl = await upload()
        try {

            // 我也不知为什么这一行会掉到controller那里的post
            state ? await axios.put(`/posts/${state.id}`, {
                title,
                desc: value,
                cat,
                img: file ? imgUrl : "", //这个是修改的 所以不放日期
            })
                : await axios.post(`/posts/`, {
                    title,
                    desc: value,
                    cat,
                    img: file ? imgUrl : "", //有图放图，没图放空
                    // 这个扔一个日期进去 按照规定格式
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                });
            navigate("/")

        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className="add">
            {/* 因为这里写write会和navbar那里的write重复，因此改成add */}
            <div className="content">
                <input type="text" value={title} placeholder="Title" onChange={e => setTitle(e.target.value)} />
                {/*这个和下面的那个  value={value} onChange={setValue}是两种写法*/}
                <div className="editorContainer">
                    <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
                    {/* 这个也是搭配react-quill 使用 */}
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b> Draft
                    </span>
                    <span>
                        <b>Visibility: </b> Public
                    </span>
                    <input type="file" style={{ display: "none" }} name="" id="file" onChange={e => setFile(e.target.files[0])} />
                    {/*只传一个，因此用[0]*/}
                    {state?<label></label>:<label className="file" htmlFor="file">Upload Image</label>}
                    {/* htmlFor 把label绑定到有相同的id 的地方 这里绑定到了file 然后用style display=none 
                    把标签隐藏了，这样点击Upload 就行 */}
                    <div className="buttons">
                        <button> Save as a draft</button>
                        <button onClick={handleClick}>Pubish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                        <input type="radio" checked={cat === "art"} name="cat" value="art" id="art" onChange={event => setCat(event.target.value)} />
                        {/* value 和 placeholder 差不多 都是显示值，但是当type =“submit” 要用value 
                    type =radio 是单选框*/}
                        <label htmlFor="art">Art</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "science"} name="cat" value="science" id="science" onChange={event => setCat(event.target.value)} />
                        <label htmlFor="science">Science</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "technology"} name="cat" value="technology" id="technology" onChange={event => setCat(event.target.value)} />
                        <label htmlFor="technology">Technology</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "cinema"} name="cat" value="cinema" id="Cinema" onChange={event => setCat(event.target.value)} />
                        <label htmlFor="Cinema">Cinema</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "design"} name="cat" value="design" id="design" onChange={event => setCat(event.target.value)} />
                        <label htmlFor="design">Design</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "food"} name="cat" value="food" id="food" onChange={event => setCat(event.target.value)} />
                        <label htmlFor="food">Food</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Write