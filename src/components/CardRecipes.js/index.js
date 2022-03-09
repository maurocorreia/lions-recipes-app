import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

export default function CardRecipes({ recipe, index }) {
  console.log(recipe);
  console.log(index);
  return (
    <>
      <div>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
        />
      </div>
      <div>
        <h4 data-testid={ `${index}-horizontal-top-text` }>{ recipe.category }</h4>
      </div>
      <div>
        <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
      </div>
      <div>
        <h2 data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</h2>
      </div>
      <button
        type="button"
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="IconShare"
        />
      </button>
      {recipe.tags && (
        <ul>
          {recipe.tags.map((tag) => (
            <ol key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</ol>))}
        </ul>
      )}
    </>
  );
}

CardRecipes.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number,
  tag: PropTypes.string,
}.isRequired;
