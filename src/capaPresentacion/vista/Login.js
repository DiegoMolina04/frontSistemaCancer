//import logo from './logo.svg';
import '../css/Login.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'
import logo from '../image/logo.png'
import React, {Fragment, useState, useContext, useEffect} from 'react';
/*import { Link } from "react-router-dom";*/
import { UserContext } from "../../../src/capaNegocio/context/UserContext.js";
import { Redirect } from "react-router-dom";
//import LogicaLogin from "../../capaNegocio/logicaNegocio/LogicaLogin.js";
import LogicaLogin from "../../capaNegocio/logicaNegocio/LogicaLogin.js";

//import {useApi} from "../../capaNegocio/logicaNegocio/useApi.js";
//import useApi from '../../capaNegocio/logicaNegocio/useApi';
import useLogin from '../../capaNegocio/logicaNegocio/useLogin';
import useChange from './Login/useChange';

import datosLogin from '../../capaDatos/datosLogin';

import {CorreoContext} from "../../capaNegocio/context/CorreoContext.js";
/*import { render } from '@testing-library/react';
import {setCorreo} from "./CrearContraseña.js";
import {useNavigate} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";*/

function Login() {

//const Login = () => {
    
 /*const [datos, setDatos] = useState({
    email:'',
    contraseña:''
})*/

//LogicaLogin.HandleInputChange
const {handleInputChange, datos, setDatos, obtenerDatos} = useChange();
const {verificarUsuario, inputCorreo, mostrarMensaje, inputContraseña, btnRegresar} = useLogin();

//console.log("Mensaje del hook "+mensaje);

/*useEffect(() => {
  console.log("datos desde Login");
  console.log(datos);
},[handleInputChange])*/



//const datos = 1;


/*const handleInputChange = (event) => {
        
        console.log(event.target.name)
        console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }*/

/************************************** */

/*const useCounter = () =>{

  const [counter, setCounter] = useState(0);

  const increase = () => setCounter (counter+1);

  return{
    counter,
    increase
  }
}*/

//const {counter, increase} = useCounter();
//const {counter, increase} = useCounter();

/*Contextos para globalizar respuesta de servidor, settear correo para crear contraseña, settear token y settear estado admin*/
const {respuestaServidor, setRespuestaServidor} = useContext(UserContext);
const {datosGuardados, setDatosGuardados} = useContext(UserContext);
/*const {correo, setCorreo} = useContext(UserContext);
const {token, setToken} = useContext(UserContext);
const {es_admin, setEs_admin} = useContext(UserContext);*/

//const {mostrarMensaje, setMostrarMensaje} = useContext(UserContext);
//const {insertarCorreo, setInsertarCorreo} = useContext(UserContext);

//const {prueba, setPrueba} = useContext(UserContext);

//console.log("Mi prueba "+prueba);

/*Se inicia componente ingresar contraseña, se inicia sin mostrar*/
let componenteContraseña = <div>{inputContraseña}</div>

/*Se inicia componente ingresar correo*/
/*let componenteCorreo= <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-user"></i></div> 
                        <input id="usuario" type="text" className="form-control" placeholder="Email" onChange={handleInputChange} name="email" title="Ingrese su correo" required/>
                      </div>*/

//let componenteCorreo = {insertarCorreo}

let componenteCorreo = <>{inputCorreo}</>

//console.log(insertarCorreo)
                      

/*type="text"*/                      
/* onChange={handleInputChange}*/
/*Se inicia componente para el btnRegresar*/
let componenteBtnRegresar= <>{btnRegresar}</>

/*Se inicia componente para mostrar mensajes correspondientes a errores*/
//let componenteMostrarMensaje = <h6>{respuestaServidor}</h6> 
//let componenteMostrarMensaje = <h6>{mostrarMensaje}</h6> {datos.email}
let componenteMostrarMensaje = <h6>{mostrarMensaje}</h6> 


/*const consultarUsuario = async(event) => {
   
      event.preventDefault()

        const data = await fetch("https://secure-brushlands-86892.herokuapp.com/v1/users/login",{
          method:"POST",
          mode:"cors",
          headers:{
            
            "Content-Type":"application/json"
            
          },
          body: JSON.stringify(datos)
      })
      
      const respuesta = await data.json();


      setRespuestaServidor(respuesta);

  }*/

  return (
  
    <div id="seccion">

      <div id="caja">
      
        <div id="cajaLogo">

            <img id="logo" src={logo} alt=""/>

        </div>{/*(e) => {LogicaLogin(e)}*/}{/*(e) => verificarUsuario(e, datos)*/}

        <hr id="linea"/>{/*(e) => {setRespuestaServidor(LogicaLogin.consultarUsuario(e, datos))}*/}{/*(e) => {Prueba(e)}*/}

        <form className="row" onSubmit={(e) => verificarUsuario(e, datosGuardados)}>{/*(e) => {LogicaLogin.consultarUsuario(e, datos)}*/}{/*(e) => {LogicaLogin.insertar(e)}*/}

          <p>Inicio de sesión</p>

          {componenteMostrarMensaje}
          {componenteCorreo}

          {componenteContraseña}
          {/*
          <div className="input-group">
              <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-key"></i></div>
              <input id="contraseña" type="password" className="form-control" placeholder="Contraseña" onChange={handleInputChange} name="contraseña" title="Ingrese su contraseña"/>
          </div>
          */
          }
          
          
          <div id="cajaBoton">
            
            {/*<pre>{JSON.stringify(respuestaServidor, null, 2)}</pre>*/}
            {/*<pre>{JSON.stringify(respuestaServidor, null, 2)}</pre>*/}
            
            {/*<Link to='/crearcontraseña' ></Link>*/}

              {/*<button type="button" className="btn btn-success" title="Iniciar sesión" onClick="prueba()">Enviar</button>*/}
              
              {componenteBtnRegresar}
              
              <button id="btnEnviar" type="submit" class="btn btn-success" title="Iniciar sesión">Enviar</button>
              
    
          </div>
        
        </form>
      </div>

    </div>
  );

};

export default Login;
