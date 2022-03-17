import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
// import style from './style.module.css';

export default function Explore() {
  const history = useHistory();
  return (
    <div>
      <Header
        title="Explore"
        imgSize="51"
        fontSize="40"
        local="container__header-explorar"
      />
      <button
        type="button"
        data-testid="explore-foods"
        onClick={ () => history.push('/explore/foods') }
      >
        Explore Foods
      </button>

      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => history.push('/explore/drinks') }
      >
        Explore Drinks
      </button>
      <Footer />
    </div>
  );
}
