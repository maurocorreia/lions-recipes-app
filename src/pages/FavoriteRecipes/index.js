import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CardFavorites from '../../components/CardFavorites';
import Header from '../../components/Header';
import style from './style.module.css';

export default function FavoriteRecipes() {
  const favoriteRecipe = useSelector(({ recipesReducer }) => (
    recipesReducer.favoriteRecipes));
  const [favoriteList, setFavoriteList] = useState(favoriteRecipe);

  const clickButtonRecipe = ({ target: { value } }) => {
    const filter = {
      food: () => setFavoriteList(favoriteRecipe.filter(({ type }) => type === 'food')),
      drink: () => setFavoriteList(favoriteRecipe.filter(({ type }) => type === 'drink')),
      all: () => setFavoriteList(favoriteRecipe),
    };
    return filter[value]();
  };

  useEffect(() => setFavoriteList(favoriteRecipe), [favoriteRecipe]);

  return (
    <section style={ { backgroundColor: '#f0f0f0', height: '1000vh' } }>
      <Header
        imgSize="52"
        fontSize="32"
        title="Favorite Recipes"
        local="container__header-favoriteRecipes"
      />
      <div className={ style.container__favorites }>
        <button
          value="all"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ clickButtonRecipe }
        >
          All
        </button>
        <button
          value="food"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ clickButtonRecipe }
        >
          Food
        </button>
        <button
          value="drink"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ clickButtonRecipe }
        >
          Drinks
        </button>
      </div>
      <div className={ style.container__allCards }>
        {favoriteList.map((item, index) => (
          <CardFavorites
            key={ item.name }
            recipe={ item }
            index={ index }
          />))}
      </div>
    </section>
  );
}
