import React from 'react'
import  Axios  from "axios";
import { useState } from "react";

import RecipeTile from "../RecipeTile";
import "./NavBar.css"
const YOUR_APP_ID = process.env.REACT_APP_YOUR_APP_ID;
const YOUR_APP_KEY = process.env.REACT_APP_YOUR_APP_KEY;


const NavBar = () => {

    const [query, setQuery] = useState("");
    const [recipes,setRecipes] = useState([]);
  
    var url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;
    
  
    const getRecipeInfo = async() =>{
      var result = await Axios.get(url);
      setRecipes(result.data.hits);
      console.log(result.data.hits);
    }
  
    const handleClick= (e) =>{
      e.preventDefault();
      getRecipeInfo();
    }
    return (
    <>
    <div className="navbarcont">
    <div className="navbarup">
    <h1>Food Recipe Plaza</h1>
    <form className="form">
      <input 
      className="app_input"
      type="text"
      placeholder="Enter ingredient"
      autoComplete="Off"
      value={query}
      onChange={(e)=>setQuery(e.target.value)}
      />

      <input
      className="app_submit"
      type="submit"
      value="Search"
      onClick={handleClick}
      />

    </form>
    </div>
    </div>
    <div className="navbardown">
    <div className="app_recipes">
      {recipes !== [] &&
          recipes.map((recipe) => {
            return <RecipeTile recipe={recipe} />;
          })}
    </div>
    </div>
    </>
    )
}

export default NavBar
