//Css
import '../../css/Diccionario.css';
import '../../css/fontawesome-free-5.15.4-web/css/all.css'
//React
import React, { useContext } from 'react';
//Context
import { UserContext } from "../../../../src/capaNegocio/context/UserContext.js";
//Capturador datos ingresados
import useChange from './useChange';
//Logica negocio
import useDiccionario from '../../../capaNegocio/logicaNegocio/Diccionario/useDiccionario';

function Diccionario() {

    //Contexto
    const { datosGuardados } = useContext(UserContext);
    const { datosOriginales } = useContext(UserContext);
    const { filtro } = useContext(UserContext);
    //Capturador datos ingresados
    const { handleInputChangeModificar, handleFiltrarChange } = useChange();
    //Logica negocio
    const { listarDiccionario, componenteListarTerminos, componenteMostrarMensaje, componenteNombreOpcion, componenteCabeceraModificarEliminar, componenteAgregarTermino, modificarTermino, eliminarTermino } = useDiccionario();


    return (

        <div id="fondo-AdministrarTerminos">

            <div id="cabeceraAdministrarTerminos-AdministrarTerminos">

                <div id="cajaNombreOpcion-AdministrarTerminos">

                    {componenteNombreOpcion}

                </div>

                <div id="busqueda">

                    <form id="formato" onSubmit={(e) => listarDiccionario(e, "filtrar", filtro)}>

                        <select class="form-select" onChange={handleFiltrarChange} name="categoria" title="Seleccione categoria para buscar palabra" >

                            <option selected >Seleccione Categoría...</option>
                            <option value="termino">Término</option>
                            <option value="descripcion">Descripción</option>

                        </select>

                        <input id="filtrar" type="text" className="form-control" onChange={handleFiltrarChange} name="inputFiltro" placeholder="¿Busca algo puntual?" title="Ingrese valor a buscar" />

                        <button id="enviarBuscar-Plataforma" type="submit" className="btn btn-success" title="Buscar" >
                            <i class="fas fa-search"></i>
                        </button>

                    </form>
                </div>


                <div id="cajaAgregarAdministrarTerminos-AdministrarTerminos">

                    {componenteAgregarTermino}

                </div>

            </div>

            <form id="formato" onSubmit={(e) => listarDiccionario(e, "listar")}>

                <div id="cajaTabla-AdministrarTerminos">

                    <div id="cajaCabecera-AdministrarTerminos">

                        <div id="cajaMensajeRespuesta-AdministrarTerminos">
                            <h5 id="mensajeRespuesta-AdministrarTerminos">{componenteMostrarMensaje}</h5>
                        </div>
                        <div id="cajaBotonRecargar-AdministrarTerminos">
                            <button id="botonRecargar-AdministrarTerminos" type='submit' className="btn btn-success" title='Recargar tabla'><i class="fas fa-redo"></i></button>
                        </div>
                    </div>

                    <table id="tabla-AdministrarTerminos" class="table table-bordered">
                        <thead> {/*Cabeceras*/}
                            <tr>
                                <th id="terminoTablaCabecera-AdministrarTerminos" scope="col" title="Palabras">Término</th>
                                <th id="descripcionTablaCabecera-AdministrarTerminos" scope="col" title="Descripción del termino">Descripción</th>

                                {/*Columna para agregar o elimina*/}
                                {componenteCabeceraModificarEliminar}
                            </tr>
                        </thead>
                        <tbody> {/*Filas*/}

                            {componenteListarTerminos}

                        </tbody>
                    </table>
                </div>
            </form>
            {/*Modal para el botón de Eliminar */}
            <form className="row" onSubmit={(e) => eliminarTermino(e, datosOriginales)}>
                <div class="modal fade" id="modalEliminar-AdministrarTerminos" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">

                                <h5 class="modal-title" id="modalLabelEliminar-AdministrarTerminos">

                                    <i class="fas fa-exclamation-triangle"></i>
                                    <label >Advertencia</label>

                                </h5>
                            </div>
                            <div class="modal-body">

                                <label>¿Realmente desea eliminar el término "{datosGuardados.termino}" ?</label>
                                <label id="labelRevertirCambios-AdministrarTerminos">Los cambios no se podrán revertir.</label>

                            </div>
                            <div class="modal-footer">

                                <button type="button" id="botonModalCancelar-AdministrarTerminos" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa a terminos">Cancelar</button>
                                <button type="submit" id="botonModalEliminar-AdministrarTerminos" class="btn btn-primary" data-bs-dismiss="modal" title="Eliminar termino">Eliminar</button>

                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/*Modal para el botón de Modificar */}
            <form className="row" onSubmit={(e) => modificarTermino(e, datosGuardados, datosOriginales)}>
                <div class="modal fade" id="modalModificar-AdministrarTerminos" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">

                                <h5 class="modal-title" id="modalLabelModificar-AdministrarTerminos">

                                    <i class="fas fa-cog"></i>
                                    <label >Modificar Término</label>

                                </h5>
                            </div>
                            <div class="modal-body">

                                <div id="labelTerminoModificar-AdministrarTerminos">

                                    <label>Término</label>

                                </div>

                                <div className="input-group">
                                    <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-address-card"></i></div>
                                    <input id="" type="text" className="form-control" value={datosGuardados.termino} placeholder="Ingrese el término" onChange={handleInputChangeModificar} name="termino" title="Termino a modificar" />

                                </div>

                                <br />

                                <div id="labelDescripcionModificar-AdministrarTerminos">

                                    <label>Descripción</label>

                                </div>

                                <div className="input-group">
                                    <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-font"></i></div>
                                    <textarea class="form-control" placeholder="Ingrese la descripción del termino" value={datosGuardados.descripcion} onChange={handleInputChangeModificar} name="descripcion" title="Descripción del término"></textarea>
                                </div>

                                <br />

                            </div>
                            <div class="modal-footer">

                                <button type="button" id="botonModalCancelar-AdministrarTerminos" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa a terminos">Cancelar</button>
                                <button type="submit" id="botonModalModificar-AdministrarTerminos" class="btn btn-primary" data-bs-dismiss="modal" title="Modificar terminos">Modificar</button>

                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    );
}

export default Diccionario;