import React from 'react'
import "./Card.css"
import {FaStar} from "react-icons/fa"
import {BsArrowReturnRight} from "react-icons/bs"
import {NavLink} from "react-router-dom"
import * as actions from "../../Redux/Actions"
import {useDispatch} from "react-redux"

const Card = ({name, id , image, genre, rating, genres}) => {

  const dispatch = useDispatch()

  function handleDelete(e){
    e.preventDefault()      
    dispatch(actions.deleteVideoGame(e.target.value))       
}

  return (
   
    <div className='div-card'>

      {
        id.length > 8 && <button className="btn-delete" onClick={(e) => handleDelete(e)} value={id}>x</button>
      }

      <NavLink className="navlink-detail" to= {`/home/detail/${id}`}>
        <h1>{name}</h1>
        
        <img className='img-card' src={image} alt=""></img>

    </NavLink>
        <div className='genres'>

          {
            genres && genres.map(el => {
              return(
                <div className='genres__card'>              
                <BsArrowReturnRight className='genres__card-icon'/>
              <h4 key={el}>{el.name}</h4>
              
              </div>       
              )
            })
          }
          
        {
          genre && genre.map(el => {          
            // const type = typeof(el) === "object" ? el.name : el 
            return(
              <div className='genres__card'>              
                <BsArrowReturnRight className='genres__card-icon'/>
              <h4 key={el}>{el}</h4>
              
              </div>           
            )
          })
        }
  
        </div>
        <div className='rating-card'>
          <FaStar className='rating-card-icon'/>
        <h5>{rating}</h5>
        </div>
    </div>
  )
}

export default Card