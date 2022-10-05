//Css
import '../../css/Preguntas.css';
import '../../css/fontawesome-free-5.15.4-web/css/all.css'
//React
import React, { useContext } from 'react';
//Context
import { UserContext } from "../../../../src/capaNegocio/context/UserContext.js";
//Logica negocio
import useChange from './useChange';
import usePreguntas from '../../../capaNegocio/logicaNegocio/Preguntas/usePreguntas';


function Preguntas() {

    const { datosGuardados, setDatosGuardados } = useContext(UserContext); //Muestra dato en el input del modificar
    const { datosOriginales, setDatosOriginales } = useContext(UserContext); //Datos originales al ser seteados al hacer click en modificar

    const { datosTablaModificar, setDatosTablaModificar } = useContext(UserContext); //Datos al seleccionar checkbox se muestra en textarea
    const { guardarID, setGuardarID } = useContext(UserContext); //Se guarda id del elemento seleccionado con el checkbox
    const { filtro, setFiltro } = useContext(UserContext); //Se guarda información del filtro

    const { handleInputChangeModificar, handleFiltrarChange } = useChange(); //Onchange para capturar datos en los inputs
    const { listarElementos, componenteListarPreguntas, componenteListarSintomas, componenteMostrarMensaje, componenteNombreOpcion, componenteCabeceraModificarEliminar, componenteAgregarPregunta, modificarPregunta, eliminarPregunta, handleChange, reiniciarModal } = usePreguntas(); //Logica de negocio

    return (

        <div id="fondo-AdministrarPreguntas">

            <div id="cabeceraAdministrarPreguntas-AdministrarPreguntas">

                <div id="cajaNombreOpcion-AdministrarPreguntas">

                    {componenteNombreOpcion}

                </div>

                <div id="busqueda">

                    <form id="formato" onSubmit={(e) => listarElementos(e, "filtrar", filtro)}>

                        <select class="form-select" onChange={handleFiltrarChange} name="categoria" title="Seleccione categoria para buscar palabra" >

                            <option selected >Seleccione Categoria...</option>
                            <option value="pregunta">Pregunta</option>

                        </select>

                        <input id="filtrar" type="text" className="form-control" onChange={handleFiltrarChange} name="inputFiltro" placeholder="¿Busca algo puntual?" title="Ingrese valor a buscar" />

                        <button id="enviarBuscar-Plataforma" type="submit" className="btn btn-success" title="Buscar" >
                            <i class="fas fa-search"></i>
                        </button>

                    </form>
                </div>


                <div id="cajaAgregarAdministrarPreguntas-AdministrarPreguntas">

                    {componenteAgregarPregunta}

                </div>

            </div>

            <form id="formato" onSubmit={(e) => listarElementos(e, "listar")}>

                <div id="cajaTabla-AdministrarPreguntas">

                    <div id="cajaCabecera-AdministrarPreguntas">

                        <div id="cajaMensajeRespuesta-AdministrarPreguntas">
                            <h5 id="mensajeRespuesta-AdministrarPreguntas">{componenteMostrarMensaje}</h5>
                        </div>
                        <div id="cajaBotonRecargar-AdministrarPreguntas">
                            <button id="botonRecargar-AdministrarPreguntas" type='submit' className="btn btn-success" title='Recargar tabla'><i class="fas fa-redo"></i></button>
                        </div>
                    </div>

                    <table id="tabla-AdministrarPreguntas" class="table table-bordered">
                        <thead> {/*Cabeceras*/}
                            <tr>
                                <th id="preguntaTablaCabecera-AdministrarPreguntas" scope="col" title="Preguntas del sistema">Pregunta</th>
                                <th id="sintomaTablaCabecera-AdministrarPreguntas" scope="col" title="Sintomas ligados a preguntas">Sintoma</th>

                                {/*Columna para agregar o elimina*/}
                                {componenteCabeceraModificarEliminar}
                            </tr>
                        </thead>
                        <tbody> {/*Filas*/}

                            {componenteListarPreguntas}

                        </tbody>
                    </table>
                </div>
            </form>
            {/*Modal para el botón de Eliminar*/}
            <form className="row" onSubmit={(e) => eliminarPregunta(e, datosOriginales)}>
                <div class="modal fade" id="modalEliminar-AdministrarPreguntas" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">

                                <h5 class="modal-title" id="modalLabelEliminar-AdministrarPreguntas">

                                    <i class="fas fa-exclamation-triangle"></i>
                                    <label >Advertencia</label>

                                </h5>
                            </div>
                            <div class="modal-body">

                                <label>¿Realmente desea eliminar la pregunta "{datosOriginales.pregunta}" ?</label>
                                <label id="labelRevertirCambios-AdministrarPreguntas">Los cambios no se podrán revertir.</label>

                            </div>
                            <div class="modal-footer">

                                <button type="button" id="botonModalCancelar-AdministrarPreguntas" class="btn btn-secondary" data-bs-dismiss="modal" onClick={reiniciarModal} title="Regresa a administrar preguntas">Cancelar</button>
                                <button type="submit" id="botonModalEliminar-AdministrarPreguntas" class="btn btn-primary" data-bs-dismiss="modal" title="Eliminar pregunta">Eliminar</button>

                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/*Modal para el botón de Modificar */}
            <form className="row" onSubmit={(e) => modificarPregunta(e, datosOriginales, datosGuardados, guardarID)}>
                <div class="modal fade" id="modalModificar-AdministrarPreguntas" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">

                                <h5 class="modal-title" id="modalLabelModificar-AdministrarPreguntas">

                                    <i class="fas fa-cog"></i>
                                    <label >Modificar Pregunta</label>

                                </h5>
                            </div>
                            <div class="modal-body">

                                <div id="labelPreguntaModificar-AdministrarPreguntas">

                                    <label>Pregunta</label>

                                </div>

                                <div className="input-group">
                                    <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-address-card"></i></div>
                                    <input id="" type="text" className="form-control" value={datosGuardados.pregunta} placeholder="Ingrese la pregunta" onChange={handleInputChangeModificar} name="pregunta" title="Pregunta a modificar" />

                                </div>

                                <br />

                                {/*Sección AdministrarPreguntas*/}

                                <div id="labelSintomaModificar-AdministrarPreguntas">

                                    <label>Seleccione el/los sintomas</label>

                                </div>

                                <div className="input-group">
                                    <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-font"></i></div>
                                    <textarea class="form-control" placeholder="Seleccione los sintomas" readonly="readonly" value={datosTablaModificar} onChange={handleChange} title="Sintomas seleccionados"></textarea>
                                </div>

                                <br />

                                {/*Sección Descripción*/}

                                <div id="cajaTablaModificar-AdministrarPreguntas">

                                    <div id="cajaBotonRecargarModificar-AdministrarPreguntas">

                                        <button id="botonRecargarModificar-AdministrarPreguntas" type='button' onClick={(e) => listarElementos(e, "sintomas")} className="btn btn-success" title='Recargar tabla'><i class="fas fa-redo"></i></button>

                                    </div>
                                    <table id="tablaSintomas-AdministrarPreguntas" class="table table-bordered">

                                        <thead> {/*Cabeceras*/}
                                            <tr>
                                                <th id="sintomaTablaCabeceraModificar-AdministrarPreguntas" scope="col" title="Sintomas">Sintoma</th>
                                                <th id="seleccionTablaCabeceraModificar-AdministrarPreguntas" scope="col" title="Selecciones">Elegir</th>

                                            </tr>
                                            {componenteListarSintomas}

                                        </thead>
                                    </table>
                                </div>

                            </div>
                            <div class="modal-footer">

                                <button type="button" id="botonModalCancelar-AdministrarPreguntas" class="btn btn-secondary" data-bs-dismiss="modal" onClick={reiniciarModal} title="Regresa a preguntas">Cancelar</button>
                                <button type="submit" id="botonModalModificar-AdministrarPreguntas" class="btn btn-primary" data-bs-dismiss="modal" title="Modificar pregunta">Modificar</button>

                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    );
}
export default Preguntas;