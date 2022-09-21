import React, { Fragment, useState, useContext, Component } from 'react';
import datosLogin from '../../capaDatos/datosLogin.js';
import { UserContext } from "../context/UserContext.js";
import { Redirect, Switch, NavLink, useHistory } from "react-router-dom";
//import { useNavigate } from "@reach/router"

import ComponenteCorreo from '../../capaPresentacion/vista/Login/ComponenteCorreo.js';
import ComponenteCorreoFijo from '../../capaPresentacion/vista/Login/ComponenteCorreoFijo.js';
import ComponenteContraseña from '../../capaPresentacion/vista/Login/ComponenteContraseña.js';
import ComponenteBotonRegresar from '../../capaPresentacion/vista/Login/ComponenteBotonRegresar.js';

import { render } from '@testing-library/react';

//import Login from '../src/capaPresentacion/vista/Login.js'

const useLogin = () => {

  /*const {respuestaServidor, setRespuestaServidor} = useContext(UserContext);
  const {correo, setCorreo} = useContext(UserContext);
  const {token, setToken} = useContext(UserContext);
  const {es_admin, setEs_admin} = useContext(UserContext);

  const {mostrarMensaje, setMostrarMensaje} = useContext(UserContext);*/


  //const {verificarUsuario, handleInputChange, insertarCorreo, inputCorreo} = useLogin();

  /*const [datos, setDatos] = useState({
    email:'',
    contraseña:''
  })*/

  /*<div className="input-group">
                      <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-user"></i></div> 
                      <input id="usuario" type="text" className="form-control" placeholder="Email" name="email" title="Ingrese su correo" required/>
                    </div>*/


  /*const handleInputChange = (event) => {
          
    console.log(event.target.name)
    console.log(event.target.value)
    console.log("Hola");
    setDatos({
        ...datos,
        [event.target.name]: event.target.value
    })
  }*/

  /*const [inputCorreo, setComponenteCorreo] = useState(
    <div className="input-group">
    <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-user"></i></div> 
    <input id="usuario" type="text" className="form-control" onChange={handleInputChange} placeholder="Email" name="email" title="Ingrese su correo" required/>
  </div>);*/
  const { token, setToken } = useContext(UserContext);
  const { es_admin, setEs_admin } = useContext(UserContext);
  const {correo, setCorreo} = useContext(UserContext);

  const [inputCorreo, setInputCorreo] = useState(<ComponenteCorreo />);
  const [mostrarMensaje, setMostrarMensaje] = useState("");
  const [inputContraseña, setInputContraseña] = useState("");
  const [btnRegresar, setBtnRegresar] = useState("");
  const [correoLocal, setCorreoLocal] = useState("");
  

  const login = true;

  //const navigate = useNavigate();
  const history = useHistory();
  let respuestaServidor = "";

  const verificarUsuario = async (e, datos) => {

    e.preventDefault();
    console.log("Datos desde el verificar")
    console.log(datos.email)
    /*console.log("mis datos");
    console.log(datos)*/
    /************************************************************************ */
    /*if(login){

      history.push("/agregarusuario")
    }*/
    if(correoLocal == ""){ //Se verifica si el estado correoLocal esta vacia para saber si se debe guardar correo
      console.log("Es nulo");
      respuestaServidor = await datosLogin(datos);
      if(respuestaServidor.code == 400){ //Se verifica si es un correo registrado, de serlo, se guarda
        /*console.log("Reeeeeeespuesta");
        console.log(respuestaServidor)
        console.log(datos.email)*/
        setCorreoLocal(datos.email)
      }else{

      }
    }else{ //Significa que el correo ya esta guardado y se debe armar el array con el correo
      //console.log("NO Es nulo");
      const contraseña = datos.email
      const array = {"email": correoLocal, "contraseña": contraseña}
      console.log("Datos a enviar con contraseña");
      console.log(array)
    }

    /*console.log("Datos a enviar");
    const respuestaServidor = await datosLogin(datos);
    console.log("Respuesta del servidor");
    console.log(respuestaServidor)*/

    const datoCorreo = datos.email

    /*if(login){
      setInputCorreo(<ComponenteCorreoFijo email={datosModificado}/>);
      setMostrarMensaje("Es una prueba");
      setInputContraseña(<ComponenteContraseña/>);
      setBtnRegresar(<ComponenteBotonRegresar/>);
    }*/


    //const datosModificado = datos.email
    /*console.log("Datos modificados");
    console.log(datosModificado)*/
    //setComponenteCorreo(<ComponenteCorreoFijo email={datosModificado}/>)

    /************************************************************************ */

    try {

      /*Se verifica si tiene token, si lo tiene, se redirecciona a la aplicación*/
      if (respuestaServidor.message == undefined && respuestaServidor.result.token !== undefined) {
        /*console.log("Entre al 200 !");
        console.log("Es indefinido, pero este es el token: "+respuestaServidor.result.token);*/
        setToken(respuestaServidor.result.token);
        setEs_admin(respuestaServidor.result.es_admin);
        /*console.log("Este es el token guardado "+token);
        console.log("Este es el es_admin guardado "+es_admin);*/
        //setRespuestaServidor("");
        //return <Redirect to="/plataforma/diagnosticar" />
        history.push("/plataforma/diagnosticar");

      } else if (respuestaServidor.status !== undefined && respuestaServidor.status === 200) {

        setMostrarMensaje("Contraseña creada correctamente.");

      } else {
        /*console.log("Entro en el Else y este es el mensaje "+respuestaServidor.message);*/

        switch (respuestaServidor.code) {

          /*Muestra campo contraseña cuando contraseña vacia y verificación de email -> Please verify your credentials*/
          case 400:/*400*/

            if (datos.email == "") {

              setMostrarMensaje("Debe ingresar un correo.");
            } else {
              
              setCorreo(datos.email);
              
              setMostrarMensaje("Ingrese contraseña valida.");
              /*Se carga componenteCorreo con el correo setteado y sin posibilidad de editar*/
              /*componenteCorreo = <div className="input-group">
                <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-user"></i></div>
                <input id="usuario" type="text" className="form-control" placeholder="Email" onChange={handleInputChange} name="email" title="Ingrese su correo" readonly="readonly" value={datos.email} />
              </div>*/
              setInputCorreo(<ComponenteCorreoFijo email={datoCorreo}/>);

              /*Se carga componenteContraseña para digitar contraseña*/
              /*componenteContraseña = <div className="input-group">
                <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-key"></i></div>
                <input id="contraseña" type="password" className="form-control" placeholder="Contraseña" onChange={handleInputChange} name="contraseña" title="Ingrese su contraseña" required />
              </div>*/
              setInputContraseña(<ComponenteContraseña/>);

              //componenteBtnRegresar = <button id="btnRegresar" type="button" class="btn btn-secondary" onClick={estadoInicial} title="Regresar">Regresar</button>
              setBtnRegresar(<ComponenteBotonRegresar/>);


            }

            /*setRespuestaServidor("");*/

            break;

          /*Crear contraseña primera vez -> Storage error*/
          case 500: /*500*/
            
            if(respuestaServidor.message == "data and hash arguments required"){
              setCorreo(datos.email);
              
              setMostrarMensaje("Ingrese contraseña valida.");
              /*Se carga componenteCorreo con el correo setteado y sin posibilidad de editar*/
              /*componenteCorreo = <div className="input-group">
                <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-user"></i></div>
                <input id="usuario" type="text" className="form-control" placeholder="Email" onChange={handleInputChange} name="email" title="Ingrese su correo" readonly="readonly" value={datos.email} />
              </div>*/
              setInputCorreo(<ComponenteCorreoFijo email={datoCorreo}/>);

              /*Se carga componenteContraseña para digitar contraseña*/
              /*componenteContraseña = <div className="input-group">
                <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-key"></i></div>
                <input id="contraseña" type="password" className="form-control" placeholder="Contraseña" onChange={handleInputChange} name="contraseña" title="Ingrese su contraseña" required />
              </div>*/
              setInputContraseña(<ComponenteContraseña/>);

              //componenteBtnRegresar = <button id="btnRegresar" type="button" class="btn btn-secondary" onClick={estadoInicial} title="Regresar">Regresar</button>
              setBtnRegresar(<ComponenteBotonRegresar/>);
            }else{
              setCorreo(datos.email);
            //setRespuestaServidor("");

            //return <Redirect to="/crearcontraseña" />
            history.push("/crearcontraseña");
            }

            break;

          /*Email no existe || Campos vacios -> User with provided email dont exist*/
          case 404:/*404*/

            if (datos.email === "") { /*Campo email vacio*/

              /*console.log("Correo vacio");*/
              //componenteMostrarMensaje = <h6>Debe ingresar un correo</h6>;
              setMostrarMensaje("Debe ingresar un correo.");

              /*setRespuestaServidor("");*/
              /*setRespuestaServidor("");*/
              /*componenteMostrarMensaje = "";*/
            } else { /*Email no encontrado*/

              /*console.log("Email no encontrado");*/
              //componenteMostrarMensaje = <h6>Ingrese un correo registrado</h6>;
              setMostrarMensaje("Ingrese un correo registrado.");
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
      setMostrarMensaje("Un error a sucedido.");
    }


  };


  const estadoInicial = async (e) => {

    e.preventDefault();
    console.log("Funcione")
    /*console.log("Los datos al inicio: "+JSON.stringify(datos));*/
    //setRespuestaServidor("");
    //setDatos({'email':'','contraseña':''});
    /*console.log("Los datos al final: "+JSON.stringify(datos));*/

  }


  return { verificarUsuario, inputCorreo, mostrarMensaje, inputContraseña, btnRegresar, estadoInicial };
};

export default useLogin;
