import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import {
  getIngredientsList, getIngredientSearch,
} from '../../services/ExploreFoodsIngredients';
import { saveListRecipes } from '../../redux/actions';

export default function ExploreFoodsIngredients() {
  const [foodIngredients, setIngredients] = useState([]);
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
    console.log(DATA);
    dispatch(saveListRecipes(DATA));
    console.log(e.target.getAttribute('name'));
    history.push('/foods');
  }

  return (
    <>
      <Header
        imgSize="51"
        fontSize="28"
        title="Explore Ingredients"
        local="container__header-explore-ingredients"
      />
      {foodIngredients.length > 0 ? foodIngredients.map((ig, index) => (
        <button
          name={ ig.strIngredient }
          type="button"
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          onClick={ handleIngredient }
        >
          <div name={ ig.strIngredient }>
            <img
              name={ ig.strIngredient }
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${ig.strIngredient}-Small.png` }
              alt={ ig.strIngredient }
            />
          </div>
          <div>
            <h4 data-testid={ `${index}-card-name` }>
              { ig.strIngredient }
            </h4>
          </div>
        </button>
      )) : null}
      <Footer />
    </>
  );
}
