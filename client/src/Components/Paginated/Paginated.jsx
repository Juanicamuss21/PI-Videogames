import React from "react";
import './Paginated.css'
// import {GrFormNext, GrFormPrevious} from "react-icons/gr";


export default function Paginated({videoGamePerPage, allVideoGames, paginated}){

    const pageNumbers = []

    for(let i = 0; i < Math.ceil(allVideoGames/videoGamePerPage); i++){
        pageNumbers.push(i+1)
    }

    return(
        <div className="bt-paginated">

            {/* <button onClick={() => previus(pageNumbers)}><GrFormPrevious/>previus</button> */}

                    {   
                                                          
                        pageNumbers && pageNumbers.map(number => {
                            return(                                                              
                                <button 
                                key={number}
                                className="btn-paginated"
                                onClick={() => paginated(number)}>
                                {number}
                                </button>                               
                            )
                        }) 
                        
                    }

            {/* <button onClick={() => next(pageNumbers)}>next<GrFormNext/></button> */}

        </div>
    )
}