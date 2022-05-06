//import logo from './logo.svg';
import '../css/Login.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'
import logo from '../image/logo.png'
import React, {Fragment, useState} from 'react';
import { Link } from "react-router-dom";

function Login() {

  return (
  
    <div id="seccion">

      <div id="caja">
      
        <div id="cajaLogo">

            <img id="logo" src={logo} alt=""/>

        </div>

        <hr id="linea"/>

        <p>Inicio de sesión</p>

        <div className="input-group">
            <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-user"></i></div>
            <input id="usuario" type="text" className="form-control" placeholder="Email" title="Ingrese su correo"/>
        </div>

        <div className="input-group">
            <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-key"></i></div>
            <input id="contraseña" type="password" className="form-control" placeholder="Contraseña" title="Ingrese su contraseña"/>
        </div>
        
        
        <div id="cajaBoton">
          <Link to='/plataforma/diagnosticar' >
            <button type="button" className="btn btn-success" title="Iniciar sesión" onClick="prueba()">Enviar</button>
          </Link>
        </div>
        

      </div>

    </div>
  );
}

export default Login;
