import React from 'react';
import { useHistory } from 'react-router-dom';
// import drinkIcon from '../../images/drinkIcon.svg';
// import exploreIcon from '../../images/exploreIcon.svg';
// import mealIcon from '../../images/mealIcon.svg';
import style from './style.module.css';
import food from './food.svg';
import drinks from './drinks.svg';
import explore from './explore.svg';

export default function Footer() {
  const history = useHistory();
  const btnClass = style['footer__container-button'];
  return (
    <footer
      className={ style.footer__container }
      style={ {
        bottom: '0px',
        position: 'fixed',
      } }
      data-testid="footer"
    >
      <button
        className={ btnClass }
        type="button"
        onClick={ () => history.push('/drinks') }
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinks }
          alt="Icondrink"
        />
      </button>
      <button
        className={ btnClass }
        type="button"
        onClick={ () => history.push('/explore') }
      >
        <img
          data-testid="explore-bottom-btn"
          src={ explore }
          alt="IconExplore"
        />
      </button>
      <button
        className={ btnClass }
        type="button"
        onClick={ () => history.push('/foods') }
      >
        <img
          data-testid="food-bottom-btn"
          src={ food }
          alt="IconMeal"
        />
      </button>
    </footer>
  );
}
