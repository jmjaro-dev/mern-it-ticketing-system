import React, { useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

const App = () => {
  useEffect(() => {
    M.AutoInit();
    // eslint-disable-next-line
  }, []);
  
  return (
    <div>
      <div className="container">
        <h1 className="blue">Hello World</h1>
      </div>
    </div>
    
  );
}

export default App;