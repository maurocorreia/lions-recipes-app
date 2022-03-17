import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import {
  getIngredientsList, getIngredientSearch,
} from '../../services/ExploreDrinksIngredients';
import { saveListRecipes } from '../../redux/actions';

export default function ExploreDrinkIngredients() {
  const [drinkIngredients, setIngredients] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    async function getIngredients() {
      setIngredients(await getIngredientsList());
    }
    getIngredients();
  }, []);

  async function handleIngredient(e) {
    e.persist();
    const DATA = await getIngredientSearch(e.target.getAttribute('name'));
    dispatch(saveListRecipes(DATA));
    console.log(e.target.getAttribute('name'));
    history.push('/drinks');
  }

  return (
    <>
      <Header
        imgSize="51"
        fontSize="28"
        title="Explore Ingredients"
        local="container__header-explore-ingredients"
      />
      {drinkIngredients.length > 0 ? drinkIngredients.map((ig, index) => (
        <button
          name={ ig.strIngredient1 }
          type="button"
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          onClick={ handleIngredient }
        >
          <div name={ ig.strIngredient1 }>
            <img
              name={ ig.strIngredient1 }
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${ig.strIngredient1}-Small.png` }
              alt={ ig.strIngredient1 }
            />
          </div>
          <div name={ ig.strIngredient1 }>
            <h4 data-testid={ `${index}-card-name` }>
              { ig.strIngredient1 }
            </h4>
          </div>
        </button>
      )) : null}
      <Footer />
    </>
  );
}
