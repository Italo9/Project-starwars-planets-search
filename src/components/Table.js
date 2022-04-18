import React, { useContext, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { data, fetchPlanets } = useContext(StarWarsContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [filterByName, setFilterByName] = useState('');
  //   const [getingFilterByName, setGetingFilterByName] = useState({});
  useEffect(() => {
    async function getPlanets() {
      await fetchPlanets();
    }
    getPlanets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //   console.log(data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filterNamePlanet = (e) => {
    // e.preventDefault();
    setFilterByName(e.target.value);
    // const filterPlanet = data.planets
    //   .filter((planet) => (planet.name !== filterByName));
    // setGetingFilterByName(filterPlanet);
  };

  //   eslint-disable-next-line react-hooks/exhaustive-deps
  //   useEffect(() => filterNamePlanet(), [filterByName]);

  return (
    <div>
      <input
        type="text"
        name="name"
        data-testid="name-filter"
        value={ filterByName }
        placeholder="Escreva o nome do planeta..."
        onChange={ filterNamePlanet }
      />
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

        {(data.planets.length > 0) && (filterByName.length > 0) ? (data.planets
          .filter((planet) => (planet.name.includes(filterByName))).map((planet, i) => (
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
          ))) : (data.planets
          .map((planet) => (
            <tbody key={ planet.url }>
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
          )))}
      </table>
    </div>
  );
}

// Table.propTypes = {
//   results: PropTypes.arrayOf.isRequired,
//   data: PropTypes.objectOf.isRequired,
// };

export default Table;

// (getingFilterByName.filterPlanet.length > 0)
//           ? (getingFilterByName.filterPlanet.map((planet, i) => (
//             <tbody key={ i }>
//               <tr>
//                 <td>{planet.name}</td>
//                 <td>{planet.rotation_period}</td>
//                 <td>{planet.orbital_period}</td>
//                 <td>{planet.diameter}</td>
//                 <td>{planet.climate}</td>
//                 <td>{planet.gravity}</td>
//                 <td>{planet.terrain}</td>
//                 <td>{planet.surface_water}</td>
//                 <td>{planet.population}</td>
//                 <td>{planet.films}</td>
//                 <td>{planet.created}</td>
//                 <td>{planet.edited}</td>
//                 <td>{planet.url}</td>
//               </tr>
//             </tbody>
//           )))
//           :
