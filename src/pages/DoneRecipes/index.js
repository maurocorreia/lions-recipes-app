import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CardRecipes from '../../components/CardRecipes.js';
import Header from '../../components/Header';

export default function DoneRecipes() {
  const doneRecipes = useSelector(({ recipesReducer }) => recipesReducer.doneRecipes);
  const [filteredList, setFilteredList] = useState(doneRecipes);

  const clickButtonRecipe = ({ target: { value } }) => {
    const filter = {
      food: () => setFilteredList(doneRecipes.filter(({ type }) => type === 'food')),
      drink: () => setFilteredList(doneRecipes.filter(({ type }) => type === 'drink')),
      all: () => setFilteredList(doneRecipes),
    };
    return filter[value]();
  };

  // const clickButtonRecipe = ({ target }) => {
  //   if (target.value === 'food') {
  //     setRecipeListFilter(doneRecipes.filter((item) => item.type === 'food'));
  //   } else if (target.value === 'drink') {
  //     setRecipeListFilter(doneRecipes.filter((item) => item.type === 'drink'));
  //   } else if (target.value === 'all') {
  //     setRecipeListFilter(doneRecipes);
  //   }
  // };

  return (
    <div>
      <Header
        imgSize="52"
        title="Done Recipes"
        fontSize="32"
        local="container__header-doneRecipes"
      />
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
        {filteredList.map((item, index) => (
          <CardRecipes
            key={ item.name }
            recipe={ item }
            index={ index }
          />))}
      </div>
    </div>
  );
}
