import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { fetchAllFoods } from '../../services/FetchDrinksAndFoods';
import { saveListRecipes } from '../../redux/actions';
import RenderCard from '../../components/RenderCard';
import { fetchFiltersFood, fetchFoodsByCategory } from '../../services/FetchFilters';
import style from './foods.module.css';

export default function Foods() {
  const [lastFilter, setLastFilter] = useState('');
  const [filters, setFilters] = useState([]);
  const dispatch = useDispatch();

  const recipes = useSelector(({ recipesReducer }) => (
    recipesReducer.recipes));

  useEffect(() => {
    async function getAllFoodsAndFilters() {
      if (recipes.length === 0 || recipes[0].idDrink) {
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
    <section style={ { backgroundColor: '#f0f0f0' } }>
      <Header
        imgSize="52"
        title="Foods"
        isSearch
        local="container__header-tela-principal"
      />
      <section className={ style.container__buttons }>
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
