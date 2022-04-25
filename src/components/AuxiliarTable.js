// import React, { useContext, useEffect, useState } from 'react';

export const filterPlanet = () => {
  setDataSecundario(data.planets);
  if (dataSecundario.length > 0 && filterByName.length > 0) {
    const filterName = dataSecundario
      .filter((planet) => (planet.name.includes(filterByName)));
    setDataSecundario(filterName);
  }
  if (dataSecundario.length > 0 && getByNumericValues.planetFilter.length > 0) {
    setDataSecundario(getByNumericValues.planetFilter);
  }
};

export const optionFilter = (prevSelect) => {
  const selectFilter = selectAll.select.filter((element) => (
    element !== prevSelect
  ));
  setSelectAll({
    select: selectFilter,
  });
};

export const deleteFilterView = (prevSelect) => {
  const deleteFilter = getByNumericValues.filterSelect.filter((element) => (
    element !== prevSelect
  ));
  console.log(deleteFilter);
  setGetingByNumericValues((prevState) => ({
    ...prevState,
    filterSelect: deleteFilter,
  }));
  setFilterByNumericValues(deleteFilter[2]);
  // filterNumericValues();
};

export const removeFilters = () => {
  setGetingByNumericValues((prevState) => ({
    ...prevState,
    filterSelect: [],
  }));
};
