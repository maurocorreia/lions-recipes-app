import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import Search from '../Search';

export default function Header({ isSearch, title }) {
  const history = useHistory();
  const [isVisibleSearch, setIsVisibleSearch] = useState(false);

  return (
    <nav>
      <div>
        <button
          type="button"
          onClick={ () => history.push('/profile') }
        >
          <img data-testid="profile-top-btn" src={ profileIcon } alt="profile-icon" />
        </button>
      </div>
      <div>
        <h1 data-testid="page-title">{title}</h1>
      </div>
      {isSearch
      && (
        <div>
          <button
            type="button"
            onClick={ () => setIsVisibleSearch((prevState) => !prevState) }
          >
            <img data-testid="search-top-btn" src={ searchIcon } alt="search-icon" />
          </button>
        </div>) }
      { isVisibleSearch && <Search />}
    </nav>
  );
}

Header.defaultProps = {
  isSearch: false,
};

Header.propTypes = {
  isSearch: PropTypes.bool,
  title: PropTypes.string.isRequired,
};
