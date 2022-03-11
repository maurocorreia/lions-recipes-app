import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFoodbyId } from '../../services/DetailedItem';
import DetailedFoodHeader from '../../components/DetailedFoodHeader';
import IngredientsList from '../../components/IngredientsList';

export default function FoodInProgress() {
  const STORAGE = localStorage.getItem('inProgressRecipes');
  if (!STORAGE) {
    localStorage.setItem('inProgressRecipes',
      JSON.stringify({ cocktails: {}, meals: {} }));
  }

  //  Globals
  const { idFood } = useParams();

  //  Fetch and Load.
  const [foodData, setFoodData] = useState('');
  // const [isDisabled, setDisabled] = useState(true);

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
      <IngredientsList
        ingredients={ foodIngredients }
        measure={ foodMeasure }
        idRecipes={ idFood }
        data={ foodData }
        type="meals"
      />
    </>
  );
}
