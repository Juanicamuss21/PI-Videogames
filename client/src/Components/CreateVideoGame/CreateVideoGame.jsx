import React from 'react'
import "./CreateVideoGame.css"
import * as actions from "../../Redux/Actions"
import { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Toaster, toast } from "react-hot-toast";

function validateInput(input) {
  const errors = {};

  const fechaMinima = 1950;
  const fechaMaxima = 2040;
  
  const date = new Date(input.released)
  
  const yearDate = date.getFullYear()
  
  console.log(yearDate)

  if(input.name.length > 20){
      errors.name = "No debe exceder los 20 caracteres"
  }

  if ((!input.name && input.released) || (!input.name && input.rating) || (!input.name && input.image) || (!input.name && input.platform) || (!input.name && input.genre)) {
      errors.name = "Se requiere un nombre";
  }

  if ((!input.released && input.rating) || (!input.released && input.image) || (!input.released && input.platform.length !== 0) || (!input.released && input.genre.length !== 0)) {
      errors.released = "Campo necesario"       
  } 

  if(yearDate < fechaMinima){
    errors.released = "Demasiado Antiguo"
  }

  if(yearDate > fechaMaxima){
    errors.released = "Fecha excedida"
  }

  if ((!input.rating && input.image) || (!input.rating && input.platform.length !== 0) || (!input.rating && input.genre.length !== 0)) {
      errors.rating = "Campo necesario";
  }

  if(input.rating.length > 4){
      errors.rating = "No debe tener más de dos decimales"
  }
  
  if ((input.rating < 0 || input.rating > 5)) {  
      errors.rating = "Debe ser entre 1 y 5"
     
  }

  if ((!input.image && input.platform.length !== 0) || (!input.image && input.genre.length !== 0)) {
      errors.image = "Campo necesario"
  }

  if ((input.platform.length === 0 && input.genre.length !== 0)) {
      errors.platform = "Campo necesario"
  }
  
  return errors;
}

 const data = ["Linux", "PS Vita", "Android", "Xbox One", "Nintendo Switch", "iOS", "PC", "macOS", "Xbox 360", "Play Station 3", "Play Station4"]


export default function CreateVideoGame()  {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.getAllGenres())
  },[dispatch])

  const allGenres = useSelector(state => state.allGenres)

  const [input, setInput] = useState({
    name: "",
    released: "", 
    platform: [],
    rating: "",
    image: "",
    genre: [],
    
})

const [error, setError] = useState({})


function handleChange(e){
  setInput({
      ...input,
      [e.target.name] : e.target.value
  })
  setError(validateInput({
    ...input,
    [e.target.name] : e.target.value
}))
  
  console.log(input)
}

 function handleSelect(e){
        if(!input.genre.includes(e.target.value)){
          if(input.genre.length > 5){
            return toast.error("No debe exceder los 6 géneros")
          }
             setInput({
                ...input,
                genre: [...input.genre,e.target.value]
            })
            return setError(validateInput({
              ...input,
              genre: [...input.genre,e.target.value]
          }))
        
        }
        toast.error("Este tipo ya fué incluido")
        console.log(input)
}

function handleSelect2(e){
  if(!input.platform.includes(e.target.value)){
       setInput({
          ...input,
          platform: [...input.platform, e.target.value]
      })
      return setError(validateInput({
        ...input,
        platform: [...input.platform, e.target.value]
    }))
  
  }
  toast.error("Este tipo ya fué incluido")
  console.log(input)
}

function handleDelete(e) {   
  e.preventDefault()
  
  setInput({
      ...input,
      platform : input.platform.filter(el => el !== e.target.value),
      genre: input.genre.filter(el => el !== e.target.value)
  })
}

function handleSubmit(e){
  e.preventDefault()
  if(!input.name || !input.released || input.platform.length === 0 || !input.rating || !input.image){
      return toast.error('Complete los campos requeridos antes de enviarlo')
  }
  if (error.name || error.released || error.platform || error.rating || error.image) {
      return toast.error('Complete correctamente el formulario antes de enviarlo')
  }
  if(input.genre.length === 0){
      return toast.error("Elige al menos un género")
  }

  dispatch(actions.postVideoGame(input))
  setInput({
      name: "",
      released: "", 
      platform: [],
      rating: "",
      image: "",
      genre: [],
    })
  
  // dispatch(actions.postPokemons(input))
  // setInput({
  //   name: "",
  //   released: "", 
  //   platform: [],
  //   rating: "",
  //   image: "",
  //   genre: [],
  // })
  // history.push('/home')
}


  return (
    <form>
      
        <label>Name: </label>
        <input className='form__input' type="text" name="name" onChange={(e) => handleChange(e)} value={input.name} />
        {error.name && (<p className="errors">{error.name}</p>)}
        <label>Released: </label>
        <input className='form__input' type="date" name="released" onChange={(e) => handleChange(e)} value={input.released} />
        {error.released && (<p className="errors">{error.released}</p>)}
        <label>Rating: </label>
        <input  className='form__input' type="number" name="rating" onChange={(e) => handleChange(e)} value={input.rating} />
        {error.rating && (<p className="errors">{error.rating}</p>)}
        <label>Image: </label>
        <input className='form__input' type="text" name="image" onChange={(e) => handleChange(e)} value={input.image} />
        {error.image && (<p className="errors">{error.image}</p>)}
        <label>platform: </label>

        <select onChange={(e) => handleSelect2(e)}>

          {
              data.map(el => {
              return(
                <option className='option-create' key={el} value={el}>{el}</option>
              )
            })
          }

        </select>

        {error.platform && (<p className="errors">{error.platform}</p>)}

        <div className="genres__selected">

        {
          input.platform && input.platform.map(el => {
            return <div key={el} className='genre-p'>
                <button value={el} onClick={(e) => handleDelete(e)}>x</button>
                <p>{el}</p>
            </div>
        })
        }
        </div>


        {/* <div className="checkbox">
        <label className='checkbox-label'>Pc: 
        <input type="checkbox" onClick={(e) => handleClick(e)} value={"Pc"} />
        </label>
        <label className='checkbox-label'>Ps3:
        <input type="checkbox" onClick={(e) => handleClick(e)} value={"Ps3"} />
        </label>
        <label className='checkbox-label'>Ps4: 
        <input type="checkbox" onClick={(e) => handleClick(e)} value={"Ps4"} />
        </label>
        <label className='checkbox-label'>Xbox360: 
        <input type="checkbox" onClick={(e) => handleClick(e)} value={"Xbox360"} />
        </label>
        </div> */}
        
        <label>Genre: </label>
        <select onChange={(e) => handleSelect(e)}>

          {
            allGenres && allGenres.map(el => {
              return(
                <option className='option-create' key={el.id} value={el.genre}>{el.name}</option>
              )
            })
          }

        </select>

        {error.genre && (<p className="errors">{error.genre}</p>)}

        <div className="genres__selected">
        {
          input.genre && input.genre.map(el => {
            return <div key={el} className='genre-p'>
                <button value={el} onClick={(e) => handleDelete(e)}>x</button>
                <p>{el}</p>
            </div>
        })
        }
        </div>

        <button className='btn-form btn-primary' onClick={(e) => handleSubmit(e)}>enviar</button>


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

  
    </form>
  )
}

