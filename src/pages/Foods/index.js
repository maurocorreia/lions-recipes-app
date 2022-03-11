import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { fetchAllFoods } from '../../services/FetchDrinksAndFoods';
import { saveListRecipes } from '../../redux/actions';
import RenderCard from '../../components/RenderCard';
import { fetchFiltersFood, fetchFoodsByCategory } from '../../services/FetchFilters';

export default function Foods() {
  const [lastFilter, setLastFilter] = useState('');
  const [filters, setFilters] = useState([]);
  const dispatch = useDispatch();

  const recipes = useSelector(({ recipesReducer }) => (
    recipesReducer.recipes));

  useEffect(() => {
    async function getAllFoodsAndFilters() {
      if (recipes.length === 0) {
        dispatch(saveListRecipes(await fetchAllFoods()));
      }
      setFilters(await fetchFiltersFood());
    }
    getAllFoodsAndFilters();
  }, [dispatch, recipes]);

  async function handleClick(strCategory) {
    const checkFilter = strCategory === lastFilter || strCategory === 'All';
    if (checkFilter) {
      dispatch(saveListRecipes(await fetchAllFoods()));
    } else {
      dispatch(saveListRecipes(await fetchFoodsByCategory(strCategory)));
      setLastFilter(strCategory);
    }
  }

  return (
    <section>
      <Header title="Foods" isSearch />
      <section>
        <button
          type="button"
          onClick={ () => handleClick('All') }
          data-testid="All-category-filter"
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
