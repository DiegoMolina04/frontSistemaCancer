//Css
import '../../../css/GuardarDiagnostico.css';
import '../../../css/fontawesome-free-5.15.4-web/css/all.css'
//Logi
import logo from '../../../image/logo.png'
//React
import React, { useContext } from 'react';
//Context
import { UserContext } from "../../../../../src/capaNegocio/context/UserContext.js";
//OnChange
import useChange from './useChange';
//Logica negocio
import useGuardarDiagnostico from '../../../../capaNegocio/logicaNegocio/Diagnosticar/useGuardarDiagnostico';
import verificarNumeros from '../../../../capaNegocio/logicaNegocio/LogicaComun/verificarNumeros';

function GuardarDiagnostico() {

    //Context
    const { datosGuardados, setDatosGuardados } = useContext(UserContext);
    //HanldeInput
    const { handleInputChange } = useChange();
    //Logica negocio
    const { verificarDatos, componenteMostrarMensaje, componenteDiagnostico, estadoInicial } = useGuardarDiagnostico();

    return (

        <div id="fondo-GuardarDiagnostico">

            <div id="caja-GuardarDiagnostico">

                {/*Contenedor del logo*/}
                <div id="cajaLogo-GuardarDiagnostico">

                    <img id="logo-GuardarDiagnostico" src={logo} alt="" />

                </div>


                {/*Linea debajo del logo*/}
                <hr id="linea-GuardarDiagnostico" />

                <div id="cajaGuardarDiagnostico-GuardarDiagnostico">
                    <label id="labelGuardarDiagnostico-GuardarDiagnostico">Guardar Diagnóstico</label>
                </div>

                <br />

                <h5>{componenteMostrarMensaje}</h5>


                {/*Contenedor de todo el formulario*/}


                <div id="formulario-GuardarDiagnostico">

                    <label>Diagnóstico resultante</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-notes-medical"></i></div>
                        <textarea class="form-control" placeholder="Diagnostico resultante" value={componenteDiagnostico} name="diagnostico" readOnly></textarea>
                    </div>

                    <br />

                    <label>Cédula del paciente</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-clipboard-check"></i></div>
                        <input id="inputGuardarDiagnostico-GuardarDiagnostico" type="text" className="form-control" placeholder="Ingrese la cédula del paciente"
                            onKeyDown={verificarNumeros} onChange={handleInputChange} name="cedula" required />
                    </div>

                    <br />

                    <label>Nombre del paciente</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-clipboard-check"></i></div>
                        <input id="inputGuardarDiagnostico-GuardarDiagnostico" type="text" className="form-control" placeholder="Ingrese el nombre del paciente" onChange={handleInputChange} name="nombre" required />
                    </div>

                    <br />

                    {/*Sección Botones Enviar y Regresar*/}
                    <div id="cajaBotones-GuardarDiagnostico">

                        <div id="cajaRegresar-GuardarDiagnostico">

                            <button id="botonRegresar-GuardarDiagnostico" type="button" class="btn btn-primary" title="No guardar diagnostico" onClick={(e) => estadoInicial(e)}>Cancelar</button>

                        </div>

                        <form className="row" onSubmit={(e) => verificarDatos(e, datosGuardados)}>
                            <div id="cajaGuardar-GuardarDiagnostico">
                                <button id="botonGuardar-GuardarDiagnostico" type="submit" class="btn btn-primary" title="Guardar diagnostico del paciente" >Guardar</button>
                            </div>
                        </form>

                    </div>
                    <br />
                </div>

            </div>

        </div>
    );
}

export default GuardarDiagnostico;