import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import getRandomDrinkRecipe from '../../services/ExploreDrinks';
import style from './style.module.css';

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
      <section className={ style.container__drink }>
        <button
          className={ style.explore__drink__ingredients }
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/drinks/ingredients') }
        >
          By Ingredient
        </button>
        <button
          className={ style.explore__drink__surprise }
          type="button"
          data-testid="explore-surprise"
          onClick={ handleSurprise }
        >
          Surprise me!
        </button>
      </section>
      <Footer />
    </div>
  );
}
