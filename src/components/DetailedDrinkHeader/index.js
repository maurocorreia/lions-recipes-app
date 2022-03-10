import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

export default function DetailedDrinkHeader({ data }) {
  // Clipboard.
  const { pathname } = useLocation();
  const copy = require('clipboard-copy'); // eslint-disable-line global-require
  const [copied, setCopied] = useState(false);

  function copyLink() {
    copy(`http://localhost:3000${pathname}`);
    setCopied(true);
  }

  /*          FAVORITE BUTTON                */
  const [isFavorited, setIsFavorite] = useState(false);

  // Favoring Item.
  function favButton() {
    setIsFavorite((prevState) => !prevState);
    const prevState = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const actualState = {
      id: data.idDrink,
      type: 'drink',
      nationality: '',
      category: data.strCategory,
      alcoholicOrNot: data.strAlcoholic,
      name: data.strDrink,
      image: data.strDrinkThumb,
    };
    if (prevState === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([actualState]));
    } else {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...prevState, actualState]));
    }
  }

  // Unfavoring Item.
  function unfavButton() {
    setIsFavorite((prevState) => !prevState);
    const prevState = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newState = prevState.filter((element) => element.id !== data.idDrink);
    localStorage.setItem('favoriteRecipes',
      JSON.stringify([...newState]));
  }

  // Check Favorite Button Status.
  function checkFavorite() {
    const prevState = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (prevState !== null) {
      prevState.forEach((favorited) => {
        if (favorited.id === data.idDrink) setIsFavorite(true);
      });
    }
  }

  // Ruy.
  const favoriteFunctions = {
    true: unfavButton,
    false: favButton,
  };

  useEffect(() => {
    checkFavorite(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <header>
      <img data-testid="recipe-photo" src={ data.strDrinkThumb } alt="foodImage" />
      <h1 data-testid="recipe-title">{data.strDrink}</h1>
      <h2 data-testid="recipe-category">{data.strAlcoholic}</h2>
      <button type="button" data-testid="share-btn" onClick={ () => copyLink() }>
        <img src={ shareIcon } alt="shareIcon" />
      </button>
      <button onClick={ () => favoriteFunctions[isFavorited]() } type="button">
        <img
          data-testid="favorite-btn"
          src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
          alt="favIcon"
        />
      </button>

      {copied && <p>Link copied!</p>}

    </header>
  );
}

DetailedDrinkHeader.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
