import {toast} from "react-hot-toast";

const initialState = {
    allVideoGames: [],
    videoGames:[],
    allGenres: [],
    detail: {}
}

function rootReducer(state=initialState, action){
    switch(action.type){
        case "GET_ALL_VIDEOGAMES":
            return{
                ...state,
                allVideoGames: action.payload,
                videoGames: action.payload
            }

        case "GET_ALL_GENRES" : 
            return {
                ...state,
                allGenres: action.payload
            }    

        case "GET_VIDEOGAME_BY_NAME" :  
            return {
                ...state,
                allVideoGames: action.payload
        }

        case "POST_VIDEOGAME" : 
        const videogames = state.videoGames
        return {
            ...state,
            allVideoGames: [...videogames, action.payload]
        }

        case "DELETE_VIDEOGAME":
            const videogames0 = state.videoGames
            return{
                ...state,
                allVideoGames: videogames0.filter(e => e.id !== action.payload)
        }

        case "FILTER_BY_ORDER" :
         const videogames1 = state.videoGames 
               
         const arrSort = action.payload === "asc"?
         videogames1.sort(function(a,b){
            if(a.name > b.name){
                return 1
            }
            if(a.name < b.name){
                return -1
            }
            return 0
         }) : 
         videogames1.sort(function(a,b){
            if(a.name > b.name){
                return -1
            }
            if(a.name < b.name){
                return 1
            }
            return 0
         })

        return {
            ...state,
            allVideoGames: arrSort
        }

        case "FILTER_BY_RATING" :
         const videoGames2 = state.videoGames 
         const videoGameFiltered = action.payload === "biggest"?
         videoGames2.sort(function(a,b){
            if(a.rating > b.rating){
                return -1
            }
            if(a.rating < b.rating){
                return 1
            }
            return 0
         }) : 
         videoGames2.sort(function(a,b){
            if(a.rating > b.rating){
                return 1
            }
            if(a.rating < b.rating){
                return -1
            }
            return 0
         })

        return {
            ...state,
            allVideoGames: videoGameFiltered
        }

        case "FILTER_BY_GENRE" :
            const videoGames3 = state.videoGames           
            const genresFiltered = action.payload === "all" ? videoGames3 : videoGames3.filter(e => e.genre ? e.genre.includes(action.payload) : e.genres.map(el => el.name.includes(action.payload)))

            // const genre = action.payload === "all" ? videoGames3 : videoGames3.filter(el => el.genre.includes(action.payload))

            // const genre2 = action.payload === "all" ? videoGames3 : videoGames3.filter(el => el.genres.map(el => el.name.includes(action.payload)))

            // const genresFiltered = genre.concat(genre2)

            console.log(genresFiltered)
              
               if(!genresFiltered.length){
                toast.error("No se encontró este género")
                return {
                    ...state                 
                }
            }
            
        return {
            ...state,
            allVideoGames: genresFiltered 
        }

        case "FILTER_BY_CREATED" :
            const videogames4 = state.videoGames
            const createdFiltered = action.payload === "created"? videogames4.filter(el => el.createdInDb) : videogames4
            if(!createdFiltered.length){
            toast.error("No hay videogames creados aún")
            }
        return {
            ...state,
            allVideoGames: createdFiltered.length? createdFiltered : videogames4
        }

        case "GET_DETAIL" : 
        return {
            ...state,
            detail: action.payload
        }

        case "DETAIL_NULL" : 
        return {
            ...state,
            detail: {}
        }
        
            default :
        return {
            ...state
        }
    }
}


export default rootReducer;