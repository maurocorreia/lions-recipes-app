import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import YouTube from 'react-youtube';
import { useSelector } from 'react-redux';
import { fetchFoodbyId, fetchRecommendedDrinks } from '../../services/DetailedItem';
import RecommendedCard from '../../components/RecommendedCard';
import DetailedFoodHeader from '../../components/DetailedFoodHeader';
import style from './detailed_food.module.css';

export default function DetailedFood() {
  //  Globals
  const history = useHistory();
  const { idFood } = useParams();
  const doneAndInProgress = useSelector(({ recipesReducer }) => ({
    inProgressRecipes: recipesReducer.inProgressRecipes, done: recipesReducer.doneRecipes,
  }));

  //  Fetch and Load.
  const [foodData, setFoodData] = useState({});
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
  // function checkRecipeDone() {
  //   const prevState = JSON.parse(localStorage.getItem('doneRecipes'));
  //   if (prevState !== null) {
  //     prevState.forEach((doneRecipe) => {
  //       if (doneRecipe.id === foodData.idMeal) setButtonStatus(false);
  //     });
  //   }
  // }

  function checkRecipeDone() {
    const { done } = doneAndInProgress;
    if (done.some(({ id }) => id === foodData.idMeal)) setButtonStatus(false);
  }

  /* Check if the Recipe is in Progress. */
  // function checkRecipeInProgress() {
  //   const prevState = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   if (prevState !== null) {
  //     const mealId = Object.keys(prevState.meals);
  //     mealId.forEach((progress) => {
  //       if (progress === foodData.idMeal) setButtonName('Continue Recipe');
  //     });
  //   }
  // }

  function checkRecipeInProgress() {
    const { inProgressRecipes } = doneAndInProgress;
    if (inProgressRecipes.meals[idFood]) setButtonName('Continue Recipe');
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
        <h1 className={ style.subtitle }> Ingredients </h1>
        <ul className={ style.ingredientList }>
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
        <h1 className={ style.subtitle }> Instructions </h1>
        <p
          data-testid="instructions"
          className={ style.instructions }
        >
          {foodData.strInstructions}
        </p>
      </section>

      <section data-testid="video">
        <h1 className={ style.subtitle }> Video </h1>
        {Object.keys(foodData).length
        && <YouTube
          opts={ { height: '200', width: '360' } }
          videoId={ foodData.strYoutube.split('=')[1] }
        />}
      </section>

      <section className="recomendation-div">
        <h1 className={ style.subtitle }> Recomendations </h1>
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

      <section className={ style.startWrapper }>
        {buttonStatus
         && (
           <button
             className={ style.startButton }
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
