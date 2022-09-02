//import logo from './logo.svg';
import '../css/Login.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'
import logo from '../image/logo.png'
import React, {Fragment, useState, useContext} from 'react';
/*import { Link } from "react-router-dom";*/
import { UserContext } from "../context/UserContext.js";
import { Redirect } from "react-router-dom";
/*import { render } from '@testing-library/react';
import {setCorreo} from "./CrearContraseña.js";
import {useNavigate} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";*/

/*function Login() {*/

function Login() {
    
  const [datos, setDatos] = useState({
    email:'',
    contraseña:''
})


const handleInputChange = (event) => {
      /*console.log(event.target.name)
      console.log(event.target.value)*/
      setDatos({
          ...datos,
          [event.target.name] : event.target.value
    })
}

/*Contextos para globalizar respuesta de servidor, settear correo para crear contraseña, settear token y settear estado admin*/
const {respuestaServidor, setRespuestaServidor} = useContext(UserContext);
const {correo, setCorreo} = useContext(UserContext);
const {token, setToken} = useContext(UserContext);
const {es_admin, setEs_admin} = useContext(UserContext);

/*Se inicia componente ingresar contraseña, se inicia sin mostrar*/
let componenteContraseña = <div></div>

/*Se inicia componente ingresar correo*/
let componenteCorreo= <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-user"></i></div> 
                        <input id="usuario" type="text" className="form-control" placeholder="Email" onChange={handleInputChange} name="email" title="Ingrese su correo"/>
                      </div>
                      

/*type="text"*/                      
/* onChange={handleInputChange}*/
/*Se inicia componente para el btnRegresar*/
let componenteBtnRegresar= <div></div>      

/*Se inicia componente para mostrar mensajes correspondientes a errores*/
let componenteMostrarMensaje = <h6></h6> 


const consultarUsuario = async(event) => {
   
      event.preventDefault()

        const data = await fetch("https://secure-brushlands-86892.herokuapp.com/v1/users/login",{
          method:"POST",
          mode:"cors",
          headers:{
            
            "Content-Type":"application/json"
            
          },
          body: JSON.stringify(datos)
      })
      /*console.log(JSON.stringify(datos))*/

      /*console.log(await data.json())*/
      /*setRespuestaServidor(await data.json())*/
      const respuesta = await data.json();
      /*setRespuestaServidor(respuesta.result);*/

      /*setRespuestaServidor(respuesta.message);*/

      setRespuestaServidor(respuesta);
      
      /*estadoInicial();*/
      /*console.log("Result: "+respuestaServidor.result.token);*/
  }

  /*Funcion que regresa a la vista inicial ingresar correo*/
  function estadoInicial (){
    
    /*console.log("Los datos al inicio: "+JSON.stringify(datos));*/
    setRespuestaServidor("");
    setDatos({'email':'','contraseña':''});
    /*console.log("Los datos al final: "+JSON.stringify(datos));*/
  }
   /*console.log("Este es el estado4: "+respuestaServidor.status);*/
  try {
    
    /*Se verifica si tiene token, si lo tiene, se redirecciona a la aplicación*/
    if(respuestaServidor.message == undefined && respuestaServidor.result.token !== undefined){
      /*console.log("Entre al 200 !");
      console.log("Es indefinido, pero este es el token: "+respuestaServidor.result.token);*/
      setToken(respuestaServidor.result.token);
      setEs_admin(respuestaServidor.result.es_admin);
      /*console.log("Este es el token guardado "+token);
      console.log("Este es el es_admin guardado "+es_admin);*/
      setRespuestaServidor("");
      return <Redirect to="/plataforma/diagnosticar" />

    }else if(respuestaServidor.status !== undefined && respuestaServidor.status === 200){      
      
      componenteMostrarMensaje = <h6>Contraseña creada correctamente.</h6>
      
    }else{
      /*console.log("Entro en el Else y este es el mensaje "+respuestaServidor.message);*/
    
      switch (respuestaServidor.code){
        
        /*Muestra campo contraseña cuando contraseña vacia y verificación de email -> Please verify your credentials*/
        case 400:/*400*/
          
          if(datos.email==""){
            componenteMostrarMensaje = <h6>Debe ingresar un correo</h6>;
          }else{
            setCorreo(datos.email);
          componenteMostrarMensaje = <h6>Ingrese contraseña valida</h6>;
          /*Se carga componenteCorreo con el correo setteado y sin posibilidad de editar*/
          componenteCorreo= <div className="input-group">
                              <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-user"></i></div>
                              <input id="usuario" type="text" className="form-control" placeholder="Email" onChange={handleInputChange} name="email" title="Ingrese su correo" readonly="readonly" value={datos.email}/>
                            </div>

          /*Se carga componenteContraseña para digitar contraseña*/
          componenteContraseña= <div className="input-group">
                                  <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-key"></i></div>
                                  <input id="contraseña" type="password" className="form-control" placeholder="Contraseña" onChange={handleInputChange} name="contraseña" title="Ingrese su contraseña" required/>
                                </div>

          componenteBtnRegresar=<button id="btnRegresar" type="button" class="btn btn-secondary" onClick={estadoInicial} title="Regresar">Regresar</button>
          
          
          }

          /*setRespuestaServidor("");*/
          
        break;

        /*Crear contraseña primera vez -> Storage error*/
        case 500: /*500*/
          
          setCorreo(datos.email);
          setRespuestaServidor("");
          
          return <Redirect to="/crearcontraseña" />
          
        break;

        /*Email no existe || Campos vacios -> User with provided email dont exist*/ 
        case 404:/*404*/
          
          if(datos.email===""){ /*Campo email vacio*/

            /*console.log("Correo vacio");*/
            componenteMostrarMensaje = <h6>Debe ingresar un correo</h6>;

            /*setRespuestaServidor("");*/
            /*setRespuestaServidor("");*/
            /*componenteMostrarMensaje = "";*/
          }else{ /*Email no encontrado*/

            /*console.log("Email no encontrado");*/
            componenteMostrarMensaje = <h6>Ingrese un correo registrado</h6>;
            /*componenteMostrarMensaje = <h6>Ingrese un correo valido</h6>*/
            /*setRespuestaServidor("");*/
          }
          /*setRespuestaServidor("");*/
        break;
        
      }
    }

  } catch (error) {
    /*console.log("Entre al Catch !");
    console.log(error);*/
  }

  return (
  
    <div id="seccion">

      <div id="caja">
      
        <div id="cajaLogo">

            <img id="logo" src={logo} alt=""/>

        </div>

        <hr id="linea"/>

        <form className="row" onSubmit={consultarUsuario}>

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
}

export default Login;
