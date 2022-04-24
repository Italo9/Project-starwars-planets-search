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
    setGetingByNumericValues,
    selectAll,
    setSelectAll } = useContext(StarWarsContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [dataSecundario, setDataSecundario] = useState([]);
  useEffect(() => {
    async function getPlanets() {
      await fetchPlanets();
    }
    getPlanets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const teste = (prevSelect) => {
    // console.log(prevSelect);
    const selectFilter = selectAll.select.filter((element) => (
      element !== prevSelect
    ));
    // console.log(selectFilter);
    setSelectAll({
      select: selectFilter,
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filterPlanet = () => {
    setDataSecundario(data.planets);
    if (dataSecundario.length > 0 && filterByName.length > 0) {
      const filterName = dataSecundario
        .filter((planet) => (planet.name.includes(filterByName)));
      setDataSecundario(filterName);
    }
    if (dataSecundario.length > 0 && getByNumericValues.planetFilter.length > 0) {
      setDataSecundario(getByNumericValues.planetFilter);
    }
    if (filterByNumericValues) {
      teste(filterByNumericValues.column);
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
    // console.log(typeof filterByNumericValues);
    const filter = dataSecundario.filter((planet) => {
      const operador = filterByNumericValues.comparison;
      // const column = filterByNumericValues.column;
      // console.log(operador);
      // console.log(filterByNumericValues );
      if (operador === 'maior que') {
        const maiorQue = parseInt(planet[filterByNumericValues.column], 10)
          > parseInt(filterByNumericValues.value, 10);
        console.log(maiorQue);
        return (maiorQue) && planet;
      } if (operador === 'menor que') {
        const menorQue = parseInt(planet[filterByNumericValues.column], 10)
          < parseInt(filterByNumericValues.value, 10);
        console.log(menorQue);
        return (menorQue) && planet;
      } if (operador === 'igual a') {
        const igualA = parseInt(planet[filterByNumericValues.column], 10)
        === parseInt(filterByNumericValues.value, 10);
        console.log(igualA);
        return (igualA) && planet;
      }
      return filter;
    });

    // console.log(filter);
    setGetingByNumericValues({
      planetFilter: filter,
      filterSelect: [...getByNumericValues.filterSelect, filterByNumericValues] });
    // setDataSecundario(filter);]
    // console.log(getByNumericValues);
    // if (getByNumericValues.filterSelect.length > 0) {
    //   teste();
    // }
    filterPlanet();
  };

  //   eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => filterPlanet(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterByName,
      getByNumericValues.planetFilter,
      getByNumericValues.filterSelect,
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
        // onClick={ () => setDataSecundario(data.planets) }
      >
        {selectAll.select.map((element, i) => (
          <option key={ i }>{element}</option>
        ))}
        {/* <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option> */}
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ setValueComparison }
      >
        <option selected>maior que</option>
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
      <br />
      {(getByNumericValues.filterSelect.length > 0)
      && (getByNumericValues.filterSelect.map((element, i) => (
        <div key={ i }>
          <p>
            { element.column}
          </p>
          <p>
            { element.comparison}
          </p>
          <p>
            { element.value}
          </p>
        </div>
      ))

      )}

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
