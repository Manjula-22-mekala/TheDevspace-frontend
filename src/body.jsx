import React from 'react'
import NavBar from './navbar';
import Footer from "./Footer";
import { Outlet } from 'react-router-dom';
const Body = () => {
  return (
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body
