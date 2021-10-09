//import logo from './logo.svg';
import '../css/Login.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'
import logo from '../image/inc.png'

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
            <input id="usuario" type="text" className="form-control" placeholder="Nombre de usuario"/>
        </div>

        <div className="input-group">
            <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-key"></i></div>
            <input id="contraseña" type="password" className="form-control" placeholder="Contraseña"/>
        </div>
        

        <div id="cajaBoton">

            <button type="button" className="btn btn-success">Enviar</button>

        </div>

      </div>

    </div>
  );
}

export default Login;
