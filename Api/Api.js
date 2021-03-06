import React, { useEffect, useState } from 'react';
import Recipe from "../components/Recipe";
import './App.css';

const Api = () => {
  const APP_ID = "750cfe42";
  const APP_KEY = "af2c22e261f3afc5ecf0912cc1e05883";

  const[recipes, setRecipes] = useState([]);
  const[search, setSearch] = useState("");
  const[query, setQuery] = useState('chicken');

  useEffect(() =>{
    console.log("Effect has been run");
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault(); //To stop page refresh
    setQuery(search);
  }

  return(
    <div className="App"> 
      <div className='center'> <h1 style={{ color: 'white', textAlign: 'center' }}>Discover Recipes of your choice!</h1> </div>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} placeholder="e.g., Chicken, salad, soup, chocolate"></input>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe =>(
          <Recipe 
            key={recipe.recipe.label} 
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default Api;
