import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchFoodbyId } from '../../services/DetailedItem';
import DetailedFoodHeader from '../../components/DetailedFoodHeader';

export default function FoodInProgress() {
  //  Globals
  const history = useHistory();
  const { idFood } = useParams();

  //  Fetch and Load.
  const [foodData, setFoodData] = useState('');

  useEffect(() => {
    fetchFoodbyId(idFood).then((result) => setFoodData(result));
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

  return (
    <>
      <DetailedFoodHeader data={ foodData } />

      <section>
        <ul>
          {foodIngredients !== [] && foodIngredients.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-step` }
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
        <button
          className="finish-button"
          aria-label="Finish Recipe"
          data-testid="finish-recipe-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }
        >
          Finish Recipe
        </button>
      </section>
    </>
  );
}
