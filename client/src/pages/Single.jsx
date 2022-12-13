import React, {useContext} from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import {Link} from "react-router-dom";
import Menu from "../components/Menu";
import {useLocation, useNavigate} from "react-router-dom"
import axios from "axios"
import {useState, useEffect} from "react"
import moment from "moment"
import {AuthContext} from "../context/authContext"

const Single = () => {
    // 这些是按照home 的模板复制的 大体逻辑和home差不多
    const [post, setPost] = useState({})

    const location = useLocation()
    const navigate = useNavigate()
    const postId = location.pathname.split("/")[2];

    // 这一行会导致 不登陆看不了内容,同时登录退出也会报错 因为无法停留在原界面
    const {currentUser} = useContext(AuthContext)
    //这一行是取到现在的user 这样方便接下来进行比较是否user是发布的user 然后进行删除

    useEffect(() => {
        const fetchData = async () => {
            try {

                const res = await axios.get(`/posts/${postId}`) //因为url是这么写的，因此用这种写法

                setPost(res.data)

            } catch (err) {
                console.log(err)
            }
        };
        fetchData();
    }, [postId]);
    // 这里将cat 改为按照postId来进行刷新
    const handleDelete = async () => {
        console.log("404")

        try {

            // console.log("505")
            //这一步直接导航到原来的地方即可 不需要返回了，因为是删除
            await axios.delete(`/posts/${postId}`) //因为url是这么写的，因此用这种写法

            //就是这一步有问题

            // console.log(404)
            navigate("/")

        } catch (err) {
            // console.log("606")
            console.log(err)
        }
    };

    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
      }
    


    return (
        <div className="single">
            <div className="content">
                {/* 在这里添加新的逻辑 */}
                {/* ?.我记得是有就放没有拉到 */}
                <img src={`../upload/${post?.img}`}/>

                <div className="user">
                    {/* 我下面这行没放图片，因此不显示，只有个no */}
                    {post.userImg && <img src={post.userImg} alt="no"/>}
                    <div className="info">
                        {/* 添加传入图片的人 */}
                        <span> {post.username} </span>
                        {/* <span>John</span> */}
                        {/* <p>Post 2 days ago</p> */}
                        {/* 这里通过引入moment 动态改变日期 
                        .fromNow 已经发布几天了*/}
                        {/* 这里是date 未登录会显示不出来的原因 */}
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>
                    {/* 这里加上判断语句 这样可以防止报错 */}
                    {(currentUser===null?false:(currentUser.username === post.username)) && (<div className="edit">

                        {/*通过state 拿到传入的参数 这个post 对应的部是single的post参数 是write的useLocation 的post参数*/}
                        <Link to={`/write?edit=2`} state={post}>
                            {/* 好像后面写上问号会调用不占用缓存的原界面 */}
                            <img src={Edit} alt=""/>
                        </Link>
                        <img onClick={handleDelete} src={Delete} alt=""/>
                    </div>)}
                </div>
                <h1>
                    {/* 这里改为直接从数据库取值 */}
                    {/* first graph */}
                    {post.title}
                </h1>
                {/* 我不知道为什么要注销掉<p> */}
                {/* <p> */}
                {/* second graph
                    second graphsecond graphsecond graphsecond graphsecond graphsecond graphsecond graphsecond graphsecond graphsecond graphsecond graphsecond graphsecond graphsecond graph
                    second graphsecond graphsecond graphsecond graphsecond graphsecond graphsecond graphsecond graphsecond graphsecond graphsecond graphsecond graphsecond graph
                    second graphsecond graphsecond graphsecond graphsecond graphsecond graphsecond graph */}
                {/* 这里也是 */}
                {getText(post.desc)}
                {/* </p> */}
            </div>
            <Menu cat={post.cat}/>
            {/* 这么写会给menu 内部传入参数 */}
            {/* 这个标签会把Menu页面的东西带过来  删掉之前写的className =menu 的那个*/}
        </div>
    )
}

export default Single