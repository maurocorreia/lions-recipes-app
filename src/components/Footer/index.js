import React from 'react';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer
      style={ {
        // left: '0',
        bottom: '0px',
        position: 'fixed',
        // width: '100%',
        // backgroundColor: 'black',
        // overflow: 'hidden',
      } }
      data-testid="footer"
    >
      <button
        type="button"
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Icondrink"
        />
      </button>
      <button
        type="button"
      >
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="IconExplore"
        />
      </button>
      <button
        type="button"
      >
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="IconMeal"
        />
      </button>
    </footer>
  );
}
