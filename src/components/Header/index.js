import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
// import profileIcon from '../../images/profileIcon.svg';
import iconSearch from './icon-search.svg';
// import searchIcon from '../../images/searchIcon.svg';
import Search from '../Search';
import style from './header.module.css';
import logo from './image.png';

export default function Header({ isSearch, title, fontSize, imgSize, local }) {
  const history = useHistory();
  const [isVisibleSearch, setIsVisibleSearch] = useState(false);

  return (
    <nav>
      <section className={ style[local] }>
        <div className={ style['container__button-profile'] }>
          <input
            style={ { width: `${imgSize}px` } }
            className={ style['button-profile'] }
            alt="profile-icon"
            data-testid="profile-top-btn"
            type="image"
            src={ logo }
            onClick={ () => history.push('/profile') }
          />
        </div>
        <div className={ style.container__title }>
          <h1
            style={ { fontSize: `${fontSize}px` } }
            data-testid="page-title"
          >
            {title}

          </h1>
        </div>
        {isSearch
      && (
        <div className={ style.container__search }>
          <input
            className={ style.search__input }
            src={ iconSearch }
            alt="search-icon"
            data-testid="search-top-btn"
            type="image"
            onClick={ () => setIsVisibleSearch((prevState) => !prevState) }
          />
        </div>) }
      </section>
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
  fontSize: PropTypes.string.isRequired,
  imgSize: PropTypes.string.isRequired,
  local: PropTypes.string.isRequired,
};
