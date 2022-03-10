import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import getDetailedRecipe from '../../services/DetailedFood';

export default function DetailedFood() {
  const [recipe, setRecipe] = useState([]);
  const [counter, setCounter] = useState('');
  const location = useLocation();

  useEffect(() => {
    async function getLocation() {
      const myLoc = location.pathname;
      const ID = myLoc.replace(/\D/g, '');
      const RECIPE = await getDetailedRecipe(ID);
      setRecipe(RECIPE);
      setCounter('a');
      console.log(ID, counter);
    }
    getLocation();
  }, [location.pathname, counter]);

  return (
    <div>
      {recipes.length > 0 && (
        <button type="button">
          <div name={ recipe.idMeal }>
            <img
              name={ recipe.idMeal }
              data-testid="recipe-photo"
              src={ recipe.strDrinkThumb || recipe.strMealThumb }
              alt={ recipe.strDrink || recipe.strMeal }
            />
          </div>
          <div name={ recipe.strMeal }>
            <h4 data-testid="recipe-title">{recipe.strDrink || recipe.strMeal}</h4>
          </div>
        </button>)}
    </div>
  );
}
