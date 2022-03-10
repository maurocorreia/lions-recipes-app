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
  const [foodMeasure, setFoodMeasure] = useState([]);

  function getMeasures() {
    drinkEntries.forEach((entrie) => {
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
  }, [drinkEntries]);

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
              {`${ingredient} — ${foodMeasure[index]}`}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <p data-testid="instructions">{drinkData.strInstructions}</p>
      </section>

      <section>
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

      <section>
        <button
          style={ {
            bottom: '0px',
            position: 'fixed',
          } }
          aria-label="Start Recipe"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => history.push(`/drinks/${idDrink}/in-progress`) }
        >
          Start Recipe
        </button>
      </section>
    </>
  );
}
