import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import style from './style.module.css';

const copy = require('clipboard-copy');

export default function CardRecipes({ recipe, index }) {
  const [copied, setCopied] = useState(false);

  function copyLink() {
    copy(`http://localhost:3000/foods/${recipe.id}`);
    setCopied(true);
  }

  return (
    <section className={ style.container__doneCard }>

      <div className={ style.container__img }>
        <Link to={ `${recipe.type}s/${recipe.id}` }>
          <img
            width="200px"
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />
        </Link>
      </div>

      <div className={ style['container__all-info'] }>
        <div className={ style.name }>
          {recipe.type === 'food' && (
            <h4 data-testid={ `${index}-horizontal-top-text` }>
              { `${recipe.nationality} - ${recipe.category}` }
            </h4>
          )}
        </div>

        <div>
          {recipe.alcoholicOrNot === 'Alcoholic' && (
            <p
              className={ style.name_alcoholic }
              data-testid={ `${index}-horizontal-top-text` }
            >
              { recipe.alcoholicOrNot }
            </p>
          )}
        </div>

        <Link className={ style.link__name } to={ `${recipe.type}s/${recipe.id}` }>
          <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
        </Link>

        <div className={ style.data }>
          <h2 data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</h2>
        </div>

        {recipe.tags.length > 1 && (
          <ul className={ style.container__tag }>
            {recipe.tags.filter((_tag, i) => i < 2).map((tag) => (
              <ol
                className={ style.tag }
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </ol>
            ))}
          </ul>
        )}
        <div className={ style.container__button_share }>
          <button
            className={ style.button_share }
            type="button"
            onClick={ () => copyLink() }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="IconShare"
            />
          </button>
          {copied && <p className={ style.name_alcoholic }>Link copied!</p>}
        </div>
      </div>
    </section>
  );
}

CardRecipes.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number,
  tag: PropTypes.string,
}.isRequired;
