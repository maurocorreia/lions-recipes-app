import React, { useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { fetchFoodbyId, fetchRecommendedDrinks } from '../../services/DetailedItem';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import RecommendedCard from '../../components/RecommendedCard';

export default function DetailedFood() {
  //  Globals
  const history = useHistory();
  const { idFood } = useParams();
  const { pathname } = useLocation();
  const copy = require('clipboard-copy'); // eslint-disable-line global-require

  //  Fetch and Load.
  const [foodData, setFoodData] = useState('');
  const [recommendedFoods, setRecommendedFoods] = useState('');

  useEffect(() => {
    fetchFoodbyId(idFood).then((result) => setFoodData(result));
    fetchRecommendedDrinks().then((result) => setRecommendedFoods(result));
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

  // Clipboard
  const [copied, setCopied] = useState(false);
  function copyLink() {
    copy(`http://localhost:3000${pathname}`);
    setCopied(true);
  }

  return (
    <>
      <header>
        <img data-testid="recipe-photo" src={ foodData.strMealThumb } alt="foodImage" />
        <h1 data-testid="recipe-title">{ foodData.strMeal }</h1>
        <h2 data-testid="recipe-category">{ foodData.strCategory }</h2>
        <button type="button" data-testid="share-btn" onClick={ () => copyLink() }>
          <img src={ shareIcon } alt="shareIcon" />
        </button>
        <button type="button" data-testid="favorite-btn">
          <img src={ whiteHeartIcon } alt="favIcon" />
        </button>
      </header>

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

      <section>
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

      <section>
        <button
          style={ {
            bottom: '0px',
            position: 'fixed',
          } }
          aria-label="Start Recipe"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => history.push(`/foods/${idFood}/in-progress`) }
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
