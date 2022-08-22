import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function FunProvider({ children }) {
  const [apiSW, setApiSW] = useState({ results: [{ name: '' }] });

  return (
    <Context.Provider value={ { apiSW, setApiSW } }>
      {children}
    </Context.Provider>
  );
}

FunProvider.propTypes = { children: PropTypes.shape().isRequired };

export default FunProvider;
