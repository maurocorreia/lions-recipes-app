import React from 'react';
import CardRecipes from '../../components/CardRecipes.js';
import Header from '../../components/Header';

const mockDoneRecipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

export default function DoneRecipes() {
  return (
    <div>
      <Header title="Done Recipes" />
      <div>
        <button
          value="all"
          type="button"
          data-testid="filter-by-all-btn"
          // onClick={ clickButton }
        >
          All
        </button>
        <button
          value="food"
          type="button"
          data-testid="filter-by-food-btn"
          // onClick={ clickButton }
        >
          Food
        </button>
        <button
          value="drink"
          type="button"
          data-testid="filter-by-drink-btn"
          // onClick={ clickButton }
        >
          Drinks
        </button>
        {mockDoneRecipes.map((item, index) => (
          <CardRecipes
            key={ item.name }
            recipe={ item }
            index={ index }
          />))}
      </div>
    </div>
  );
}
