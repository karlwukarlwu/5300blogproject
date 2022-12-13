import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Single from "./pages/Single";
import Write from "./pages/Write";

import "./style.scss";

const Layout = ()=> {
  return (
    <>
    <Navbar/>
    <Outlet/>
    {/* 上面那个是router自带的 */}
    <Footer/>
  {/* 实际上一个layout页面包含了 nav footer outlet这三个元素 outlet是上面引入的
    是一个集合 包含了你想要这样的格式的页面
    因此凡是这么显示的要写nav footer 其他的页面由你自己自由发挥*/}
    </>
  );
};

const router = createBrowserRouter([
  {
  path:"/",
  element:<Layout/>,
  children:[
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/post/:id",
      element:<Single/>
    },
    {
      path:"/write",
      element:<Write/>
    }
  ]
  },
  // 实际上这三个是同一个页面的集合变出来的，因此我们只需要写中间的，和开头的nav 以及footer
  {
    path:"/register",
    element: <Register/>,
  },
  {
    path:"/login",
    element: <Login/>,
  },
  
  // {
  //   path:"/write",
  //   element: <Write/>,
  // },
  // {
  //   path:"/single",
  //   element: <Single/>,
  // },、

  //因为上面把他们包到子类里面去了，因此这些就不用再独立写了 

])

function App() {
  return (
    <div className="app">
    <div className="container">
      <RouterProvider router={router}/>
    </div>
    </div>
  );
}



export default App;
