/* This is a recipe app where the user types the name of the food they like in the search bar.
   The API Developer Portal that will be used to capture all the food data from https://developer.edamam.com which provides the resipes.


*/

import React,{useEffect, useState} from 'react';
import Recipe from "./Recipe";
import './App.css';

const App = () => {

  // The ID and Key can be obtained by making an account on Edamam's website after signing up
 const APP_ID = '1861e3bc';
 const APP_KEY = "516f1b8c0cba00afe74297f544b107ce";

 const [recipes, setRecipes] = useState([]);
 const [search, setSearch] = useState('');
 const [query, setQuery] = useState('chicken');

 useEffect( () =>{
   getRecipes(); 
 }, [query]);

 // this piece of code will fetch the recipes from the website account using the creddentials made through registering
 const getRecipes = async () => {
   const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`); 
   const data = await response.json();
   setRecipes(data.hits);
   console.log(data.hits);
 };

 const updateSearch = e => {
   setSearch(e.target.value);
 };

 const getSearch = e => {
   e.preventDefault();
   setQuery(search);
   setSearch('');
 }

return (
  // This form will provide the user with the search bar, along with its styling
  // The div class "recipe" 
  <div className="App">
    <form onSubmit={getSearch} className="search-form">
      <input className="search-bar" type="text" value={search} onChange={updateSearch} />
      <button className="search-button" 
              type="submit">
              Search
              </button>
    </form>
    <div className="recipes">
    {recipes.map(recipe => (
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

export default App;

