import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Card({ recipe, index }) {
  const { pathname } = useLocation();
  return (
    <section
      data-testid={ `${index}-recipe-card` }
    >
      <Link to={ `${pathname}/${recipe.idMeal || recipe.idDrink}` }>
        <div>
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe.strDrinkThumb || recipe.strMealThumb }
            alt={ recipe.strDrink || recipe.strMeal }
          />
        </div>
        <div>
          <h4
            data-testid={ `${index}-card-name` }
          >
            {recipe.strDrink || recipe.strMeal}
          </h4>
        </div>
      </Link>
    </section>
  );
}

Card.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};
