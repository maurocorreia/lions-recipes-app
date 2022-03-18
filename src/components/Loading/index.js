import React from 'react';
import PropTypes from 'prop-types';
import loading from './loading.gif';
import './index.css';

export default function Loading({ local }) {
  return (
    <section className={ local }>
      <img src={ loading } alt="loading" />
    </section>
  );
}

Loading.propTypes = {
  local: PropTypes.string.isRequired,
};
