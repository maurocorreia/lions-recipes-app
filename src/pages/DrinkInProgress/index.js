import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchDrinkbyId } from '../../services/DetailedItem';
import DetailedDrinkHeader from '../../components/DetailedDrinkHeader';

export default function DrinkInProgress() {
  //  Globals
  const history = useHistory();
  const { idDrink } = useParams();

  //  Fetch and Load.
  const [drinkData, setDrinkData] = useState('');

  useEffect(() => {
    fetchDrinkbyId(idDrink).then((result) => setDrinkData(result));
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

  return (
    <>
      <DetailedDrinkHeader data={ drinkData } />

      <section>
        <ul>
          {drinkIngredients !== [] && drinkIngredients.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              {`${ingredient} — ${drinkMeasure[index]}`}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <p data-testid="instructions">{drinkData.strInstructions}</p>
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
