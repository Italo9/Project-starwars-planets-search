import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import getPlanets from '../services/StarWarsApi';

function StarWarsProvider({ children }) {
  const [data, setPlanets] = useState({
    planets: [],
  });
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [getByNumericValues, setGetingByNumericValues] = useState([]);

  const fetchPlanets = async () => {
    const getPlanet = await getPlanets();
    setPlanets(() => ({
      planets: getPlanet.results,
    }));
  };
  const contextValue = {
    data,
    filterByName,
    filterByNumericValues,
    getByNumericValues,
    fetchPlanets,
    setFilterByName,
    setFilterByNumericValues,
    setGetingByNumericValues,
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
