import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import redirectFetch from '../../services/FetchHeader';
import { saveListRecipes } from '../../redux/actions';
import style from './search.module.css';

export default function Search() {
  const history = useHistory();
  const { pathname } = useLocation();
  const search = useRef();
  const [filter, setFilter] = useState('filter.php?i=');
  const dispatch = useDispatch();

  function checkFirstLetter(value) {
    const isFirstLetter = filter === 'search.php?f=';
    const isOnlyOneLetter = value.length === 1;
    if (isFirstLetter && !isOnlyOneLetter) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    return true;
  }

  async function searchByFiler() {
    const { current: { value } } = search;
    if (checkFirstLetter(value)) {
      const recipesList = await redirectFetch(pathname, `${filter}${value}`);
      if (!recipesList) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        return;
      }
      if (recipesList.length === 1) {
        history.push(`${pathname}/${recipesList[0].idMeal || recipesList[0].idDrink}`);
      } else {
        dispatch(saveListRecipes(recipesList));
      }
    }
  }

  return (
    <section className={ style.container__search }>
      <div className={ style['container__search--input'] }>
        <label htmlFor="search-input">
          <input
            placeholder="Search Recipes"
            ref={ search }
            id="search-input"
            data-testid="search-input"
            type="search"
          />
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ searchByFiler }
        >
          Search
        </button>
      </div>
      <div className={ style.container__filters }>
        <label htmlFor="ingredient-search-radio">
          <input
            onChange={ () => setFilter('filter.php?i=') }
            id="ingredient-search-radio"
            data-testid="ingredient-search-radio"
            type="radio"
            name="filter"
          />
          Ingredients
        </label>
        <label htmlFor="name-search-radio">
          <input
            onChange={ () => setFilter('search.php?s=') }
            id="name-search-radio"
            data-testid="name-search-radio"
            type="radio"
            name="filter"
          />
          Name
        </label>
        <label htmlFor="first-letter-search-radio">
          <input
            onChange={ () => setFilter('search.php?f=') }
            id="first-letter-search-radio"
            data-testid="first-letter-search-radio"
            type="radio"
            name="filter"
          />
          First Letter
        </label>
      </div>
    </section>
  );
}
