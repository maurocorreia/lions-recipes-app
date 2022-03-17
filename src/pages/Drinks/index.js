import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { fetchAllDrinks } from '../../services/FetchDrinksAndFoods';
import { saveListRecipes } from '../../redux/actions';
import RenderCard from '../../components/RenderCard';
import { fetchFiltersDrinks, fetchDrinksByCategory } from '../../services/FetchFilters';
import style from './drinks.module.css';

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
    <section style={ { backgroundColor: '#f0f0f0' } }>
      <Header
        imgSize="52"
        title="Drinks"
        isSearch
        local="container__header-tela-principal"
      />
      <section className={ style.container__buttons }>
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
            { strCategory === 'Ordinary Drink'
              ? strCategory.split(' ')[0]
              : strCategory.split('/')[0]}
          </button>))}
      </section>
      <RenderCard Allrecipes={ recipes } />
      <Footer />
    </section>
  );
}
