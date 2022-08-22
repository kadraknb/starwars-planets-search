import React, { useState } from 'react';
import Context from './Context';

function FunProvider({ children }) {
  const [apiSW, setApiSW] = useState({ results: [{name: ''}] });

  return (
    <Context.Provider value={ { apiSW, setApiSW } }>
      {children}
    </Context.Provider>
  );
}

export default FunProvider;
