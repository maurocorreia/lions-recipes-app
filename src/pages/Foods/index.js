import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import Card from '../../components/Card';

const MAX_RECIPES = 12;
export default function Foods() {
  const recipes = useSelector(({ recipesReducer: { searchRecipes } }) => (
    searchRecipes.slice(0, MAX_RECIPES)));
  return (
    <section>
      <Header title="Foods" isSearch />
      <section>
        {recipes.map((recipe, index) => (
          <Card key={ recipe.idMeal } recipe={ recipe } index={ index } />))}
      </section>
    </section>
  );
}
