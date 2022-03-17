import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import style from './index.module.css';

export default function Profile() {
  const history = useHistory();
  const email = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <Header title="Profile" />
      <main className={ style.body }>
        <h1 className={ style.h1 } data-testid="profile-email">{email && email.email}</h1>
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }
          className={ style.input }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
          className={ style.input }
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => {
            history.push('/');
            localStorage.clear();
          } }
          className={ style.input }
        >
          Logout
        </button>

      </main>
      <Footer />

    </>
  );
}
