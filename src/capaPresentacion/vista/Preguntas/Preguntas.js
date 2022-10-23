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

    const { datosGuardados } = useContext(UserContext); //Muestra dato en el input del modificar
    const { datosOriginales } = useContext(UserContext); //Datos originales al ser seteados al hacer click en modificar

    const { datosTablaModificar } = useContext(UserContext); //Datos al seleccionar checkbox se muestra en textarea
    const { guardarID } = useContext(UserContext); //Se guarda id del elemento seleccionado con el checkbox
    const { filtro } = useContext(UserContext); //Se guarda información del filtro

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

                        <select className="form-select" onChange={handleFiltrarChange} name="categoria" title="Seleccione categoria para buscar palabra" >

                            <option value >Seleccione Categoría...</option>
                            <option value="pregunta">Pregunta</option>

                        </select>

                        <input id="filtrar" type="text" className="form-control" onChange={handleFiltrarChange} name="inputFiltro" placeholder="¿Busca algo puntual?" title="Ingrese valor a buscar" />

                        <button id="enviarBuscar-Plataforma" type="submit" className="btn btn-success" title="Buscar" >
                            <i className="fas fa-search"></i>
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
                            <button id="botonRecargar-AdministrarPreguntas" type='submit' className="btn btn-success" title='Recargar tabla'><i className="fas fa-redo"></i></button>
                        </div>
                    </div>

                    <table id="tabla-AdministrarPreguntas" className="table table-bordered">
                        <thead> {/*Cabeceras*/}
                            <tr>
                                <th id="preguntaTablaCabecera-AdministrarPreguntas" scope="col" title="Preguntas del sistema">Pregunta</th>
                                <th id="sintomaTablaCabecera-AdministrarPreguntas" scope="col" title="Sintomas ligados a preguntas">Síntoma</th>

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
                <div className="modal fade" id="modalEliminar-AdministrarPreguntas" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">

                                <h5 className="modal-title" id="modalLabelEliminar-AdministrarPreguntas">

                                    <i className="fas fa-exclamation-triangle"></i>
                                    <label >Advertencia</label>

                                </h5>
                            </div>
                            <div className="modal-body">

                                <label>¿Realmente desea eliminar la pregunta "{datosOriginales.pregunta}" ?</label>
                                <label id="labelRevertirCambios-AdministrarPreguntas">Los cambios no se podrán revertir.</label>

                            </div>
                            <div className="modal-footer">

                                <button type="button" id="botonModalCancelar-AdministrarPreguntas" className="btn btn-secondary" data-bs-dismiss="modal" onClick={reiniciarModal} title="Regresa a administrar preguntas">Cancelar</button>
                                <button type="submit" id="botonModalEliminar-AdministrarPreguntas" className="btn btn-primary" data-bs-dismiss="modal" title="Eliminar pregunta">Eliminar</button>

                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/*Modal para el botón de Modificar */}
            <form className="row" onSubmit={(e) => modificarPregunta(e, datosOriginales, datosGuardados, guardarID)}>
                <div className="modal fade" id="modalModificar-AdministrarPreguntas" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">

                                <h5 className="modal-title" id="modalLabelModificar-AdministrarPreguntas">

                                    <i className="fas fa-cog"></i>
                                    <label >Modificar Pregunta</label>

                                </h5>
                            </div>
                            <div className="modal-body">

                                <div id="labelPreguntaModificar-AdministrarPreguntas">

                                    <label>Pregunta</label>

                                </div>

                                <div className="input-group">
                                    <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-address-card"></i></div>
                                    <textarea className="form-control" placeholder="Ingrese la pregunta" value={datosGuardados.pregunta} onChange={handleInputChangeModificar} name="pregunta" title="Pregunta a modificar"></textarea>
                                </div>

                                <br />

                                {/*Sección AdministrarPreguntas*/}

                                <div id="labelSintomaModificar-AdministrarPreguntas">

                                    <label>Seleccione el/los sintomas</label>

                                </div>

                                <div className="input-group">
                                    <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-font"></i></div>
                                    <textarea className="form-control" placeholder="Seleccione los sintomas" readonly="readonly" value={datosTablaModificar} onChange={handleChange} title="Sintomas seleccionados"></textarea>
                                </div>

                                <br />

                                {/*Sección Descripción*/}

                                <div id="cajaTablaModificar-AdministrarPreguntas">

                                    <div id="cajaBotonRecargarModificar-AdministrarPreguntas">

                                        <button id="botonRecargarModificar-AdministrarPreguntas" type='button' onClick={(e) => listarElementos(e, "sintomas")} className="btn btn-success" title='Recargar tabla'><i className="fas fa-redo"></i></button>

                                    </div>

                                    <table id="tablaSintomas-AdministrarPreguntas" className="table table-bordered">

                                        <thead> {/*Cabeceras*/}
                                            <tr>
                                                <th id="sintomaTablaCabeceraModificar-AdministrarPreguntas" scope="col" title="Sintomas">Síntoma</th>
                                                <th id="seleccionTablaCabeceraModificar-AdministrarPreguntas" scope="col" title="Selecciones">Elegir</th>

                                            </tr>
                                            {componenteListarSintomas}

                                        </thead>
                                    </table>
                                </div>

                            </div>
                            <div className="modal-footer">

                                <button type="button" id="botonModalCancelar-AdministrarPreguntas" className="btn btn-secondary" data-bs-dismiss="modal" onClick={reiniciarModal} title="Regresa a preguntas">Cancelar</button>
                                <button type="submit" id="botonModalModificar-AdministrarPreguntas" className="btn btn-primary" data-bs-dismiss="modal" title="Modificar pregunta">Modificar</button>

                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    );
}
export default Preguntas;