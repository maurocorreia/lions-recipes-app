import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './card.module.css';

export default function Card({ recipe, index }) {
  const { pathname } = useLocation();
  return (
    <section
      className={ style.container__card }
      data-testid={ `${index}-recipe-card` }
    >
      <Link
        className={ style['container__card-link'] }
        to={ `${pathname}/${recipe.idMeal || recipe.idDrink}` }
      >
        <div className={ style.container__image }>
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe.strDrinkThumb || recipe.strMealThumb }
            alt={ recipe.strDrink || recipe.strMeal }
          />
        </div>
        <div className={ style.container__name }>
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
