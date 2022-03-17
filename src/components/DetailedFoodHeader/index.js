import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { saveFavorite, removeFavorite } from '../../redux/actions';
import style from './detailed_food_header.module.css';

const copy = require('clipboard-copy');

export default function DetailedFoodHeader({ data }) {
  // Clipboard.
  const { idFood } = useParams();
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();
  const [isFavorited, setIsFavorite] = useState(false);

  const favoriteRecipe = useSelector(({ recipesReducer }) => (
    recipesReducer.favoriteRecipes));

  function copyLink() {
    copy(`http://localhost:3000/foods/${idFood}`);
    setCopied(true);
  }
  console.log(data);
  useEffect(() => {
    console.log(data);
    setIsFavorite(favoriteRecipe.some(({ id }) => id === data.idMeal));
  }, [data, favoriteRecipe]);
  /*          FAVORITE BUTTON                */
  // const [isFavorited, setIsFavorite] = useState(false);

  // Favoring Item.
  // function favButton() {
  //   setIsFavorite((prevState) => !prevState);
  //   const prevState = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //   const actualState = {
  //     id: data.idMeal,
  //     type: 'food',
  //     nationality: data.strArea,
  //     category: data.strCategory,
  //     alcoholicOrNot: '',
  //     name: data.strMeal,
  //     image: data.strMealThumb,
  //   };
  //   if (prevState === null) {
  //     localStorage.setItem('favoriteRecipes', JSON.stringify([actualState]));
  //   } else {
  //     localStorage.setItem('favoriteRecipes',
  //       JSON.stringify([...prevState, actualState]));
  //   }
  // }
  function addOrRemoveFavorite() {
    console.log(isFavorited);
    const actualState = {
      id: data.idMeal,
      type: 'food',
      nationality: data.strArea,
      category: data.strCategory,
      alcoholicOrNot: '',
      name: data.strMeal,
      image: data.strMealThumb,
    };
    if (!isFavorited) dispatch(saveFavorite(actualState));
    else dispatch(removeFavorite(data.idMeal));
    setIsFavorite((prevState) => !prevState);
  }

  // Unfavoring Item.
  // function unfavButton() {
  //   setIsFavorite((prevState) => !prevState);
  //   const prevState = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //   const newState = prevState.filter((element) => element.id !== data.idMeal);
  //   localStorage.setItem('favoriteRecipes',
  //     JSON.stringify([...newState]));
  // }

  // Check Favorite Button Status.
  // function checkFavorite() {
  //   const prevState = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //   if (prevState !== null) {
  //     prevState.forEach((favorited) => {
  //       if (favorited.id === data.idMeal) setIsFavorite(true);
  //     });
  //   }
  // }

  // // Ruy.
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
          className={ style.foodImage }
          data-testid="recipe-photo"
          src={ data.strMealThumb }
          alt="foodImage"
        />
      </div>

      <div className={ style.menuWrapper }>
        <div className={ style.infoWrapper }>
          <h1 data-testid="recipe-title">{data.strMeal}</h1>
          <h2 data-testid="recipe-category">{data.strCategory}</h2>
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
      {copied && <p>Link copied!</p>}
    </header>
  );
}

DetailedFoodHeader.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};
