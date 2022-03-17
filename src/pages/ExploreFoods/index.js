import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import getRandomFoodRecipe from '../../services/ExploreFoods';
import style from './style.module.css';

export default function ExploreFoods() {
  const history = useHistory();

  async function handleSurprise() {
    const ID = await getRandomFoodRecipe();
    history.push(`/foods/${ID}`);
  }

  return (
    <div className={ style.container_food__explore }>
      <Header
        imgSize="51"
        title="Explore Foods"
        fontSize="35"
        local="container__header-explore-foods"
      />
      <section className={ style.container_food }>
        <button
          className={ style.explore_ingredient_food }
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/foods/ingredients') }
        >
          By Ingredient
        </button>

        <button
          className={ style.explore_nationality_food }
          type="button"
          data-testid="explore-by-nationality"
          onClick={ () => history.push('/explore/foods/nationalities') }
        >
          By Nationality
        </button>

        <button
          className={ style.explore_surprise_food }
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
