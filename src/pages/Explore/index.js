import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import style from './style.module.css';

export default function Explore() {
  const history = useHistory();
  return (
    <section className={ style.container__explore }>
      <Header
        title="Explore"
        imgSize="51"
        fontSize="40"
        local="container__header-explorar"
      />
      <div
        className={ style.container_buttons }
      >
        <button
          className={ style.explore_food }
          type="button"
          data-testid="explore-foods"
          onClick={ () => history.push('/explore/foods') }
        >
          Explore Foods
        </button>
        <button
          type="button"
          className={ style.explore_drink }
          data-testid="explore-drinks"
          onClick={ () => history.push('/explore/drinks') }
        >
          Explore Drinks
        </button>
      </div>
      <Footer />
    </section>
  );
}
