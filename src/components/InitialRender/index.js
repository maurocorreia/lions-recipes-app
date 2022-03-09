import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';

const MAX_RECIPES = 12;
export default function InitialRender({ Allrecipes }) {
  return (
    <section>
      {Allrecipes.slice(0, MAX_RECIPES).map((recipe, index) => (
        <Card
          key={ recipe.idMeal || recipe.idDrink }
          recipe={ recipe }
          index={ index }
        />))}
    </section>);
}

InitialRender.propTypes = {
  Allrecipes: PropTypes.arrayOf(PropTypes.any).isRequired,
};
