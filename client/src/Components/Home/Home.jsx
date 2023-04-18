import React from 'react'
import { useState,useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../../Redux/Actions"
import Cards from '../Cards/Cards';
import Paginated from '../Paginated/Paginated';
import SearchBar from '../SearchBar/SearchBar'

import "./Home.css"


function Home() {

  const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(actions.getAllVideoGames())
    },[dispatch])

    useEffect(() => {
      dispatch(actions.getAllGenres())
  },[dispatch])

  
  const allVideoGames = useSelector(state => state.allVideoGames)
  const [currentPage, SetCurrentPage] = useState(1)
  const [videoGamePerPage] = useState(15)
  const indexOfLastVideoGame = currentPage * videoGamePerPage
  const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamePerPage
  const currentVideoGames = allVideoGames.slice(indexOfFirstVideoGame,indexOfLastVideoGame)
  
  useEffect(() => {
    window.scrollTo(0,0)
  },[currentVideoGames])
  
  const paginated = (pageNumber) => {
    SetCurrentPage(pageNumber)
  }

  const [render, setRender] = useState("")

  function handleSort(e){
    e.preventDefault()
    e.target.value !== "order" &&
    dispatch(actions.filterByOrder(e.target.value))  
    setRender(e.target.value)
}

function handleRating(e){
    e.preventDefault()
    e.target.value !== "rating" &&
    dispatch(actions.filterByRating(e.target.value))
    setRender(e.target.value)
}

function handleGenre(e){
    e.preventDefault()
    SetCurrentPage(1)
    dispatch(actions.filterByGenre(e.target.value))
    setRender(e.target.value)
}

function handleCreated(e){
    SetCurrentPage(1)
    dispatch(actions.filterByCreated(e.target.value))
    setRender(e.target.value)
}



  return (
    <div className='div-home'>
      
        <SearchBar          
            handleSort={handleSort}
            handleRating={handleRating}
            handleGenre={handleGenre}
            handleCreated={handleCreated}
            SetCurrentPage={SetCurrentPage}/>
            {
              currentVideoGames.length ?

              <div>
              <Cards currentVideoGames={currentVideoGames}/> 
              <Paginated
              videoGamePerPage = {videoGamePerPage}
              allVideoGames = {allVideoGames.length}
              paginated = {paginated}/>

             </div>

              : <p>Loading...</p>
            }
           
    </div>
  )
}

export default Home