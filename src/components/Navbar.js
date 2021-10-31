import React, {useState, useEffect} from 'react'
import './Navbar.css'
import * as AiIcons from "react-icons/ai";
import {NavbarData} from './Navbardata';
import { Link } from 'react-router-dom';
export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)


  const toggleNav = () => {
    setToggleMenu(!toggleMenu)
  }

  useEffect(() => {

    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', changeWidth)

    return () => {
        window.removeEventListener('resize', changeWidth)
    }

  }, [])

  return (
    <nav>
      {(toggleMenu || screenWidth > 541) && (
      <ul className="list">
        {
          NavbarData.map((data,index)=>{
            return(
              <Link to={data.path} className="items" onClick={toggleNav} key={index+7}>{data.title}</Link>
            )
          })
        }
    </ul>
      )}
      {!(toggleMenu) ? <AiIcons.AiOutlineMenu onClick={toggleNav} className="btn"/>:<AiIcons.AiOutlineClose onClick={toggleNav} className="btn"/>}
    </nav>
  )
}
