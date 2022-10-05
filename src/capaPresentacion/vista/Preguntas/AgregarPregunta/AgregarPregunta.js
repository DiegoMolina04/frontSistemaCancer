//Css
import '../../../css/AgregarPregunta.css';
import '../../../css/fontawesome-free-5.15.4-web/css/all.css'
//Logo
import logoAgregarPregunta from '../../../image/logo.png'
//React
import React, { useContext } from 'react';
//Context
import { UserContext } from "../../../../capaNegocio/context/UserContext";
//Logica negocio
import useChange from './useChange';
import useAgregarPregunta from '../../../../capaNegocio/logicaNegocio/Preguntas/useAgregarPregunta';

function AgregarPregunta() {

    const { datosTablaModificar, setDatosTablaModificar } = useContext(UserContext);//Se muestran datos del textarea
    const { guardarID, setGuardarID } = useContext(UserContext);//Se envia los id de los elementos seleccionados con los checkbox
    const { datosGuardados, setDatosGuardados } = useContext(UserContext); //Se envia el cambio del input

    //Se llama al inputChange
    const { handleInputChange } = useChange();
    //Se llaman componentes y funciones necesarias
    const { cargarSintomas, enviarDatos, componenteListarSintomas, componenteMostrarMensaje, handleChange, reiniciarDatos } = useAgregarPregunta();

    return (

        <div id="fondo-AgregarPregunta">

            {/*Contenedor de agregar pregunta*/}
            <div id="caja-AgregarPregunta">

                {/*Contenedor del logo*/}
                <div id="cajaLogo-AgregarPregunta">

                    <img id="logo-AgregarPregunta" src={logoAgregarPregunta} alt="" />

                </div>


                {/*Linea debajo del logo*/}
                <hr id="linea-AgregarPregunta" />

                <div id="cajaNuevaPregunta-AgregarPregunta">
                    <label id="labelNuevoPregunta-AgregarPregunta">Nueva pregunta</label>
                </div>

                <br />

                <h5>{componenteMostrarMensaje}</h5>


                {/*Contenedor de todo el formulario*/}

                <div id="formulario-AgregarPregunta">

                    <label>Ingrese la pregunta</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-question"></i></div>
                        <input id="inputIngresePregunta-AgregarPregunta" type="text" className="form-control" placeholder="Ingrese la pregunta" onChange={handleInputChange} name="pregunta" required />
                    </div>

                    <br />

                    <label>Seleccione el/los síntomas</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-book"></i></div>
                        <textarea class="form-control" placeholder="Seleccione los sintomas" readonly="readonly" value={datosTablaModificar} onChange={handleChange}></textarea>
                    </div>

                    <br />

                    <div id="cajaTabla-AgregarPreguntas">
                        <form className="row" onSubmit={(e) => cargarSintomas(e)}>
                            <div id="cajaBotonRecargar-AgregarPreguntas">
                                <button id="botonRecargar-AgregarPreguntas" type='submit' className="btn btn-success" title='Recargar tabla'><i class="fas fa-redo"></i></button>
                            </div>
                        </form>
                        <table id="tablaSintomas-AgregarPreguntas" class="table table-bordered">

                            <thead> {/*Cabeceras*/}
                                <tr>
                                    <th id="sintomaTablaCabecera-AgregarPreguntas" scope="col" title="Sintomas">Síntoma</th>
                                    <th id="seleccionTablaCabecera-AgregarPreguntas" scope="col" title="Selecciones">Elegir</th>

                                </tr>
                                {componenteListarSintomas}
                            </thead>
                        </table>

                    </div>

                    <br />

                    {/*Sección Botones Enviar y Regresar*/}
                    <div id="cajaBotones-AgregarPregunta">


                        <div id="cajaRegresar-AgregarPregunta">

                            <button id="botonRegresar-AgregarPregunta" type="button" class="btn btn-primary" title="Regresar a la plataforma" onClick={reiniciarDatos}>Regresar</button>

                        </div>

                        <form className="row" onSubmit={(e) => enviarDatos(e, datosGuardados, guardarID)}>
                            <div id="cajaEnviar-AgregarPregunta">
                                <button id="botonEnviar-AgregarPregunta" type="submit" class="btn btn-primary" title="Crear nueva pregunta" >Enviar</button>
                            </div>
                        </form>

                    </div>
                    <br />
                </div>

            </div>

        </div>
    );
}

export default AgregarPregunta;