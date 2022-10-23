import '../../css/Login.css'; //Estilos
import '../../css/fontawesome-free-5.15.4-web/css/all.css' //Iconos
import logo from '../../image/logo.png' //Logo universidad.
import React, { useContext } from 'react'; //Importación de hooks.
import { UserContext } from "../../../../src/capaNegocio/context/UserContext.js"; //Para poder crear contextos.
import useLogin from '../../../capaNegocio/logicaNegocio/Login/useLogin.js';//Logica negocio.

function Login() {

  //Contextos para globalizar datos
  //Datos guardados desde el handleChange y enviados a logica de negocio.
  const { datosGuardados } = useContext(UserContext);

  //Custom hook para comunicación con lógica de negocio.
  const { verificarUsuario, componenteCorreo, componenteMostrarMensaje, componenteContraseña, componenteBtnRegresar } = useLogin();

  //Componente para mostrar el input de ingresar contraseña una vez se confirma que el email esta registrado
  //componenteContraseña

  //Componente para mostrar el input del correo desbloqueado o bloqueado.
  //componenteCorreo

  //Componente para mostrar mostrar botón regresar una vez que se confirma que el email esta registrado
  //componenteBtnRegresar

  //Componente para mostrar el mensaje informativo en el lugar que se desea.
  //componenteMostrarMensaje

  return (

    <div id="seccion">

      <div id="caja">

        <div id="cajaLogo">

          <img id="logo" src={logo} alt="" /> {/*Muestra el logo de la universidad*/}

        </div>

        <hr id="linea" />

        <form className="row" onSubmit={(e) => verificarUsuario(e, datosGuardados)}>{/*Se envian los datos a logica de negocio*/}

          <p>Inicio de sesión</p>

          <h6>{componenteMostrarMensaje}</h6> {/*Muestra mensaje informativo*/}

          {componenteCorreo} {/*Muestra el correo para editar y el fijo*/}

          <div>{componenteContraseña}</div> {/*Muestra el input para ingresar la contraseña*/}

          <div id="cajaBoton">

            {componenteBtnRegresar} {/*Muestra el botón regresar una vez se fija el correo*/}

            <button id="btnEnviar" type="submit" className="btn btn-success" title="Iniciar sesión">Enviar</button>

          </div>

        </form>

      </div>

    </div>
  );

};

export default Login;
