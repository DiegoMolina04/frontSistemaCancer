//import logo from './logo.svg';
import '../css/Loggin.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'

function Loggin() {
  return (
    <section>

      <div id="caja">

        <p>Inicio de sesión</p>

        <div class="input-group">
            <div class="input-group-text" id="btnGroupAddon"><i class="fas fa-user"></i></div>
            <input id="usuario" type="text" className="form-control" placeholder="Nombre de usuario"/>
        </div>

        <div class="input-group">
            <div class="input-group-text" id="btnGroupAddon"><i class="fas fa-key"></i></div>
            <input id="contraseña" type="password" className="form-control" placeholder="Contraseña"/>
        </div>
        

        <div id="cajaBoton">

            <button type="button" className="btn btn-success">Enviar</button>

        </div>

      </div>

    </section>
  );
}

export default Loggin;
