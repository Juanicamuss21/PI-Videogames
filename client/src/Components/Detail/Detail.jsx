import React from "react";
import {useEffect} from "react";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import * as actions from "../../Redux/Actions"
import "./Detail.css"
import Rating from "react-rating"
import {BsStar, BsStarFill, BsStarHalf} from "react-icons/bs"

export default function Details(){
 
    const dispatch = useDispatch()  

    const {id} = useParams();
    console.log(id)

    const myVideoGame = useSelector(state => state.detail)

    useEffect(() => {
        dispatch(actions.detailNull())     
        dispatch(actions.getDetail(id))
    }, [dispatch,id])

    useEffect(() => {
        window.scrollTo(0,0)
      },[])
    
   
    console.log(myVideoGame)
    return(

        <div className="total-div">
         
        {           
            myVideoGame.name ?

            <div className="cd-div">

            <div className="title-img">
              <h1 className="title-detail">{myVideoGame.name}</h1>
            <div className="div-img">
              <img src={myVideoGame.image} className="img-detail" alt="img not found"></img>
            </div>
        
            <div className="rating-div">
              <h2>Rating: </h2>
              <Rating
              initialRating={myVideoGame.rating}
              emptySymbol={<BsStar />}
              fullSymbol={<BsStarFill />}
              halfSymbol={<BsStarHalf />}
              readonly={true}
              className="rating"
             />
            </div>
            
            </div>

            <div className="description">

            <div className="description__item">
              <h2>Released:</h2> 
              <p>{myVideoGame.released}</p>
            </div>
            
            <div className="description__item">
              <h2>Platforms:</h2> 
            {
            myVideoGame.platform.map(el => {
                return (
                    <p>{el}</p>
                )
            })
            }
            </div>

            <div className="description__item">          
              <h2>Genre: </h2>
            {
            !myVideoGame.createdInDb? myVideoGame.genre.map(el => {
                return(<p>{el}</p>)
            }) 
            : 
            
            myVideoGame.genres.map(el => {
                return(<p>{el.name}</p>)
            })
            
            }           

           </div>

           
         
           </div>

        </div>

            : <p className="p-loading">Loading...</p>     

        }


        
    </div>
    )
}