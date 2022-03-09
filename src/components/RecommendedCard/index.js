import React from 'react';
import PropTypes from 'prop-types';

export default function RecommendedCard({ image, title, subtitle, index }) {
  return (
    <div data-testid={ `${index}-recomendation-card` }>
      <img src={ image } alt="recommededCard" />
      <h2>{subtitle}</h2>
      <h1 data-testid={ `${index}-recomendation-title` }>{title}</h1>
    </div>
  );
}

RecommendedCard.propTypes = {
  index: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};
