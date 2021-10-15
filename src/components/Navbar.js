import React, {useState, useEffect} from 'react'
import './Navbar.css'
import * as AiIcons from "react-icons/ai";
import {NavbarData} from './Navbardata';
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
      {(toggleMenu || screenWidth > 500) && (
      <ul className="list">
        {
          NavbarData.map((data,index)=>{
            return(
              <a href={data.path} className="items" onClick={toggleNav}>{data.title}</a>
            )
          })
        }
    </ul>
      )}
      {!(toggleMenu) ? <AiIcons.AiOutlineMenu onClick={toggleNav} className="btn"/>:<AiIcons.AiOutlineClose onClick={toggleNav} className="btn"/>}
    </nav>
  )
}
