import React from 'react'
import "./SearchBar.css"
import {useSelector, useDispatch} from 'react-redux'
import { Toaster} from "react-hot-toast";
import { useState } from 'react'
import * as actions from "../../Redux/Actions"
import {FaSearch} from "react-icons/fa";

export default function SearchBar({handleSort, handleRating, handleGenre, handleCreated, SetCurrentPage}){

    const dispatch = useDispatch()
    const allGenres = useSelector(state => state.allGenres)

    const [name, setName] = useState("");

    const handleInputChange = (e) => {
      e.preventDefault()
      console.log(name)
      setName(e.target.value)
    }
  
    function handleSubmit(e){  
      dispatch(actions.getVideoGameByName(name))   
      SetCurrentPage(1)
      setName("")
    }
   
    return (     

        <div className='c-div'>

        <div className='input-total'> 
            <input
             type="text"
             value={name}
             placeholder='Search...'
             onChange={(e) => handleInputChange(e)}
             className="input-search"
            />
            <button className='btn__search' type='submit' onClick={(e) => handleSubmit(e)}><FaSearch className='btn__search-icon'/></button>
        </div>

        <div className='search-bar'>
        <select className='s-bt'  onChange={(e) => handleGenre(e)}>
            <option value="all">Genres</option>  
        {
            allGenres && allGenres.map(g => {
                return(
                    <option                   
                    value={g.name} 
                    key={g.id}>
                    {g.name}
                    </option>
                )
            })
        }
        </select>
        
        <select className='s-bt' onChange={(e) => handleCreated(e)}>                      
        <option value='all'>All</option>
        <option value='created'>Created</option>
        </select>
        <select className='s-bt' onClick={(e) => handleSort(e)}>   
            <option value='order'>Order</option>       
            <option value='asc'>Asc</option>
            <option value='desc'>Desc</option>
        </select>
        <select className='s-bt' onClick={(e) => handleRating(e)}>
            <option value="rating">Rating</option>
            <option value='biggest'>Biggest</option>
            <option value='minor'>Minor</option>              
        </select>


        </div>

        <Toaster
                position='bottom-right'
                reverseOrder={true}
                toastOptions={{
                  className: "",
                  duration: 3000,
                  style: {
                    background: "#363636",
                    color: "white",
                    fontSize: "15px"
                  },
                }}
              />

        </div>       

    )
}