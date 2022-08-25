import React, { useContext, useState, useEffect } from 'react';
import getApiStarWars from '../services/getApiStarWars';
import Context from '../context/Context';

function Table() {
  const allColumn = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const { apiSW, setApiSW } = useContext(Context);
  const [renderTr, setRenderTr] = useState([{}]);
  const [search, setSearch] = useState({ filterByName: { name: '' } });
  const [listFilterByNumeric, setListFilterByNumeric] = useState([]);
  const [filterByNumer, setFilterByNumer] = useState({
    filterByNumericValues: [
      {
        column: 'population',
        comparison: 'maior que',
        value: 0,
      },
    ],
  });
  const [pageStructure, setPageStructure] = useState({
    column: allColumn,
  });

  useEffect(() => { getApiStarWars(setApiSW); }, [setApiSW]);
  useEffect(() => {
    const filterTable = () => {
      const res = apiSW.results.filter((aa) => aa
        .name.includes(search.filterByName.name));
      setRenderTr(res);
    };

    filterTable();
  }, [search, apiSW.results]);

  const change = (e) => {
    setFilterByNumer({
      filterByNumericValues: [
        {
          ...filterByNumer.filterByNumericValues[0],
          [e.target.name]: e.target.value,
        },
      ],
    });
  };

  const funFilter = (newlistFilterByNumeric) => {
    const res = apiSW.results.filter((planet) => (
      newlistFilterByNumeric.every(({ column, comparison, value }) => {
        if (comparison === 'maior que') {
          return Number(planet[column]) > Number(value);
        }
        if (comparison === 'menor que') {
          return Number(planet[column]) < Number(value);
        }
        return Number(planet[column]) === Number(value);
      })
    ));
    setRenderTr(res);
  };

  const removeColumn = (newListFilterByNumeric) => {
    const newColumn = allColumn.filter(
      (columnI) => !newListFilterByNumeric.find((aa) => aa.column === columnI),
    );

    setListFilterByNumeric([...newListFilterByNumeric]);
    setPageStructure({
      ...pageStructure,
      column: newColumn,
    });
    setFilterByNumer({
      filterByNumericValues: [{
        ...filterByNumer.filterByNumericValues[0],
        column: newColumn[0],
      }],
    });
    funFilter(newListFilterByNumeric);
  };

  const removeFilter = (index) => {
    const newListFilterByNumeric = [
      ...listFilterByNumeric.filter((filter, i) => index !== i),
    ];
    removeColumn(newListFilterByNumeric);
  };

  const removeAllFilter = () => {
    const newListFilterByNumeric = [];
    removeColumn(newListFilterByNumeric);
  };

  const submitFilter = () => {
    const newlistFilterByNumeric = [
      ...listFilterByNumeric,
      { ...filterByNumer.filterByNumericValues[0] },
    ];
    removeColumn(newlistFilterByNumeric);
  };

  return (
    <>
      <input
        type="text"
        value={ search.filterByName.name }
        onChange={ (e) => setSearch({ filterByName: { name: e.target.value } }) }
        data-testid="name-filter"
      />
      <form>
        <select
          name="column"
          onChange={ (e) => change(e) }
          data-testid="column-filter"
        >
          {pageStructure.column.map((column, index) => (
            <option key={ index } value={ column }>
              {column}
            </option>
          ))}
        </select>
        <select
          name="comparison"
          onChange={ (e) => change(e) }
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          name="value"
          value={ filterByNumer.filterByNumericValues[0].value }
          onChange={ (e) => change(e) }
          data-testid="value-filter"
        />
        <button
          type="button"
          onClick={ submitFilter }
          data-testid="button-filter"
        >
          FILTRAR
        </button>
        <button
          type="button"
          onClick={ removeAllFilter }
          data-testid="button-remove-filters"
        >
          Remover todas filtragens
        </button>
        {listFilterByNumeric.map(({ column, comparison, value }, index) => (
          <h3 key={ index } data-testid="filter">
            {`${column} ${comparison} ${value} `}
            <button type="button" onClick={ () => removeFilter(index) }>
              X
            </button>
          </h3>
        ))}
      </form>
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
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {renderTr.map((aa, i) => (
            <tr key={ i }>
              <td>{aa.name}</td>
              <td>{aa.rotation_period}</td>
              <td>{aa.orbital_period}</td>
              <td>{aa.diameter}</td>
              <td>{aa.climate}</td>
              <td>{aa.gravity}</td>
              <td>{aa.terrain}</td>
              <td>{aa.surface_water}</td>
              <td>{aa.population}</td>
              <td>{aa.films}</td>
              <td>{aa.created}</td>
              <td>{aa.edited}</td>
              <td>{aa.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
