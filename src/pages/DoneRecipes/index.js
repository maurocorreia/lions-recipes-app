import React, { useState } from 'react';
import CardRecipes from '../../components/CardRecipes.js';
import Header from '../../components/Header';

export default function DoneRecipes() {
  const [backup, setBackup] = useState();
  const [doneRecipes, setDoneRecipes] = useState(() => {
    const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!doneRecipe) {
      return [];
    }
    setBackup(doneRecipe);
    return doneRecipe;
  });

  const clickButtonRecipe = ({ target }) => {
    if (target.value === 'food') {
      setDoneRecipes(backup.filter((item) => item.type === 'food'));
    } else if (target.value === 'drink') {
      setDoneRecipes(backup.filter((item) => item.type === 'drink'));
    } else if (target.value === 'all') {
      setDoneRecipes(backup);
    }
  };

  return (
    <div>
      <Header title="Done Recipes" />
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
        {doneRecipes !== [] && doneRecipes.map((item, index) => (
          <CardRecipes
            key={ item.name }
            recipe={ item }
            index={ index }
          />))}
      </div>
    </div>
  );
}
