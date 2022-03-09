import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { fetchAllFoods } from '../../services/FetchDrinksAndFoods';
import { saveListRecipes } from '../../redux/actions';
import InitialRender from '../../components/InitialRender';
import { fetchFiltersFood, fetchFoodsByCategory } from '../../services/FetchFilters';

export default function Foods() {
  const [foodsRecipesFiltered, setfoodsRecipesFiltered] = useState(null);
  const [lastFilter, setLastFilter] = useState('');
  const [filters, setFilters] = useState([]);
  const dispatch = useDispatch();

  const serachFoodRecipes = useSelector(({ recipesReducer }) => (
    recipesReducer.searchRecipes));

  useEffect(() => {
    async function getAllFoodsAndFilters() {
      dispatch(saveListRecipes(await fetchAllFoods()));
      setFilters(await fetchFiltersFood());
    }
    getAllFoodsAndFilters();
  }, [dispatch]);

  async function handleClick(strCategory) {
    if (lastFilter === strCategory) {
      setfoodsRecipesFiltered(await fetchFoodsByCategory(''));
    } else {
      setfoodsRecipesFiltered(await fetchFoodsByCategory(strCategory));
      setLastFilter(strCategory);
    }
  }

  return (
    <section>
      <Header title="Foods" isSearch />
      <section>
        <button
          type="button"
          onClick={ () => handleClick('') }
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
      <InitialRender Allrecipes={ foodsRecipesFiltered || serachFoodRecipes } />
      <Footer />
    </section>
  );
}
