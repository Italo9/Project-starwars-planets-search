import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import getPlanets from '../services/StarWarsApi';

function StarWarsProvider({ children }) {
  const [data, setPlanets] = useState({
    planets: [],
  });

  const fetchPlanets = async () => {
    const getPlanet = await getPlanets();
    setPlanets(() => ({
      planets: getPlanet.results,
    }));
  };
  const contextValue = {
    data,
    fetchPlanets,
  };
  return (
    <StarWarsContext.Provider value={ contextValue }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default StarWarsProvider;
