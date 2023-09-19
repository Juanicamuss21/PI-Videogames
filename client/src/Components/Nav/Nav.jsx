import React, {useState} from 'react'
import "./Nav.css"
import logo from "../../Assets/gaming-video-logo.jpg"
import {NavLink} from "react-router-dom"
import { FaBars} from "react-icons/fa";

const Nav = () => {

  const [isIconOpen, setIsIconOpen] = useState(false)

  const reload = () => {
    window.location.href = '/home'
  }

  const openModal = () => {
    setIsIconOpen(true)
  }

  const closeModal = () => {
    setIsIconOpen(false)
  }

  const handleOutsideClick = (e) => {
    if (isIconOpen) {
      closeModal()
    } else {
      openModal()
    }
  }
  return (
    <div className="nav-total">
      
        <div className="img-nav">
        <img src={logo} onClick={reload} alt="" />
        </div>
        
        <div>
          <FaBars className={`icon-bars ${isIconOpen ? 'open' : ''}`} onClick={(e) => handleOutsideClick(e)}/>
          <div className={`nav-links ${isIconOpen ? 'open' : ''}`}> 
            <NavLink exact to="/home" className="no-active" activeClassName="active">
                <h4>Home</h4>
            </NavLink>
            <NavLink exact to='/home/createvideogame' className="no-active" activeClassName="active">
                <h4>Create VideoGames</h4>
            </NavLink>
          </div>
        </div>

                       
    </div>
  )
}

export default Nav