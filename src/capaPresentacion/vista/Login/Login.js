import '../../css/Login.css'; //Estilos
import '../../css/fontawesome-free-5.15.4-web/css/all.css' //Iconos
import logo from '../../image/logo.png' //Logo universidad.
import React, {useContext} from 'react'; //Importación de hooks.
import { UserContext } from "../../../../src/capaNegocio/context/UserContext.js"; //Para poder crear contextos.
import useLogin from '../../../capaNegocio/logicaNegocio/useLogin'; //Logica negocio.

function Login() {
  
//Contextos para globalizar datos
//Datos guardados desde el handleChange y enviados a logica de negocio.
const {datosGuardados, setDatosGuardados} = useContext(UserContext); 

//Custom hook para comunicación con lógica de negocio.
const {verificarUsuario, inputCorreo, mostrarMensaje, inputContraseña, btnRegresar} = useLogin();

/*Componente para mostrar el input de ingresar contraseña
una vez se confirma que el email esta registrado*/
let componenteContraseña = <div>{inputContraseña}</div>

//Componente para mostrar el input del correo desbloqueado o bloqueado.
let componenteCorreo = <>{inputCorreo}</>

/*Componente para mostrar mostrar botón regresar una vez que se
confirma que el email esta registrado*/
let componenteBtnRegresar= <>{btnRegresar}</>

//Componente para mostrar el mensaje informativo en el lugar que se desea.
let componenteMostrarMensaje = <h6>{mostrarMensaje}</h6> 

  return (
  
    <div id="seccion">

      <div id="caja">
      
        <div id="cajaLogo">

            <img id="logo" src={logo} alt=""/>

        </div>{/*(e) => {LogicaLogin(e)}*/}{/*(e) => verificarUsuario(e, datos)*/}

        <hr id="linea"/>{/*(e) => {setRespuestaServidor(LogicaLogin.consultarUsuario(e, datos))}*/}{/*(e) => {Prueba(e)}*/}

        <form className="row" onSubmit={(e) => verificarUsuario(e, datosGuardados)}>{/*Se envian los datos a logica de negocio*/}

          <p>Inicio de sesión</p>

          {componenteMostrarMensaje}
          {componenteCorreo}

          {componenteContraseña}       
          
          <div id="cajaBoton">
              
              {componenteBtnRegresar}
              
              <button id="btnEnviar" type="submit" class="btn btn-success" title="Iniciar sesión">Enviar</button>
              
    
          </div>
        
        </form>
      </div>

    </div>
  );

};

export default Login;
