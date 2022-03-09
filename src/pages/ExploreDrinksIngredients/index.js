import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import getIngredientsList from '../../services/ExploreDrinksIngredients';

export default function ExploreDrinkIngredients() {
  const [drinkIngredients, setIngredients] = useState([]);

  useEffect(() => {
    async function getIngredients() {
      setIngredients(await getIngredientsList());
    }
    getIngredients();
  }, []);

  return (
    <>
      <Header title="Explore Ingredients" />
      {drinkIngredients.length > 0 ? drinkIngredients.map((ig, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => console.log('a') }
        >
          <div>
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${ig.strIngredient1}-Small.png` }
              alt={ ig.strIngredient1 }
            />
          </div>
          <div>
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
