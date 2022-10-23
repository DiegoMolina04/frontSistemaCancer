//Css
import '../../../css/AgregarDiccionario.css';
import '../../../css/fontawesome-free-5.15.4-web/css/all.css'
//Logo
import logoAgregarDiccionario from '../../../image/logo.png'
//React
import React, { useContext } from 'react';
//Context
import { UserContext } from "../../../../../src/capaNegocio/context/UserContext.js";
//HandleInput
import useChange from './useChange.js';
//Logica negocio
import useAgregarDiccionario from '../../../../capaNegocio/logicaNegocio/Diccionario/useAgregarDiccionario';

function AgregarDiccionario() {

    //Context
    const { datosGuardados } = useContext(UserContext);
    //HanldeInput
    const { handleInputChange } = useChange();
    //Logica negocio
    const { verificarDatos, componenteMostrarMensaje, estadoInicial } = useAgregarDiccionario();


    return (

        <div id="fondo-AgregarTerminos">

            {/*Contenedor de agregar termino*/}
            <div id="caja-AgregarTerminos">

                {/*Contenedor del logo*/}
                <div id="cajaLogo-AgregarTerminos">

                    <img id="logo-AgregarTerminos" src={logoAgregarDiccionario} alt="" />

                </div>


                {/*Linea debajo del logo*/}
                <hr id="linea-AgregarTerminos" />

                <div id="cajaNuevoTermino-AgregarTerminos">
                    <label id="labelNuevoTermino-AgregarTerminos">Nuevo término</label>
                </div>

                <br />

                <h5>{componenteMostrarMensaje}</h5>


                {/*Contenedor de todo el formulario*/}


                <div id="formulario-AgregarTerminos">

                    <label>Ingrese el término</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-question"></i></div>
                        <input id="inputIngreseTermino-AgregarTerminos" type="text" className="form-control" placeholder="Ingrese el término" onChange={handleInputChange} name="termino" />
                    </div>

                    <br />

                    <label>Descripción</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-book"></i></div>
                        <textarea className="form-control" placeholder="Ingrese la descripción del término" onChange={handleInputChange} name="descripcion"></textarea>
                    </div>

                    <br />

                    {/*Sección Botones Enviar y Regresar*/}
                    <div id="cajaBotones-AgregarTerminos">


                        <div id="cajaRegresar-AgregarTerminos">

                            <button id="botonRegresar-AgregarTerminos" type="button" className="btn btn-primary" title="Regresar a la plataforma" onClick={(e) => estadoInicial(e)}>Regresar</button>

                        </div>

                        <form className="row" onSubmit={(e) => verificarDatos(e, datosGuardados)}>
                            <div id="cajaEnviar-AgregarTerminos">
                                <button id="botonEnviar-AgregarTerminos" type="submit" className="btn btn-primary" title="Crear nuevo termino" >Enviar</button>
                            </div>
                        </form>

                    </div>
                    <br />
                </div>

            </div>

        </div>
    );
}

export default AgregarDiccionario;