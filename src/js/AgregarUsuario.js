import '../css/AgregarUsuario.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'
import logoAgregarUsuario from '../image/logo.png'
import { Link } from "react-router-dom";

function AgregarUsuario() {

    return ( 

        <div id="fondo-AgregarUsuario">

            {/*Contenedor de agregar usuario*/}
            <div id="caja-AgregarUsuario">
                
                {/*Contenedor del logo*/}
                <div id="cajaLogo-AgregarUsuario">

                    <img id="logo-AgregarUsuario" src={logoAgregarUsuario} alt=""/>

                </div>

                <div id="cajaNuevoUsuario-AgregarUsuario">
                    <label id="labelNuevoUsuario-AgregarUsuario">Nuevo usuario</label>
                </div>

                {/*Linea debajo del logo*/}
                <hr id="linea-AgregarUsuario"/>

                {/*Contenedor de todo el formulario*/}
                <div id="formulario-AgregarUsuario">

                    {/*Sección ingrese nombre*/}
                    <label>Ingrese su nombre completo</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-user"></i></div>
                        <input id="nombre-AgregarUsuario" type="text" className="form-control" placeholder="Ingrese su nombre de usuario" title="Digite su nombre completo"/>
                    </div>

                    <br />
                    
                    {/*Sección ingrese email*/}
                    <label>Ingrese su email</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-envelope"></i></div>
                        <input id="correo-AgregarUsuario" type="email" className="form-control" placeholder="Ingrese su email" title="Digite su email"/>
                    </div>

                    <br />

                    {/*Sección ingrese contraseña*/}
                    <label>Ingrese su contraseña</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-key"></i></div>
                        <input id="contraseña-AgregarUsuario" type="text" className="form-control" placeholder="Ingrese su contraseña" title="Digite su contraseña"/>
                    </div>

                    <br />

                    {/*Sección rectifique contraseña*/}
                    <label>Ingrese nuevamente su contraseña</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-key"></i></div>
                        <input id="contraseñaRe-AgregarUsuario" type="text" className="form-control" placeholder="Ingrese nuevamente su contraseña" title="Reingrese su contraseña"/>
                    </div>

                    <br />

                    {/*Sección tipo de usuario*/}
                    <label id="tipoCuenta-AgregarCuenta">Tipo de cuenta</label>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="radioButton" value="option1" title="Cuenta para administrador"/>
                        <p id="pAdministrador-AgregarCuenta" for="inlineRadio1">Administrador</p>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="radioButton" value="option2" title="Cuenta para usuario"/>
                        <p id="pUsuario-AgregarCuenta" for="inlineRadio2">Usuario</p>
                    </div>
                      
                    <br />

                    {/*Sección Botones Enviar y Limpiar*/}
                    <div id="cajaBotones-AgregarCuenta">

                        <div id="cajaEnviar-AgregarCuenta">
                            <button id="botonEnviar-AgregarCuenta" type="button" class="btn btn-primary">Enviar</button>
                        </div>

                        <div id="cajaLimpiar-AgregarCuenta">
                            <button id="botonLimpiar-AgregarCuenta" type="button" class="btn btn-primary">Limpiar</button>
                        </div>

                    </div>
                    
                    {/*<button type="button" class="btn btn-primary">Primary</button>*/}
                    <br />

                    {/*
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                        <label class="form-check-label" for="inlineRadio1">1</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                        <label class="form-check-label" for="inlineRadio2">2</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" disabled />
                        <label class="form-check-label" for="inlineRadio3">3 (disabled)</label>
                    </div>
                    */}
                </div>

            </div>

        </div>
    );
}

export default AgregarUsuario;