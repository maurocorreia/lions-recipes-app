import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { fetchAllDrinks } from '../../services/FetchDrinksAndFoods';
import { saveListRecipes } from '../../redux/actions';
import InitialRender from '../../components/InitialRender';
import { fetchFiltersDrinks, fetchDrinksByCategory } from '../../services/FetchFilters';

export default function Drinks() {
  const [drinksRecipesFiltered, setDrinksRecipesFiltered] = useState(null);
  const [lastFilter, setLastFilter] = useState('');
  const [filters, setFilters] = useState([]);
  const dispatch = useDispatch();

  const searchDrinksRecipes = useSelector(({ recipesReducer }) => (
    recipesReducer.searchRecipes));

  useEffect(() => {
    async function getAllFoodsAndFilters() {
      dispatch(saveListRecipes(await fetchAllDrinks()));
      setFilters(await fetchFiltersDrinks());
    }
    getAllFoodsAndFilters();
  }, [dispatch]);

  async function handleClick(strCategory) {
    if (lastFilter === strCategory) {
      setDrinksRecipesFiltered(await fetchDrinksByCategory(''));
    } else {
      setDrinksRecipesFiltered(await fetchDrinksByCategory(strCategory));
      setLastFilter(strCategory);
    }
  }

  return (
    <section>
      <Header title="Drinks" isSearch />
      <section>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ () => handleClick('') }
        >
          All
        </button>
        {filters.map(({ strCategory }) => (
          <button
            data-testid={ `${strCategory}-category-filter` }
            type="button"
            key={ strCategory }
            onClick={ () => handleClick(strCategory) }
          >
            {strCategory}
          </button>))}
      </section>
      <InitialRender Allrecipes={ drinksRecipesFiltered || searchDrinksRecipes } />
      <Footer />
    </section>
  );
}
