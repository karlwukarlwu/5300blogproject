import React from "react";
import { useState,useEffect } from "react";
import axios from "axios"


const Menu = ({ cat }) => {
  // 通过在single 里面传参 然后让menu和数据库交互 显示相同类别的post

  //不需要useLocation 了因为已经从cat里面拿到了
  const[posts,setPosts] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 一种连接url和变量的写法`/posts${cat}` 区别"/posts"
        const res = await axios.get(`/posts/?cat=${cat}`) //我记得这里是因为提前配置好了代理 "proxy":"http://localhost:8800/api/"
        //这里要写posts 因为这里是到posts
        setPosts(res.data)
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, [cat])
  // 交互的写法
  // const posts = [
  //     {
  //       id: 1,
  //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //       img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //     },
  //     {
  //       id: 2,
  //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //       img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //     },
  //     {
  //       id: 3,
  //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //       img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //     },
  //     {
  //       id: 4,
  //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //       img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //     },
  //   ];

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map(post => (
        <div className="post" key={post.id}>
          <img src={`../upload/${post.img}`} alt="" />
          <h2>{post.title}</h2>
          <button>Read More</button>
        </div>
      ))}
    </div>
  )
}

export default Menu;