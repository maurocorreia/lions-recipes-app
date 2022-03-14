import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { fetchAllDrinks } from '../../services/FetchDrinksAndFoods';
import { saveListRecipes } from '../../redux/actions';
import RenderCard from '../../components/RenderCard';
import { fetchFiltersDrinks, fetchDrinksByCategory } from '../../services/FetchFilters';

export default function Drinks() {
  const [lastFilter, setLastFilter] = useState('');
  const [filters, setFilters] = useState([]);
  const dispatch = useDispatch();

  const recipes = useSelector(({ recipesReducer }) => (
    recipesReducer.recipes));

  useEffect(() => {
    async function getAllFoodsAndFilters() {
      if (recipes.length === 0 || recipes[0].idMeal) {
        dispatch(saveListRecipes(await fetchAllDrinks()));
      }
      setFilters(await fetchFiltersDrinks());
    }
    getAllFoodsAndFilters();
  }, [dispatch, recipes]);

  async function handleClick(strCategory) {
    const checkFilter = strCategory === lastFilter || strCategory === 'All';
    if (checkFilter) {
      dispatch(saveListRecipes(await fetchAllDrinks()));
    } else {
      dispatch(saveListRecipes(await fetchDrinksByCategory(strCategory)));
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
          onClick={ () => handleClick('All') }
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
      <RenderCard Allrecipes={ recipes } />
      <Footer />
    </section>
  );
}
