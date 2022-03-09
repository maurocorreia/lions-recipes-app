import React from 'react';
import PropTypes from 'prop-types';

export default function Card({ recipe, index }) {
  return (
    <section data-testid={ `${index}-recipe-card` }>
      <div>
        <img
          data-testid={ `${index}-card-img` }
          src={ recipe.strDrinkThumb || recipe.strMealThumb }
          alt={ recipe.strDrink || recipe.strMeal }
        />
      </div>
      <div>
        <h4 data-testid={ `${index}-card-name` }>{recipe.strDrink || recipe.strMeal}</h4>
      </div>
    </section>
  );
}

Card.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};
