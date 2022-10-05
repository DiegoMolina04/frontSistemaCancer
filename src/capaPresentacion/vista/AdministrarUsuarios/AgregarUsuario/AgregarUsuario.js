//Css
import '../../../css/AgregarUsuario.css';
import '../../../css/fontawesome-free-5.15.4-web/css/all.css'
//Logo
import logoAgregarUsuario from '../../../image/logo.png'
//React
import React, { useState, useContext } from 'react';
//Context
import { UserContext } from '../../../../capaNegocio/context/UserContext';
//HandleInput
import useChange from './useChange.js';
//Logica negocio
import useAgregarUsuario from '../../../../capaNegocio/logicaNegocio/AdministrarUsuarios/useAgregarUsuario';
import verificarNumeros from '../../../../capaNegocio/logicaNegocio/LogicaComun/verificarNumeros';


function AgregarUsuario() {

    //Context
    const { datosGuardados, setDatosGuardados } = useContext(UserContext);
    //HanldeInput
    const { handleInputChange } = useChange();
    //Logica negocio
    const { verificarDatos, componenteMostrarMensaje, estadoInicial } = useAgregarUsuario();

    return (

        <div id="fondo-AgregarUsuario">

            {/*Contenedor de agregar usuario*/}
            <div id="caja-AgregarUsuario">

                {/*Contenedor del logo*/}
                <div id="cajaLogo-AgregarUsuario">

                    <img id="logo-AgregarUsuario" src={logoAgregarUsuario} alt="" />

                </div>


                {/*Linea debajo del logo*/}
                <hr id="linea-AgregarUsuario" />

                <div id="cajaNuevoUsuario-AgregarUsuario">
                    <label id="labelNuevoUsuario-AgregarUsuario">Nuevo usuario</label>
                </div>

                <br />

                <h5>{componenteMostrarMensaje}</h5>


                {/*Contenedor de todo el formulario*/}
                <form className="row" onSubmit={(e) => verificarDatos(e, datosGuardados)}>

                    <div id="formulario-AgregarUsuario">

                        {/*Sección ingrese cedula*/}
                        <label>Ingrese cédula de usuario</label>
                        <div className="input-group">

                            <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-address-card"></i></div>
                            <input id="cedula-AgregarUsuario" type="text" className="form-control" placeholder="Ingrese cédula de usuario" title="Digite su numero de cedula" onChange={handleInputChange}
                                onKeyDown={verificarNumeros} name="cedula" required />
                        </div>

                        <br />

                        {/*Sección ingrese nombre*/}
                        <label>Ingrese su nombre completo</label>
                        <div className="input-group">

                            <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-user"></i></div>
                            <input id="nombre-AgregarUsuario" type="text" className="form-control" placeholder="Ingrese su nombre de usuario" title="Digite su nombre completo" onChange={handleInputChange} name="nombre" required />

                        </div>

                        <br />

                        {/*Sección ingrese email*/}
                        <label>Ingrese su email</label>
                        <div className="input-group">

                            <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-envelope"></i></div>
                            <input id="correo-AgregarUsuario" type="email" className="form-control" placeholder="Ingrese su email" title="Digite su email" onChange={handleInputChange} name="email" required />

                        </div>

                        <br />

                        {/*Sección tipo de usuario*/}
                        <label id="tipoCuenta-AgregarCuenta">Tipo de cuenta</label>
                        <div class="form-check form-check-inline">

                            <input class="form-check-input" type="radio" id="radioButton" value="true" title="Cuenta para administrador" onChange={handleInputChange} name="es_admin" />
                            <p id="pAdministrador-AgregarCuenta" for="inlineRadio1">Administrador</p>

                        </div>
                        <div class="form-check form-check-inline">

                            <input class="form-check-input" type="radio" id="radioButton" value="false" title="Cuenta para usuario" onChange={handleInputChange} name="es_admin" />
                            <p id="pUsuario-AgregarCuenta" for="inlineRadio2">Usuario</p>

                        </div>

                        <br />

                        {/*Sección Botones Enviar y Regresar*/}
                        <div id="cajaBotones-AgregarCuenta">


                            <div id="cajaRegresar-AgregarCuenta">

                                <button id="botonRegresar-AgregarCuenta" type="button" class="btn btn-primary" onClick={(e) => estadoInicial(e)} title="Regresar a la plataforma">Regresar</button>

                            </div>


                            <div id="cajaEnviar-AgregarCuenta">
                                <button id="botonEnviar-AgregarCuenta" type="submit" class="btn btn-primary" title="Crear nuevo usuario" data-bs-toggle="modal" data-bs-target="#modalMensaje-AgregarUsuario">Enviar</button>
                            </div>


                        </div>

                        <br />

                    </div>
                </form>
            </div>

        </div>
    );
}

export default AgregarUsuario;