import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import NationCard from '../../components/NationCard';
import {
  getNationalities, getFoodsByArea, getAll,
} from '../../services/ExploreNationalities';
import style from './style.module.css';

export default function ExploreNationalities() {
  const [nationalities, setNationalities] = useState([]);
  const [recipesByNation, setRecipes] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function getNations() {
      setNationalities(await getNationalities());
      setRecipes(await getAll());
    }
    getNations();
  }, []);

  async function handleNation(e) {
    const NATION = e.target.value;
    if (NATION === 'All') {
      const DATA = await getAll();
      console.log(NATION);
      setRecipes(DATA);
    } else {
      const DATA = await getFoodsByArea(NATION);
      setRecipes(DATA);
    }
  }

  async function handleRecipe(e) {
    const ID = e.target.getAttribute('name');
    history.push(`/foods/${ID}`);
  }

  return (
    <section className={ style.container__nationality }>
      <Header
        fontSize="28"
        imgSize="51"
        local="container__header-explorar-nationalites"
        title="Explore Nationalities"
        isSearch
      />
      <div className={ style.container__nationality_all }>
        <select
          className={ style.select_nationality }
          name="nations"
          id="nations"
          data-testid="explore-by-nationality-dropdown"
          onChange={ handleNation }
        >
          {nationalities.map((nation, index) => (
            <option
              key={ index }
              value={ nation.strArea }
              data-testid={ `${nation.strArea}-option` }
            >
              { nation.strArea }
            </option>
          ))}
          <option data-testid="All-option" key="all" value="All">All</option>
        </select>
        <section className={ style.container__all_cards }>
          {recipesByNation.map((nation, index) => (
            <div
              key={ index }
              className={ style.container__button_all }
            >
              <button
                className={ style.container__button }
                type="button"
                key={ index }
                onClick={ handleRecipe }
              >
                <NationCard
                  key={ index }
                  recipe={ nation }
                  index={ index }
                />
              </button>
            </div>
          ))}
        </section>
      </div>
      <Footer />
    </section>
  );
}
