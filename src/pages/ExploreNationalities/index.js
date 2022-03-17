import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import NationCard from '../../components/NationCard';
import {
  getNationalities, getFoodsByArea, getAll,
} from '../../services/ExploreNationalities';

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
    <>
      <Header
        fontSize="28"
        imgSize="51"
        local="container__header-explorar-nationalites"
        title="Explore Nationalities"
        isSearch
      />

      <select
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

      {recipesByNation.map((nation, index) => (
        <button
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
      ))}

      <Footer />
    </>
  );
}
