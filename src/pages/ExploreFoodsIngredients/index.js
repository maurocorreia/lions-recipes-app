import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import getIngredientsList from '../../services/ExploreFoodsIngredients';

export default function ExploreFoodsIngredients() {
  const [foodIngredients, setIngredients] = useState([]);

  useEffect(() => {
    async function getIngredients() {
      setIngredients(await getIngredientsList());
    }
    getIngredients();
  }, []);

  return (
    <>
      <Header title="Explore Ingredients" />
      {foodIngredients.length > 0 ? foodIngredients.map((ig, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => console.log('a') }
        >
          <div>
            <img
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
