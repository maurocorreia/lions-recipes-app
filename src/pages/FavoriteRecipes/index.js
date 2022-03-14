import React, { useState, useEffect } from 'react';
import CardFavorites from '../../components/CardFavorites';
import Header from '../../components/Header';

export default function FavoriteRecipes() {
  const [backup, setBackup] = useState();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [clickFavorite, setClickFavorite] = useState(false);

  function UpdateFavoriteRecipes() {
    const favoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoriteRecipe) {
      setFavoriteRecipes([]);
    }
    setBackup(favoriteRecipe);
    // console.log(doneRecipe);
    setFavoriteRecipes(favoriteRecipe);
  }

  useEffect(() => {
    UpdateFavoriteRecipes();
  }, [clickFavorite]);

  const clickButtonRecipe = ({ target }) => {
    if (target.value === 'food') {
      setFavoriteRecipes(backup.filter((item) => item.type === 'food'));
    } else if (target.value === 'drink') {
      setFavoriteRecipes(backup.filter((item) => item.type === 'drink'));
    } else if (target.value === 'all') {
      setFavoriteRecipes(backup);
    }
  };

  return (
    <>
      <Header title="Favorite Recipes" />
      <div>
        <button
          value="all"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ (e) => clickButtonRecipe(e) }
        >
          All
        </button>
        <button
          value="food"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ (e) => clickButtonRecipe(e) }
        >
          Food
        </button>
        <button
          value="drink"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ (e) => clickButtonRecipe(e) }
        >
          Drinks
        </button>
        {favoriteRecipes && favoriteRecipes.map((item, index) => (
          <CardFavorites
            key={ item.name }
            recipe={ item }
            index={ index }
            setClickButton={ setClickFavorite }
          />))}
      </div>
    </>
  );
}
