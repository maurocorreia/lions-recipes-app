import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function NationCard({ recipe, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <div name={ recipe.idMeal }>
        <img
          className="card"
          name={ recipe.idMeal }
          data-testid={ `${index}-card-img` }
          src={ recipe.strDrinkThumb || recipe.strMealThumb }
          alt={ recipe.strDrink || recipe.strMeal }
        />
      </div>
      <div name={ recipe.idMeal }>
        <h4 data-testid={ `${index}-card-name` }>{recipe.strDrink || recipe.strMeal}</h4>
      </div>
    </div>
  );
}

NationCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};
