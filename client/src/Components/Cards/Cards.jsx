import React from "react";
import "./Cards.css"
import Card from "../Card/Card"

export default function Cards ({currentVideoGames}){
    
    return (
        <div className="div-cards">
    {
         currentVideoGames.map(el => {
            return (
                <Card name={el.name} image={el.image} genre={el.genre} rating={el.rating} id={el.id} key={el.id} genres={el.genres}></Card>
            )  
        })
    } 

        </div>
    )
}

