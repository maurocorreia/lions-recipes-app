import React, { useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { fetchDrinkbyId, fetchRecommendedFoods } from '../../services/DetailedItem';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import RecommendedCard from '../../components/RecommendedCard';

export default function DetailedDrink() {
  //  Globals
  const history = useHistory();
  const { idDrink } = useParams();
  const { pathname } = useLocation();
  const copy = require('clipboard-copy'); // eslint-disable-line global-require

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

  // Clipboard
  const [copied, setCopied] = useState(false);
  function copyLink() {
    copy(`http://localhost:3000${pathname}`);
    setCopied(true);
  }

  return (
    <>
      <header>
        <img data-testid="recipe-photo" src={ drinkData.strDrinkThumb } alt="foodImage" />
        <h1 data-testid="recipe-title">{ drinkData.strDrink }</h1>
        <h2 data-testid="recipe-category">{ drinkData.strAlcoholic }</h2>
        <button type="button" data-testid="share-btn" onClick={ () => copyLink() }>
          <img src={ shareIcon } alt="shareIcon" />
        </button>
        <button type="button" data-testid="favorite-btn">
          <img src={ whiteHeartIcon } alt="favIcon" />
        </button>
      </header>

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

      <section>
        {copied && <p>Link copied!</p>}
      </section>
    </>
  );
}
