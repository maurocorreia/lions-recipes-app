import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function CardRecipes({ recipe, index }) {
  const [copied, setCopied] = useState(false);

  function copyLink() {
    copy(`http://localhost:3000/foods/${recipe.id}`);
    setCopied(true);
  }

  return (
    <section>
      <button
        type="button"
        onClick={ () => copyLink() }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="IconShare"
        />
      </button>
      {copied && <p>Link copied!</p>}
      <Link to={ `${recipe.type}s/${recipe.id}` }>
        <img
          width="200px"
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
        />
      </Link>
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
      <Link to={ `${recipe.type}s/${recipe.id}` }>
        <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
      </Link>
      <div>
        <h2 data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</h2>
      </div>
      {recipe.tags !== [] && (
        <ul>
          {recipe.tags.filter((_tag, i) => i < 2).map((tag) => (
            <ol key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</ol>))}
        </ul>
      )}
    </section>
  );
}

CardRecipes.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number,
  tag: PropTypes.string,
}.isRequired;
