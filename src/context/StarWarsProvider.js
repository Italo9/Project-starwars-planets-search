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
  const [getByNumericValues, setGetingByNumericValues] = useState({
    planetFilter: [],
    filterSelect: [],
  });

  const [selectAll, setSelectAll] = useState({
    select: [
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  });

  const salveFilter = (newfilter) => {
    setFilterByNumericValues((prevFilter) => [
      ...prevFilter,
      newfilter,
    ]);
  };

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
    selectAll,
    fetchPlanets,
    setFilterByName,
    setFilterByNumericValues,
    setGetingByNumericValues,
    salveFilter,
    setSelectAll,
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
