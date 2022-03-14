import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

export default function CardRecipes({ recipe, index, setClickButton }) {
  const [copied, setCopied] = useState(false);
  const [isFavorited, setIsFavorite] = useState(true);

  const { push } = useHistory();

  /*          FAVORITE BUTTON                */

  // Unfavoring Item.
  function unfavButton() {
    setIsFavorite((prevState) => !prevState);
    const prevState = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newState = prevState.filter((element) => element.id !== recipe.id);
    localStorage.setItem('favoriteRecipes',
      JSON.stringify([...newState]));
    setClickButton((state) => !state);
  }

  function copyLink() {
    copy(`http://localhost:3000/foods/${recipe.id}`);
    setCopied(true);
  }

  return (
    <>
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
      <button onClick={ () => unfavButton() } type="button">
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
          alt="favIcon"
        />
      </button>
      <input
        type="image"
        onClick={ () => push(`${recipe.type}s/${recipe.id}`) }
        data-testid={ `${index}-horizontal-image` }
        width="200px"
        src={ recipe.image }
        alt={ recipe.name }
      />
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
    </>
  );
}

CardRecipes.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number,
  tag: PropTypes.string,
}.isRequired;
