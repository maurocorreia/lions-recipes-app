import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import getRandomFoodRecipe from './service';

export default function ExploreFoods() {
  const history = useHistory();

  async function handleSurprise() {
    const ID = await getRandomFoodRecipe();
    history.push(`/foods/${ID}`);
  }

  return (
    <div>
      <Header title="Explore Foods" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/foods/ingredients') }
      >
        By Ingredient
      </button>

      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ () => history.push('/explore/foods/nationalities') }
      >
        By Nationality
      </button>

      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ handleSurprise }
      >
        Surprise me!
      </button>
    </div>
  );
}
