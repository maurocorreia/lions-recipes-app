import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import redirectFetch from '../../services/FetchHeader';

export default function Search() {
  const history = useHistory();
  const search = useRef();
  const [filter, setFilter] = useState('');

  function checkFirstLetter(value) {
    const isFirstLetter = filter === 'search.php?f=';
    const isOnlyOneLetter = value.length === 1;
    if (isFirstLetter && !isOnlyOneLetter) {
      global.alert('Your search must have only 1 (one) character');
      return false;
    }
    return true;
  }

  function searchByFiler() {
    const { location } = history;
    const { current: { value } } = search;
    if (checkFirstLetter(value)) redirectFetch(location.pathname, `${filter}${value}`);
  }

  return (
    <section>
      <label htmlFor="search-input">
        <input
          ref={ search }
          id="search-input"
          data-testid="search-input"
          type="text"
        />
      </label>
      <label htmlFor="ingredient-search-radio">
        <input
          value="filter.php?i="
          onChange={ ({ target }) => setFilter(target.value) }
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
          type="radio"
          name="filter"
        />
        Ingredients
      </label>
      <label htmlFor="name-search-radio">
        <input
          value="search.php?s="
          onChange={ ({ target }) => setFilter(target.value) }
          id="name-search-radio"
          data-testid="name-search-radio"
          type="radio"
          name="filter"
        />
        Name
      </label>
      <label htmlFor="first-letter-search-radio">
        <input
          value="search.php?f="
          onChange={ ({ target }) => setFilter(target.value) }
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
          type="radio"
          name="filter"
        />
        First Letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ searchByFiler }
      >
        Search
      </button>
    </section>
  );
}
