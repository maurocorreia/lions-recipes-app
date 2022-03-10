import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchFoodbyId, fetchRecommendedDrinks } from '../../services/DetailedItem';
import RecommendedCard from '../../components/RecommendedCard';
import DetailedFoodHeader from '../../components/DetailedFoodHeader';

export default function DetailedFood() {
  //  Globals
  const history = useHistory();
  const { idFood } = useParams();

  //  Fetch and Load.
  const [foodData, setFoodData] = useState('');
  const [recommendedFoods, setRecommendedFoods] = useState('');

  useEffect(() => {
    fetchFoodbyId(idFood).then((result) => setFoodData(result));
    fetchRecommendedDrinks().then((result) => setRecommendedFoods(result)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idFood]);

  //  Get Ingredients
  const [foodEntries, setFoodEntries] = useState([]);
  const [foodIngredients, setFoodIngredients] = useState([]);

  useEffect(() => {
    setFoodEntries(Object.entries(foodData));
  }, [foodData]);

  function getIngredients() {
    foodEntries.forEach((entrie) => {
      const notNull = entrie[1] !== null && entrie[1] !== '';
      if (entrie[0].includes('strIngredient') && notNull) {
        setFoodIngredients((prevState) => [...prevState, entrie[1]]);
      }
    });
  }

  // Get Measures
  const [foodMeasure, setFoodMeasure] = useState([]);

  function getMeasures() {
    foodEntries.forEach((entrie) => {
      const notNull = entrie[1] !== null && entrie[1] !== '';
      if (entrie[0].includes('strMeasure') && notNull) {
        setFoodMeasure((prevState) => [...prevState, entrie[1]]);
      }
    });
  }

  useEffect(() => {
    getIngredients();
    getMeasures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodEntries]);

  /* START BUTTON */
  const [buttonStatus, setButtonStatus] = useState(true);
  const [buttonName, setButtonName] = useState('Start Recipe');

  /* Check if the Recipe is done. */
  function checkRecipeDone() {
    const prevState = JSON.parse(localStorage.getItem('doneRecipes'));
    if (prevState !== null) {
      prevState.forEach((doneRecipe) => {
        if (doneRecipe.id === foodData.idMeal) setButtonStatus(false);
      });
    }
  }

  /* Check if the Recipe is in Progress. */
  function checkRecipeInProgress() {
    const prevState = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (prevState !== null) {
      const mealId = Object.keys(prevState.meals);
      mealId.forEach((progress) => {
        if (progress === foodData.idMeal) setButtonName('Continue Recipe');
      });
    }
  }

  useEffect(() => {
    checkRecipeInProgress();
    checkRecipeDone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodData]);

  return (
    <>
      <DetailedFoodHeader data={ foodData } />

      <section>
        <ul>
          {foodIngredients !== [] && foodIngredients.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ingredient} — ${foodMeasure[index]}`}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <p data-testid="instructions">{foodData.strInstructions}</p>
      </section>

      <section>
        <video
          data-testid="video"
          width="200"
          height="150"
          controls
          src={ foodData.strYoutube }
        >
          <track
            default
            kind="captions"
            srcLang="en"
            src={ foodData.strYoutube }
          />
          Sorry, your browser do not support embedded videos.
        </video>
      </section>

      <section className="recomendation-div">
        <section className="recomendation-wrap">
          { recommendedFoods !== '' && recommendedFoods.map((drink, index) => (
            <RecommendedCard
              index={ index }
              key={ drink.strDrink }
              title={ drink.strDrink }
              subtitle={ drink.strAlcoholic }
              image={ drink.strDrinkThumb }
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
             onClick={ () => history.push(`/foods/${idFood}/in-progress`) }
           >
             { buttonName }
           </button>
         )}
      </section>
    </>
  );
}
