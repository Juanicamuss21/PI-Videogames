import axios from "axios"
import {toast} from "react-hot-toast";

export function getAllVideoGames(){
    return function(dispatch){
        console.log(axios)
        axios.get("/videogames")
        .then((res) => res.data)
        .then((res) => {
            return dispatch({type: "GET_ALL_VIDEOGAMES", payload: res})
        })
        .catch(error => console.log(error.message))
                     
    }
} 

export function getAllGenres(){
    return async function(dispatch){
        try{
            const genres = await axios.get("/genres")

            return dispatch({type: "GET_ALL_GENRES", payload: genres.data})
        }catch(error){
            console.log(error.message)
        }
    }
}

export function getVideoGameByName(name){
    return async function(dispatch){
        try{
            const videoGameName = await axios.get(`/videogames?name=${name}`)
            return dispatch({type: "GET_VIDEOGAME_BY_NAME", payload: videoGameName.data})
        }catch(error){
            console.log(error)
            alert(error.response.data.message)
        }
    }
}

export function postVideoGame(post){
    console.log(post)
    return async function(dispatch){
        try{
            const response = await axios.post("/videogames", post)         
            toast.success("VideoGame creado correctamente")
            return dispatch({type: "POST_VIDEOGAME", payload: response.data})         
        }catch(error){
            toast.error("Error al crear el videogame")
        }
    }
}

export function deleteVideoGame(id){
    return async function(dispatch){
        try{          
            await axios.get(`/delete/${id}`)          
            return dispatch({type: "DELETE_VIDEOGAME", payload: id})
        }catch(error){
            console.log(error.message)
        }
    }
}

export function filterByOrder(value){  
    return {
        type: "FILTER_BY_ORDER",
        payload: value
    }
}

export function filterByRating(value){
    return {
        type: "FILTER_BY_RATING",
        payload: value
    }
}

export function filterByGenre(value){
    return {
        type: "FILTER_BY_GENRE",
        payload: value   
    }
}

export function filterByCreated(value){
    return {
        type: "FILTER_BY_CREATED",
        payload: value   
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
            const detail = await axios.get(`/videogames/${id}`)
            return dispatch({type: "GET_DETAIL", payload: detail.data})
        }catch(error){
            console.log(error.message)
        }
    }
} 

export function detailNull(){
    return {
        type: "DETAIL_NULL",   
    }
}