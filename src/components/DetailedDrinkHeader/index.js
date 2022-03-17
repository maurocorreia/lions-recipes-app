import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { removeFavorite, saveFavorite } from '../../redux/actions';
import style from './detailed_drink_header.module.css';

const copy = require('clipboard-copy');

export default function DetailedDrinkHeader({ data }) {
  // Clipboard.
  const { idDrink } = useParams();
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();
  const favoriteRecipe = useSelector(({ recipesReducer }) => (
    recipesReducer.favoriteRecipes));
  console.log(data);
  function copyLink() {
    copy(`http://localhost:3000/drinks/${idDrink}`);
    setCopied(true);
  }
  // console.log(favoriteRecipe);
  /*          FAVORITE BUTTON                */
  const [isFavorited, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favoriteRecipe.some(({ id }) => id === data.idDrink));
  }, [data.idDrink, favoriteRecipe]);
  // // Favoring Item.
  // function favButton() {
  //   setIsFavorite((prevState) => !prevState);
  //   const prevState = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //   const actualState = {
  //     id: data.idDrink,
  //     type: 'drink',
  //     nationality: '',
  //     category: data.strCategory,
  //     alcoholicOrNot: data.strAlcoholic,
  //     name: data.strDrink,
  //     image: data.strDrinkThumb,
  //   };
  //   if (prevState === null) {
  //     localStorage.setItem('favoriteRecipes', JSON.stringify([actualState]));
  //   } else {
  //     localStorage.setItem('favoriteRecipes',
  //       JSON.stringify([...prevState, actualState]));
  //   }
  // }

  function addOrRemoveFavorite() {
    const actualState = {
      id: data.idDrink,
      type: 'drink',
      nationality: '',
      category: data.strCategory,
      alcoholicOrNot: data.strAlcoholic,
      name: data.strDrink,
      image: data.strDrinkThumb,
    };
    if (!isFavorited) dispatch(saveFavorite(actualState));
    else dispatch(removeFavorite(data.idDrink));
    setIsFavorite((prevState) => !prevState);
  }

  // // Unfavoring Item.
  // function unfavButton() {
  //   setIsFavorite((prevState) => !prevState);
  //   const prevState = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //   const newState = prevState.filter((element) => element.id !== data.idDrink);
  //   localStorage.setItem('favoriteRecipes',
  //     JSON.stringify([...newState]));
  // }

  // // Check Favorite Button Status.
  // function checkFavorite() {
  //   const prevState = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //   if (prevState) {
  //     prevState.forEach((favorited) => {
  //       if (favorited.id === data.idDrink) setIsFavorite(true);
  //     });
  //   }
  // }

  // Ruy.
  // const favoriteFunctions = {
  //   true: unfavButton,
  //   false: favButton,
  // };

  // useEffect(() => {
  //   checkFavorite(); // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data]);

  return (
    <header className={ style.body }>
      <div className={ style.imgDiv }>
        <img
          className={ style.drinkImage }
          data-testid="recipe-photo"
          src={ data.strDrinkThumb }
          alt="foodImage"
        />
      </div>

      <div className={ style.menuWrapper }>
        <div className={ style.infoWrapper }>
          <h1 data-testid="recipe-title">{data.strDrink}</h1>
          <h2 data-testid="recipe-category">{data.strAlcoholic}</h2>
        </div>

        <div className={ style.buttonWrapper }>
          <button type="button" data-testid="share-btn" onClick={ () => copyLink() }>
            <img src={ shareIcon } alt="shareIcon" />
          </button>
          <button onClick={ addOrRemoveFavorite } type="button">
            <img
              data-testid="favorite-btn"
              src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
              alt="favIcon"
            />
          </button>
        </div>

      </div>
      <div className={ style.shareMessege }>
        {copied && <p>Link copied!</p>}
      </div>
    </header>
  );
}

DetailedDrinkHeader.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
