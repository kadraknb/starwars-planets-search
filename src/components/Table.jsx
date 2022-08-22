import React, { useContext, useState, useEffect } from 'react';
import getApiStarWars from '../services/getApiStarWars';
import Context from '../context/Context';

function Table() {
  const [search, setSearch] = useState({ filterByName: { name: '' } });
  const { apiSW, setApiSW } = useContext(Context);
  const [renderTr, setRenderTr] = useState([{}]);

  useEffect(() => { getApiStarWars(setApiSW); }, [setApiSW]);

  // useEffect(() => { setRenderTr(apiSW.results); }, [apiSW]);
  // console.log(apiSW);

  // const filterTable = () => {
  //   const res = apiSW.results.filter((aa) => aa
  //     .name.includes(search.filterByName.name));
  //   setRenderTr(res);
  // };
  useEffect(() => {
    const filterTable = () => {
      const res = apiSW.results.filter((aa) => aa
        .name.includes(search.filterByName.name));
      setRenderTr(res);
    };

    filterTable();
  }, [search, apiSW.results]);

  return (
    <>
      <input
        type="text"
        value={ search.filterByName.name }
        onChange={ (e) => setSearch({ filterByName: { name: e.target.value } }) }
        data-testid="name-filter"
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
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          { renderTr.map((aa, i) => (
            <tr key={ i }>
              <td>{ aa.name }</td>
              <td>{ aa.rotation_period }</td>
              <td>{ aa.orbital_period }</td>
              <td>{ aa.diameter }</td>
              <td>{ aa.climate }</td>
              <td>{ aa.gravity }</td>
              <td>{ aa.terrain }</td>
              <td>{ aa.surface_water }</td>
              <td>{ aa.population }</td>
              <td>{ aa.films }</td>
              <td>{ aa.created }</td>
              <td>{ aa.edited }</td>
              <td>{ aa.url }</td>
            </tr>
          )) }
        </tbody>
      </table>
    </>
  );
}

export default Table;
