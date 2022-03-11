import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDrinkbyId } from '../../services/DetailedItem';
import DetailedDrinkHeader from '../../components/DetailedDrinkHeader';
import IngredientsList from '../../components/IngredientsList';

export default function DrinkInProgress() {
  const STORAGE = localStorage.getItem('inProgressRecipes');
  if (!STORAGE) {
    localStorage.setItem('inProgressRecipes',
      JSON.stringify({ cocktails: {}, meals: {} }));
  }
  //  Globals
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
      <IngredientsList
        ingredients={ drinkIngredients }
        measure={ drinkMeasure }
        idRecipes={ idDrink }
        data={ drinkData }
        type="cocktails"
      />
    </>
  );
}
