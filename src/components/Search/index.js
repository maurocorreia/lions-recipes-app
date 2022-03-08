import React from 'react';

export default function Search() {
  return (
    <section>
      <label htmlFor="search-input">
        <input
          id="search-input"
          data-testid="search-input"
          type="text"
        />
      </label>
      <label htmlFor="ingredient-search-radio">
        <input
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
          type="radio"
        />
        Ingredients
      </label>
      <label htmlFor="name-search-radio">
        <input
          id="name-search-radio"
          data-testid="name-search-radio"
          type="radio"
        />
        Name
      </label>
      <label htmlFor="first-letter-search-radio">
        <input
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
          type="radio"
        />
        First Letter
      </label>
      <button type="button" data-testid="exec-search-btn">Search</button>
    </section>
  );
}
