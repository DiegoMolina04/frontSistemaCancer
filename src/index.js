import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App.js';
import reportWebVitals from '../src/capaNegocio/webVitals/reportWebVitals';

const rootElement = document.getElementById("root");/////////

ReactDOM.render(

  <React.StrictMode>
    <App />
  </React.StrictMode>,

  rootElement

);

reportWebVitals();
