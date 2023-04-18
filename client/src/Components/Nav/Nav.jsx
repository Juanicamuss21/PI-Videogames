import React from 'react'
import "./Nav.css"
import logo from "../../Assets/gaming-video-logo.jpg"
import {NavLink} from "react-router-dom"
// import { useState } from 'react'
// import {FaSearch, FaTimes, FaBars} from "react-icons/fa";
// import * as actions from "../../Redux/Actions"
// import {useDispatch} from "react-redux"

const Nav = () => {

  // const dispatch = useDispatch()

//   const [name, setName] = useState("");

//   const handleInputChange = (e) => {
//     e.preventDefault()
//     console.log(name)
//     setName(e.target.value)
//   }

//   function handleSubmit(e){  
//     dispatch(actions.getVideoGameByName(name))   
//     setName("")
         
// }

  return (
    <div className="nav-total">
      
        <div className="img-nav">
        <img src={logo} onClick={() => window.location.reload()} alt="" />
        </div>
        {/* <div className='input-total'> 
            <input
             type="text"
             value={name}
             placeholder='Search...'
             onChange={(e) => handleInputChange(e)}
             className="input-search"
            />
            <button className='btn__search' type='submit' onClick={(e) => handleSubmit(e)}><FaSearch className='btn__search-icon'/></button>
            </div> */}

        <div className="div-navLinks">
                <NavLink exact to="/Home" className="no-active" activeClassName="active">
                    <h4>Home</h4>
                </NavLink>
                <NavLink exact to='/home/createvideogame' className="no-active" activeClassName="active">
                    <h4>Create VideoGames</h4>
                </NavLink>
          </div>

          {/* <button className='btn-nav'>
          <FaBars/>
          </button> */}
                       
    </div>
  )
}

export default Nav