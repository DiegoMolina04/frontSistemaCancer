//Css
import '../../../css/AgregarTipoDepresion.css';
import '../../../css/fontawesome-free-5.15.4-web/css/all.css'
//Logi
import logoAgregarTipoDepresion from '../../../image/logo.png'
//React
import React, { useContext } from 'react';
//Context
import { UserContext } from "../../../../../src/capaNegocio/context/UserContext.js";
//OnChange
import useChange from './useChange';
//Logica negocio
import useAgregarTiposDepresion from '../../../../capaNegocio/logicaNegocio/TiposDepresion/useAgregarTiposDepresion';
import verificarNumeros from '../../../../capaNegocio/logicaNegocio/LogicaComun/verificarNumeros';

function AgregarTipoDepresion() {

    //Context
    const { datosGuardados } = useContext(UserContext);
    //HanldeInput
    const { handleInputChange } = useChange();
    //Logica negocio
    const { verificarDatos, componenteMostrarMensaje, estadoInicial } = useAgregarTiposDepresion();

    return (

        <div id="fondo-AgregarTiposDepresion">

            {/*Contenedor de agregar usuario*/}
            <div id="caja-AgregarTiposDepresion">

                {/*Contenedor del logo*/}
                <div id="cajaLogo-AgregarTiposDepresion">

                    <img id="logo-AgregarTiposDepresion" src={logoAgregarTipoDepresion} alt="" />

                </div>


                {/*Linea debajo del logo*/}
                <hr id="linea-AgregarTiposDepresion" />

                <div id="cajaNuevoTipoDepresion-AgregarTipoDepresion">
                    <label id="labelNuevoTipoDepresion-AgregarTipoDepresion">Nuevo tipo de depresión</label>
                </div>

                <br />

                <h5>{componenteMostrarMensaje}</h5>


                {/*Contenedor de todo el formulario*/}


                <div id="formulario-AgregarTipoDepresion">

                    <label>Ingrese el tipo de depresión</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-notes-medical"></i></div>
                        <input id="inputIngreseTipoDepresion-AgregarTipoDepresion" type="text" className="form-control" placeholder="Ingrese el tipo de depresión" onChange={handleInputChange} name="tipo_depresion" required/>
                    </div>

                    <br />

                    <label>Síntomas a cumplir</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-clipboard-check"></i></div>
                        <input id="inputIngreseTipoDepresion-AgregarTipoDepresion" type="text" className="form-control" placeholder="Ingrese el número de sintomas a cumplir"
                            onKeyDown={verificarNumeros} onChange={handleInputChange} name="cantidad_sintomas" required/>
                    </div>

                    <br />

                    {/*Sección Botones Enviar y Regresar*/}
                    <div id="cajaBotones-AgregarTiposDepresion">

                        <div id="cajaRegresar-AgregarTiposDepresion">

                            <button id="botonRegresar-AgregarTiposDepresion" type="button" className="btn btn-primary" title="Regresar a la plataforma" onClick={(e) => estadoInicial(e)}>Regresar</button>

                        </div>

                        <form className="row" onSubmit={(e) => verificarDatos(e, datosGuardados)}>
                            <div id="cajaEnviar-AgregarTiposDepresion">
                                <button id="botonEnviar-AgregarTiposDepresion" type="submit" className="btn btn-primary" title="Crear nuevo tipo de depresión" >Enviar</button>
                            </div>
                        </form>

                    </div>
                    <br />
                </div>

            </div>

        </div>
    );
}

export default AgregarTipoDepresion;