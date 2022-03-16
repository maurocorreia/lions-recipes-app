import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import getRandomDrinkRecipe from '../../services/ExploreDrinks';

export default function ExploreDrinks() {
  const history = useHistory();

  async function handleSurprise() {
    const ID = await getRandomDrinkRecipe();
    history.push(`/drinks/${ID}`);
  }

  return (
    <div>
      <Header
        imgSize="51"
        title="Explore Drinks"
        fontSize="35"
        local="container__header-explore-foods"
      />
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
      <Footer />
    </div>
  );
}
