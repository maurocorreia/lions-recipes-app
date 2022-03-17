import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { removeFavorite } from '../../redux/actions';
import style from './style.module.css';

const copy = require('clipboard-copy');

export default function CardRecipes({ recipe, index }) {
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();

  const { push } = useHistory();

  function copyLink() {
    copy(`http://localhost:3000/foods/${recipe.id}`);
    setCopied(true);
  }

  return (
    <section className={ style.container__favCard }>
      <div className={ style.container__image }>
        <input
          type="image"
          onClick={ () => push(`${recipe.type}s/${recipe.id}`) }
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
        />
      </div>
      <div className={ style['container__all-info'] }>
        {/* Acho que com ternário fica melhor, não esquecer de refatorar */}
        <div className={ style.container__info }>
          <div>
            {recipe.type === 'food' && (
              <h4 data-testid={ `${index}-horizontal-top-text` }>
                { `${recipe.nationality} - ${recipe.category}` }
              </h4>
            )}
          </div>
          {recipe.alcoholicOrNot === 'Alcoholic' && (
            <h4 data-testid={ `${index}-horizontal-top-text` }>
              { recipe.alcoholicOrNot }
            </h4>
          )}
          <Link to={ `${recipe.type}s/${recipe.id}` } className={ style.name }>
            <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
          </Link>
        </div>
        <div className={ style.container__buttons }>
          <button
            type="button"
            onClick={ () => copyLink() }
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="IconShare"
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="IconShare"
            />
          </button>
          <button onClick={ () => dispatch(removeFavorite(recipe.id)) } type="button">
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="favIcon"
            />
          </button>
        </div>
        {copied && <p>Link copied!</p>}
      </div>
    </section>
  );
}

CardRecipes.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number,
  tag: PropTypes.string,
}.isRequired;
