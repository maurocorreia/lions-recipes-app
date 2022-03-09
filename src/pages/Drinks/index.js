import React from 'react';
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Card from '../../components/Card';

const MAX_RECIPES = 12;
export default function Drinks() {
  const recipes = useSelector(({ recipesReducer: { searchRecipes } }) => (
    searchRecipes.slice(0, MAX_RECIPES)));
  return (
    <section>
      <Header title="Drinks" isSearch />
      <section>
        {recipes.map((recipe, index) => (
          <Card
            key={ recipe.idMeal || recipe.idDrink }
            recipe={ recipe }
            index={ index }
          />))}
      </section>
      <Footer />
    </section>
  );
}
