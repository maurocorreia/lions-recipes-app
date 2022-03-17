import React from 'react';
import PropTypes from 'prop-types';
import style from './recommended_card.module.css';

export default function RecommendedCard({ image, title, subtitle, index }) {
  return (
    <div
      className={ style.recomendationCard }
      data-testid={ `${index}-recomendation-card` }
    >
      <img className={ style.recomendationImage } src={ image } alt="recommededCard" />
      <h1 data-testid={ `${index}-recomendation-title` }>{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  );
}

RecommendedCard.propTypes = {
  index: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};
