import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import getRandomFoodRecipe from '../../services/ExploreFoods';

export default function ExploreFoods() {
  const history = useHistory();

  async function handleSurprise() {
    const ID = await getRandomFoodRecipe();
    history.push(`/foods/${ID}`);
  }

  return (
    <div>
      <Header
        imgSize="51"
        title="Explore Foods"
        fontSize="35"
        local="container__header-explore-foods"
      />
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
      <Footer />
    </div>
  );
}
