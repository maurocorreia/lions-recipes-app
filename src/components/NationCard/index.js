import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';

export default function NationCard({ recipe, index }) {
  return (
    <div
      className={ style.container__cards }
      data-testid={ `${index}-recipe-card` }
    >
      <div
        className={ style.container__image }
        name={ recipe.idMeal }
      >
        <img
          name={ recipe.idMeal }
          data-testid={ `${index}-card-img` }
          src={ recipe.strDrinkThumb || recipe.strMealThumb }
          alt={ recipe.strDrink || recipe.strMeal }
        />
      </div>
      <div
        className={ style.container__name }
        name={ recipe.idMeal }
      >
        <h4 data-testid={ `${index}-card-name` }>{recipe.strDrink || recipe.strMeal}</h4>
      </div>
    </div>
  );
}

NationCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};
