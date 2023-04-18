import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Error404.css"

const Error404 = () => {
  return (
    <div className='div-error'>
        <h3>Error 404 not found.</h3>
        <NavLink className="link-error" to="/home">
            <p>Ir a home</p>
        </NavLink>
    </div>
  )
}

export default Error404