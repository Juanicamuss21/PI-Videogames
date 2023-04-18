import React from "react";
import "./Landing.css";
import {Link} from "react-router-dom"

export default function Landing(){
    return(
        <div className="contenedor">
            <div className="info-landing">
            <h1>Bienvenidos a infogames</h1>  
            <p>Bienvenidos a la página web informativa de videojuegos. Esta página web ha sido creada para ofrecer a los usuarios información actualizada sobre los últimos lanzamientos de videojuegos, así como análisis profundos, trucos y consejos para juegos, así como una sección de noticias sobre videojuegos.                
            </p>    
            <Link to="/home">
            <button className="btn btn-primary">Ingresar</button>    
            </Link>
            </div> 
        </div>
        
    )
}