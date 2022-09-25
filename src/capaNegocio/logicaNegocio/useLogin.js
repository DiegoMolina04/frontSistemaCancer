import React, { Fragment, useState, useContext, Component, useEffect } from 'react';
//import datosBody from '../../capaDatos/Post/datosBody.js';
import { UserContext } from "../context/UserContext.js";
import { Redirect, Switch, NavLink, useHistory } from "react-router-dom";
//import { useNavigate } from "@reach/router"
import postBody from '../../capaDatos/Post/postBody.js';

import ComponenteCorreo from '../../capaPresentacion/vista/Login/ComponenteCorreo.js';
import ComponenteCorreoFijo from '../../capaPresentacion/vista/Login/ComponenteCorreoFijo.js';
import ComponenteContraseña from '../../capaPresentacion/vista/Login/ComponenteContraseña.js';
import ComponenteBotonRegresar from '../../capaPresentacion/vista/Login/ComponenteBotonRegresar.js';
import MostrarMensaje from '../../capaPresentacion/vista/ComponentesComunes/MostrarMensaje.js';

const useLogin = () => {
  
  const { token, setToken } = useContext(UserContext);
  const { es_admin, setEs_admin } = useContext(UserContext);
  const { correo, setCorreo } = useContext(UserContext);
  const { cambiarEstado, setCambiarEstado } = useContext(UserContext);
  const { datosGuardados, setDatosGuardados } = useContext(UserContext);

  const [inputCorreo, setInputCorreo] = useState(<ComponenteCorreo />);
  const [mostrarMensaje, setMostrarMensaje] = useState("");
  const [inputContraseña, setInputContraseña] = useState("");
  const [btnRegresar, setBtnRegresar] = useState("");
  const [correoLocal, setCorreoLocal] = useState("");


  let login = true;

  //const navigate = useNavigate();
  const history = useHistory();
  let respuestaServidor = "";

  const verificarUsuario = async (e, datos) => {

    e.preventDefault();
    /*console.log("Datos desde el verificar")
    console.log(datos.email)*/
    console.log("Datos guardados");
    console.log(datos.contraseña);
    setCambiarEstado("");

    const url = "https://secure-brushlands-86892.herokuapp.com/v1/users/login";
    try {
      if (correoLocal == "") { //Se verifica si el estado correoLocal esta vacia para saber si se debe guardar correo
        console.log("Es nulo");

        respuestaServidor = await postBody(datos, url);
        if (respuestaServidor.code == 400) { //Se verifica si es un correo registrado, de serlo, se guarda
          /*console.log("Reeeeeeespuesta");
          console.log(respuestaServidor)
          console.log(datos.email)*/
          setCorreoLocal(datos.email)
        } else {

        }
      } else { //Significa que el correo ya esta guardado y se debe armar el array con el correo
        //console.log("NO Es nulo");
        const contraseña = datos.contraseña
        const array = { "email": correoLocal, "contraseña": contraseña }
        console.log("Datos a enviar con contraseña");
        console.log(array);
        respuestaServidor = await postBody(array, url);
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

        //setMostrarMensaje("Contraseña creada correctamente.");
        setMostrarMensaje(<MostrarMensaje mensaje={"Contraseña creada correctamente."} />);

      } else {
        /*console.log("Entro en el Else y este es el mensaje "+respuestaServidor.message);*/

        switch (respuestaServidor.code) {

          /*Muestra campo contraseña cuando contraseña vacia y verificación de email -> Please verify your credentials*/
          case 400:/*400*/

            if (datos.email == "") {

              //setMostrarMensaje("Debe ingresar un correo.");
              setMostrarMensaje(<MostrarMensaje mensaje={"Debe ingresar un correo."} />);
            } else {

              setCorreo(datos.email);

              //setMostrarMensaje("Ingrese contraseña valida.");

              setMostrarMensaje(<MostrarMensaje mensaje={"Ingrese contraseña valida."} />);

              /*Se carga componenteCorreo con el correo setteado y sin posibilidad de editar*/
              /*componenteCorreo = <div className="input-group">
                <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-user"></i></div>
                <input id="usuario" type="text" className="form-control" placeholder="Email" onChange={handleInputChange} name="email" title="Ingrese su correo" readonly="readonly" value={datos.email} />
              </div>*/
              setInputCorreo(<ComponenteCorreoFijo email={datoCorreo} />);

              /*Se carga componenteContraseña para digitar contraseña*/
              /*componenteContraseña = <div className="input-group">
                <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-key"></i></div>
                <input id="contraseña" type="password" className="form-control" placeholder="Contraseña" onChange={handleInputChange} name="contraseña" title="Ingrese su contraseña" required />
              </div>*/
              setInputContraseña(<ComponenteContraseña />);

              //componenteBtnRegresar = <button id="btnRegresar" type="button" class="btn btn-secondary" onClick={estadoInicial} title="Regresar">Regresar</button>
              setBtnRegresar(<ComponenteBotonRegresar />);


            }

            /*setRespuestaServidor("");*/

            break;

          /*Crear contraseña primera vez -> Storage error*/
          case 500: /*500*/

            if (respuestaServidor.message == "data and hash arguments required") {
              setCorreo(datos.email);

              //setMostrarMensaje("Ingrese contraseña valida.");

              setMostrarMensaje(<MostrarMensaje mensaje={"Ingrese contraseña valida."} />);

              /*Se carga componenteCorreo con el correo setteado y sin posibilidad de editar*/
              /*componenteCorreo = <div className="input-group">
                <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-user"></i></div>
                <input id="usuario" type="text" className="form-control" placeholder="Email" onChange={handleInputChange} name="email" title="Ingrese su correo" readonly="readonly" value={datos.email} />
              </div>*/
              setInputCorreo(<ComponenteCorreoFijo email={datoCorreo} />);

              /*Se carga componenteContraseña para digitar contraseña*/
              /*componenteContraseña = <div className="input-group">
                <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-key"></i></div>
                <input id="contraseña" type="password" className="form-control" placeholder="Contraseña" onChange={handleInputChange} name="contraseña" title="Ingrese su contraseña" required />
              </div>*/
              setInputContraseña(<ComponenteContraseña />);

              //componenteBtnRegresar = <button id="btnRegresar" type="button" class="btn btn-secondary" onClick={estadoInicial} title="Regresar">Regresar</button>
              setBtnRegresar(<ComponenteBotonRegresar />);
            } else {
              setCorreo(datos.email);
              //setRespuestaServidor("");
              setDatosGuardados("");
              //return <Redirect to="/crearcontraseña" />
              history.push("/crearcontraseña");
            }

            break;

          /*Email no existe || Campos vacios -> User with provided email dont exist*/
          case 404:/*404*/

            if (datos.email === "") { /*Campo email vacio*/

              /*console.log("Correo vacio");*/
              //componenteMostrarMensaje = <h6>Debe ingresar un correo</h6>;

              //setMostrarMensaje("Debe ingresar un correo.");

              setMostrarMensaje(<MostrarMensaje mensaje={"Debe ingresar un correo."} />);

              /*setRespuestaServidor("");*/
              /*setRespuestaServidor("");*/
              /*componenteMostrarMensaje = "";*/
            } else { /*Email no encontrado*/

              /*console.log("Email no encontrado");*/
              //componenteMostrarMensaje = <h6>Ingrese un correo registrado</h6>;

              //setMostrarMensaje("Ingrese un correo registrado.");

              setMostrarMensaje(<MostrarMensaje mensaje={"Ingrese un correo registrado."} />);

              /*componenteMostrarMensaje = <h6>Ingrese un correo valido</h6>*/
              /*setRespuestaServidor("");*/
            }
            /*setRespuestaServidor("");*/
            break;

        }
      }

    } catch (error) {

      //setMostrarMensaje("Un error a sucedido.");
      setMostrarMensaje(<MostrarMensaje mensaje={"Un error a sucedido."} />);
    }


  };


  const estadoInicial = async (e) => {

    e.preventDefault();
    console.log("Funcione");

    setCambiarEstado("Estado inicial");


  }

  useEffect(() => {
    console.log("Entre ak efecto");
    console.log("El estado que llega al Login");
    console.log(cambiarEstado);
    if (cambiarEstado == "Estado inicial") {
      //setMostrarMensaje("");
      setCorreo("");
      setCorreoLocal("");
      setCambiarEstado("");
      setMostrarMensaje(<MostrarMensaje mensaje={""} />);
      setInputCorreo(<ComponenteCorreo />);
      setInputContraseña("");
      setBtnRegresar("");
    } else if (cambiarEstado == "Contraseña creada correctamente") {
      console.log("Entre desde el Login");
      setMostrarMensaje(<MostrarMensaje mensaje={"Contraseña creada correctamente"} />);
    }
  }, [cambiarEstado])//}, [cambiarEstado])

  return { verificarUsuario, inputCorreo, mostrarMensaje, inputContraseña, btnRegresar, estadoInicial };
};

export default useLogin;
