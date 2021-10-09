import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch, Link } from "react-router-dom";/////////////////////

//import '../src/css/App.css';
//import App from '../src/js/App';

import Login from './js/Login'
//import '../src/css/Loggin.css';

import reportWebVitals from '../src/js/reportWebVitals';
import Plataforma from './js/Plataforma';

/*<App />*/

const rootElement = document.getElementById("root");/////////

ReactDOM.render(

  <BrowserRouter>

    <Switch>

      <Route path = "/login" component={Login} />
      <Route path = "/plataforma" component={Plataforma} />


    </Switch>
  
  </BrowserRouter>,

  rootElement
  /*<React.StrictMode>

    <Login />

  </React.StrictMode>,
  document.getElementById('root')*/



);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
