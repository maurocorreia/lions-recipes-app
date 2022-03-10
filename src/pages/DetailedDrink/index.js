import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchDrinkbyId, fetchRecommendedFoods } from '../../services/DetailedItem';
import RecommendedCard from '../../components/RecommendedCard';
import DetailedDrinkHeader from '../../components/DetailedDrinkHeader';

export default function DetailedDrink() {
  //  Globals
  const history = useHistory();
  const { idDrink } = useParams();

  //  Fetch and Load.
  const [drinkData, setDrinkData] = useState('');
  const [recommendedDrinks, setRecommendedDrinks] = useState('');

  useEffect(() => {
    fetchDrinkbyId(idDrink).then((result) => setDrinkData(result));
    fetchRecommendedFoods().then((result) => setRecommendedDrinks(result));
  }, [idDrink]);

  //  Get Ingredients
  const [drinkEntries, setDrinkEntries] = useState([]);
  const [drinkIngredients, setDrinkIngredients] = useState([]);

  useEffect(() => {
    setDrinkEntries(Object.entries(drinkData));
  }, [drinkData]);

  function getIngredients() {
    drinkEntries.forEach((entrie) => {
      const notNull = entrie[1] !== null && entrie[1] !== '';
      if (entrie[0].includes('strIngredient') && notNull) {
        setDrinkIngredients((prevState) => [...prevState, entrie[1]]);
      }
    });
  }

  // Get Measures
  const [drinkMeasure, setDrinkMeasure] = useState([]);

  function getMeasures() {
    drinkEntries.forEach((entrie) => {
      const notNull = entrie[1] !== null && entrie[1] !== '';
      if (entrie[0].includes('strMeasure') && notNull) {
        setDrinkMeasure((prevState) => [...prevState, entrie[1]]);
      }
    });
  }

  useEffect(() => {
    getIngredients();
    getMeasures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drinkEntries]);

  /* START BUTTON */
  const [buttonStatus, setButtonStatus] = useState(true);
  const [buttonName, setButtonName] = useState('Start Recipe');

  /* Check if the Recipe is done. */
  function checkRecipeDone() {
    const prevState = JSON.parse(localStorage.getItem('doneRecipes'));
    if (prevState !== null) {
      prevState.forEach((doneRecipe) => {
        if (doneRecipe.id === drinkData.idDrink) setButtonStatus(false);
      });
    }
  }

  /* Check if the Recipe is in Progress. */
  function checkRecipeInProgress() {
    const prevState = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (prevState !== null) {
      const drinkId = Object.keys(prevState.cocktails);
      drinkId.forEach((progress) => {
        if (progress === drinkData.idDrink) setButtonName('Continue Recipe');
      });
    }
  }

  useEffect(() => {
    checkRecipeInProgress();
    checkRecipeDone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drinkData]);

  return (
    <>
      <DetailedDrinkHeader data={ drinkData } />

      <section>
        <ul>
          {drinkIngredients !== [] && drinkIngredients.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ingredient} — ${drinkMeasure[index]}`}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <p data-testid="instructions">{drinkData.strInstructions}</p>
      </section>

      <section className="recomendation-div">
        <section className="recomendation-wrap">
          { recommendedDrinks !== '' && recommendedDrinks.map((food, index) => (
            <RecommendedCard
              index={ index }
              key={ food.strMeal }
              title={ food.strMeal }
              subtitle={ food.strCategory }
              image={ food.strMealThumb }
            />
          ))}
        </section>
      </section>

      <section>
        {buttonStatus
         && (
           <button
             className="start-button"
             aria-label="Start Recipe"
             data-testid="start-recipe-btn"
             type="button"
             onClick={ () => history.push(`/drinks/${idDrink}/in-progress`) }
           >
             { buttonName }
           </button>
         )}
      </section>
    </>
  );
}
