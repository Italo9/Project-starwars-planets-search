import React, { useContext, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const {
    data,
    fetchPlanets,
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
    getByNumericValues,
    setGetingByNumericValues } = useContext(StarWarsContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [dataSecundario, setDataSecundario] = useState([]);
  // const [filterByName, setFilterByName] = useState('');
  // const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  // const [getByNumericValues, setGetingByNumericValues] = useState([]);
  // const teste = () => {
  //   if (data.planets.length > 0) {
  //     setDataSecundario(data.planets);
  //   }
  // };

  useEffect(() => {
    async function getPlanets() {
      await fetchPlanets();
    }
    getPlanets();
    // teste();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //   console.log(data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filterPlanet = () => {
    setDataSecundario(data.planets);
    if (dataSecundario.length > 0 && filterByName.length > 0) {
      const filterName = dataSecundario
        .filter((planet) => (planet.name.includes(filterByName)));
      setDataSecundario(filterName);
    }
    if (dataSecundario.length > 0 && getByNumericValues.length > 0) {
      setDataSecundario(getByNumericValues);
    }
  };

  const setValueColumn = (e) => {
    e.preventDefault();
    setFilterByNumericValues({ ...filterByNumericValues, column: e.target.value });
  };
  const setValueComparison = (e) => {
    e.preventDefault();
    setFilterByNumericValues({ ...filterByNumericValues, comparison: e.target.value });
  };

  const SetNumberValue = (e) => {
    e.preventDefault();
    setFilterByNumericValues({ ...filterByNumericValues, value: e.target.value });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filterNumericValues = () => {
    const filter = dataSecundario.filter((planet) => {
      const operador = filterByNumericValues.comparison;
      // const column = filterByNumericValues.column;
      // console.log(operador);
      // console.log(filterByNumericValues);
      if (operador === 'maior que') {
        const maiorQue = parseInt(planet[filterByNumericValues.column], 10)
          > parseInt(filterByNumericValues.value, 10);
        // console.log(maiorQue);
        return (maiorQue) && planet;
      } if (operador === 'menor que') {
        const menorQue = parseInt(planet[filterByNumericValues.column], 10)
          < parseInt(filterByNumericValues.value, 10);
        // console.log(menorQue);
        return (menorQue) && planet;
      } if (operador === 'igual a') {
        const igualA = parseInt(planet[filterByNumericValues.column], 10)
        === parseInt(filterByNumericValues.value, 10);
        // console.log(igualA);
        return (igualA) && planet;
      }
      return filter;
    });
    // console.log(filter);
    setGetingByNumericValues(filter);
    // setDataSecundario(filter);
    // console.log(getByNumericValues);
    filterPlanet();
  };

  //   eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => filterPlanet(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterByName,
      getByNumericValues,
      data]);
  return (
    <div>
      <input
        type="text"
        name="name"
        data-testid="name-filter"
        value={ filterByName }
        placeholder="Escreva o nome do planeta..."
        onChange={ (e) => setFilterByName(e.target.value) }
      />
      <select
        data-testid="column-filter"
        onChange={ setValueColumn }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ setValueComparison }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        name="name"
        data-testid="value-filter"
        // value={ filterByName }
        placeholder="Escreva o numero"
        onChange={ SetNumberValue }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ filterNumericValues }
        disabled={ filterByNumericValues.length === 0 }
      >
        Adicionar filtro
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>

        {dataSecundario.map((planet, i) => (
          <tbody key={ i }>
            <tr>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

// Table.propTypes = {
//   results: PropTypes.arrayOf.isRequired,
//   data: PropTypes.objectOf.isRequired,
// };

export default Table;
