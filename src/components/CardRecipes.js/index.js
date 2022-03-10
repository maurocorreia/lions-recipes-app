import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

export default function CardRecipes({ recipe, index }) {
  console.log(recipe);
  console.log(index);
  return (
    <>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
        />
      </div>
      {/* Acho que com ternário fica melhor, não esquecer de refatorar */}
      <div>
        {recipe.type === 'food' && (
          <h4 data-testid={ `${index}-horizontal-top-text` }>
            { `${recipe.nationality} - ${recipe.category}` }
          </h4>
        )}
      </div>
      <div>
        {recipe.alcoholicOrNot === 'Alcoholic' && (
          <p data-testid={ `${index}-horizontal-top-text` }>
            { recipe.alcoholicOrNot }
          </p>
        )}
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
          {recipe.tags.filter((_tag, i) => i < 2).map((tag) => (
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
