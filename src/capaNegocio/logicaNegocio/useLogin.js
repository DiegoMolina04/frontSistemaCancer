//React
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
//Context
import { UserContext } from "../context/UserContext.js";
//Datos
import postBody from '../../capaDatos/Post/postBody.js';
//Componentes
import ComponenteCorreo from '../../capaPresentacion/vista/Login/ComponenteCorreo.js';
import ComponenteCorreoFijo from '../../capaPresentacion/vista/Login/ComponenteCorreoFijo.js';
import ComponenteContraseña from '../../capaPresentacion/vista/Login/ComponenteContraseña.js';
import ComponenteBotonRegresar from '../../capaPresentacion/vista/Login/ComponenteBotonRegresar.js';
import MostrarMensaje from '../../capaPresentacion/vista/ComponentesComunes/MostrarMensaje.js';

const useLogin = () => {
  
  //Contextos
  const { token, setToken } = useContext(UserContext);
  const { es_admin, setEs_admin } = useContext(UserContext);
  const { correo, setCorreo } = useContext(UserContext);
  const { cambiarEstado, setCambiarEstado } = useContext(UserContext);
  const { datosGuardados, setDatosGuardados } = useContext(UserContext);
  //Componentes
  const [componenteCorreo, setComponenteCorreo] = useState(<ComponenteCorreo />);
  const [componenteMostrarMensaje, setComponenteMostrarMensaje] = useState("");
  const [componenteContraseña, setComponenteContraseña] = useState("");
  const [componenteBtnRegresar, setComponenteBtnRegresar] = useState("");
  //Guarda datos
  const [correoLocal, setCorreoLocal] = useState("");

  const history = useHistory(); //Se usa para poder redireccionar
  let respuestaServidor = ""; //Guarda respuesta del servidor

  const verificarUsuario = async (e, datos) => {

    e.preventDefault();
    setCambiarEstado("");
    const url = "https://secure-brushlands-86892.herokuapp.com/v1/users/login";

    try {
      if (correoLocal == "") { //Se verifica si el estado correoLocal esta vacia para saber si se debe guardar correo
        respuestaServidor = await postBody(datos, url);

        if (respuestaServidor.code == 400) { //Se verifica si es un correo registrado, de serlo, se guarda
          setCorreoLocal(datos.email);

        } else {

        }
      } else { //Significa que el correo ya esta guardado y se debe armar el array con el correo
        const contraseña = datos.contraseña
        const array = { "email": correoLocal, "contraseña": contraseña }
        respuestaServidor = await postBody(array, url);

      }
      const datoCorreo = datos.email

      /*Se verifica si tiene token, si lo tiene, se redirecciona a la aplicación*/
      if (respuestaServidor.message == undefined && respuestaServidor.result.token !== undefined) {
        setToken(respuestaServidor.result.token);
        setEs_admin(respuestaServidor.result.es_admin);
        history.push("/plataforma/diagnosticar");

      } else if (respuestaServidor.status !== undefined && respuestaServidor.status === 200) {
        setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Contraseña creada correctamente."}/>);

      } else {
        switch (respuestaServidor.code) {

          /*Muestra campo contraseña cuando contraseña vacia y verificación de email -> Please verify your credentials*/
          case 400:
            if (datos.email == "") {
              setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Debe ingresar un correo."} />);

            } else {
              setCorreo(datos.email);
              setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Ingrese contraseña valida."} />);

              /*Se carga componenteCorreo con el correo setteado y sin posibilidad de editar*/
              setComponenteCorreo(<ComponenteCorreoFijo email={datoCorreo} />);

              /*Se carga componenteContraseña para digitar contraseña*/
              setComponenteContraseña(<ComponenteContraseña />);
              setComponenteBtnRegresar(<ComponenteBotonRegresar />);


            }

            break;

          /*Crear contraseña primera vez -> Storage error*/
          case 500:

            if (respuestaServidor.message == "data and hash arguments required") {
              setCorreo(datos.email);
              setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Ingrese contraseña valida."} />);

              //Se carga componenteCorreo con el correo setteado y sin posibilidad de editar
              setComponenteCorreo(<ComponenteCorreoFijo email={datoCorreo} />);

              /*Se carga componenteContraseña para digitar contraseña*/
              setComponenteContraseña(<ComponenteContraseña />);
              setComponenteBtnRegresar(<ComponenteBotonRegresar />);
              
            } else {
              setCorreo(datos.email);
              setDatosGuardados("");
              history.push("/crearcontraseña");

            }

            break;

          /*Email no existe || Campos vacios -> User with provided email dont exist*/
          case 404:
            if (datos.email === "") { /*Campo email vacio*/
              setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Debe ingresar un correo."} />);

            } else { /*Email no encontrado*/
              setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Ingrese un correo registrado."} />);

            }
            
            break;

        }
      }

    } catch (error) {
      setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Un error a sucedido."} />);

    }

  };

  //Regresa al estado inicial
  const estadoInicial = async (e) => {
    e.preventDefault();
    setCambiarEstado("Estado inicial");

  }

  //Cada vez que se ejecute cambiarEstado, se ejecuta el useEffect
  useEffect(() => {
    if (cambiarEstado == "Estado inicial") {
      setCorreo("");
      setCorreoLocal("");
      setCambiarEstado("");
      setComponenteMostrarMensaje(<MostrarMensaje mensaje={""} />);
      setComponenteCorreo(<ComponenteCorreo />);
      setComponenteContraseña("");
      setComponenteBtnRegresar("");

    } else if (cambiarEstado == "Contraseña creada correctamente") {
      setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Contraseña creada correctamente"} />);

    }
  }, [cambiarEstado])

  return { verificarUsuario, componenteCorreo, componenteMostrarMensaje, componenteContraseña, componenteBtnRegresar, estadoInicial };
};

export default useLogin;