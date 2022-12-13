import React, { useEffect, useState } from "react";
import { Link ,useLocation} from "react-router-dom";
import axios from "axios"


const Home =() =>{
  const [posts,setPosts]= useState([])//又开始用钩子了

  const location = useLocation()
  console.log(location)
  // 这样可以拿到url的{pathname: '/', search: '?cat=technology', hash: '', state: null, key: 'l5pncm5h'}hash: ""key: "l5pncm5h"pathname: "/"search: "?cat=technology"state: null[[Prototype]]: Object
  const cat = location.search

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        // 一种连接url和变量的写法`/posts${cat}` 区别"/posts"
        const res = await axios.get(`/posts${cat}`) //我记得这里是因为提前配置好了代理 "proxy":"http://localhost:8800/api/"
        //这里要写posts 因为这里是到posts
        setPosts(res.data)
      }catch(err){
        console.log(err)
      }
    };
    fetchData();
  },[cat])//加上cat 意思是每次切换cat 都会刷新网页 之前是[] 
  // 注销这些写死的 换成直接从数据库提取
  //   const posts = [
  //   {
  //     id: 1,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 3,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 4,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  // ];

// 这个是为了防止传入带div 标签的
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }



    return(
        <div className="home">
            <div className="posts">
                {posts.map(post=>(
                  // 下面这些post指的是上面这一行定义的post 和最上面的posts关联不大，那个被转化成了post
                    <div className="post" key={post.id}>
                        <div className="img">
                          {/* 要在这里改成图片的地址 */}
                            <img src={`../upload/${post.img}`} alt=""/>
                        </div>
                        <div className="content">
                            <Link className= "link" to={`/post/${post.id}`}>
                            <h1>{post.title}</h1>
                            </Link>
                            {/* 在这里引入去掉html标签的方法 */}
                            <p>{getText(post.desc)}</p>
                            <button>Read More</button>
                            
                        </div>

                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default Home