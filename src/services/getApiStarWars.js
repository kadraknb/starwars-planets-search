const getApiStarWars = async (setApiSW) => {
  // console.log('s');
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const json = await response.json();
  const removeResidents = {
    ...json,
    results: json.results.map((aa) => { delete aa.residents; return aa; }),
  };
  setApiSW(removeResidents);
};
export default getApiStarWars;
