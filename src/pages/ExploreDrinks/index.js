import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import getRandomDrinkRecipe from './service';

export default function ExploreDrinks() {
  const history = useHistory();

  async function handleSurprise() {
    const ID = await getRandomDrinkRecipe();
    history.push(`/drinks/${ID}`);
  }

  return (
    <div>
      <Header title="Explore Drinks" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/drinks/ingredients') }
      >
        By Ingredient
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
