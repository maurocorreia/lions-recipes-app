import React from 'react';
import { useHistory } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import getRandomFoodRecipe from '../../services/ExploreFoods';
// import getIngredientsList from '../../services/ExploreFoodsIngredients';
// import { foodIngredients } from '../../redux/actions';

export default function ExploreFoods() {
  const history = useHistory();
  // const dispatch = useDispatch();

  async function handleSurprise() {
    const ID = await getRandomFoodRecipe();
    history.push(`/foods/${ID}`);
  }

  // async function handleByIngredient() {
  //   // const ID = await getIngredientsList();
  //   // // dispatch(foodIngredients(ID));
  //   history.push('/explore/foods/ingredients');
  // }

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
      <Footer />
    </div>
  );
}
