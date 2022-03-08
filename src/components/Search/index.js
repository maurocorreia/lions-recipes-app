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
    </section>
  );
}
