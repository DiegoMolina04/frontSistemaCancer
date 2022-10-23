//Css
import '../../css/TiposDepresion.css';
import '../../css/fontawesome-free-5.15.4-web/css/all.css'
//React
import React, { useContext } from 'react';
//Context
import { UserContext } from "../../../../src/capaNegocio/context/UserContext.js";
//Capturador datos ingresados
import useChange from './useChange';
//Logica negocio
import useTiposDepresion from '../../../capaNegocio/logicaNegocio/TiposDepresion/useTiposDepresion';
import verificarNumeros from '../../../capaNegocio/logicaNegocio/LogicaComun/verificarNumeros';

function TiposDepresion() {

    //Contexto
    const { datosGuardados } = useContext(UserContext);
    const { datosOriginales } = useContext(UserContext);
    const { filtro } = useContext(UserContext);
    //Capturador datos ingresados
    const { handleInputChangeModificar, handleFiltrarChange } = useChange();
    //Logica negocio
    const { listarTiposDepresion, componenteListarTipoDepresion, componenteMostrarMensaje, componenteNombreOpcion, componenteCabeceraModificarEliminar, componenteAgregarTipoDepresion, modificarTipoDepresion, eliminarTipoDepresion } = useTiposDepresion();

    return (

        <div id="fondo-AdministrarTiposDepresion">

            <div id="cabeceraAdministrarTiposDepresion-AdministrarTiposDepresion">

                <div id="cajaNombreOpcion-AdministrarTiposDepresion">

                    {componenteNombreOpcion}

                </div>

                <div id="busqueda">

                    <form id="formato" onSubmit={(e) => listarTiposDepresion(e, "filtrar", filtro)}>

                        <select class="form-select" onChange={handleFiltrarChange} name="categoria" title="Seleccione categoria para buscar palabra" >

                            <option selected >Seleccione Categoría...</option>
                            <option value="tipoDepresion">Tipo Depresión</option>

                        </select>

                        <input id="filtrar" type="text" className="form-control" onChange={handleFiltrarChange} name="inputFiltro" placeholder="¿Busca algo puntual?" title="Ingrese valor a buscar" />

                        <button id="enviarBuscar-Plataforma" type="submit" className="btn btn-success" title="Buscar" >
                            <i class="fas fa-search"></i>
                        </button>

                    </form>
                </div>


                <div id="cajaAgregarAdministrarTiposDepresion-AdministrarTiposDepresion">

                    {componenteAgregarTipoDepresion}

                </div>

            </div>

            <form id="formato" onSubmit={(e) => listarTiposDepresion(e, "listar")}>

                <div id="cajaTabla-AdministrarTiposDepresion">

                    <div id="cajaCabecera-AdministrarTiposDepresion">

                        <div id="cajamensajeRespuesta-AdministrarTiposDepresion">
                            <h5 id="mensajeRespuesta-AdministrarTiposDepresion">{componenteMostrarMensaje}</h5>
                        </div>
                        <div id="cajaBotonRecargar-AdministrarTiposDepresion">
                            <button id="botonRecargar-AdministrarTiposDepresion" type='submit' className="btn btn-success" title='Recargar tabla'><i class="fas fa-redo"></i></button>
                        </div>
                    </div>

                    <table id="tabla-AdministrarTiposDepresion" class="table table-bordered">
                        <thead> {/*Cabeceras*/}
                            <tr>
                                <th id="tipoDepresionTablaCabecera-AdministrarTiposDepresion" scope="col" title="Tipos de depresión">Tipo Depresión</th>
                                <th id="cantidadSintomasTablaCabecera-AdministrarTiposDepresion" scope="col" title="Cantidad de sintomas">Síntomas A Cumplir</th>

                                {/*Columna para agregar o elimina*/}
                                {componenteCabeceraModificarEliminar}
                            </tr>
                        </thead>
                        <tbody> {/*Filas*/}

                            {componenteListarTipoDepresion}

                        </tbody>
                    </table>
                </div>
            </form>
            {/*Modal para el botón de Eliminar Tipos depresion*/}
            <form className="row" onSubmit={(e) => eliminarTipoDepresion(e, datosOriginales)}>
                <div class="modal fade" id="modalEliminar-AdministrarTipoDepresion" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">

                                <h5 class="modal-title" id="modalLabelEliminar-AdministrarTiposDepresion">

                                    <i class="fas fa-exclamation-triangle"></i>
                                    <label >Advertencia</label>

                                </h5>
                            </div>
                            <div class="modal-body">

                                <label>¿Realmente desea eliminar el tipo de depresión "{datosGuardados.tipo_depresion}" ?</label>
                                <label id="labelRevertirCambios-AdministrarTiposDepresion">Los cambios no se podrán revertir.</label>

                            </div>
                            <div class="modal-footer">

                                <button type="button" id="botonModalCancelar-AdministrarTiposDepresion" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa a tipos depresión">Cancelar</button>
                                <button type="submit" id="botonmodalEliminar-AdministrarTipoDepresion" class="btn btn-primary" data-bs-dismiss="modal" title="Eliminar tipo depresión">Eliminar</button>

                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/*Modal para el botón de Modificar Tipos depresion*/}
            <form className="row" onSubmit={(e) => modificarTipoDepresion(e, datosGuardados, datosOriginales)}>
                <div class="modal fade" id="modalModificar-AdministrarTipoDepresion" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">

                                <h5 class="modal-title" id="modalLabelModificar-AdministrarTiposDepresion">

                                    <i class="fas fa-cog"></i>
                                    <label >Modificar Tipo Depresión</label>

                                </h5>
                            </div>
                            <div class="modal-body">

                                <div id="labelTipoDepresionModificar-AdministrarTipoDepresion">

                                    <label>Tipo De Depresión</label>

                                </div>

                                <div className="input-group">
                                    <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-notes-medical"></i></div>
                                    <input id="" type="text" className="form-control" value={datosGuardados.tipo_depresion} placeholder="Ingrese el tipo de depresión" onChange={handleInputChangeModificar} name="tipo_depresion" title="Tipo depresión" />

                                </div>

                                <br />


                                <div id="labelCantidadSintomasModificar-AdministrarTipoDepresion">

                                    <label>Sintomas A Cumplir</label>

                                </div>

                                <div className="input-group">
                                    <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-clipboard-check"></i></div>
                                    <input id="" type="text" className="form-control" value={datosGuardados.cantidad_sintomas}
                                        onKeyDown={verificarNumeros} placeholder="Ingrese cantidad de sintomas que debe cumplir" onChange={handleInputChangeModificar} name="cantidad_sintomas" title="Cantidad sintomas a modificar" />

                                </div>

                                <br />

                            </div>

                            <div class="modal-footer">

                                <button type="button" id="botonModalCancelar-AdministrarTiposDepresion" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa a tipos depresión">Cancelar</button>
                                <button type="submit" id="botonmodalModificar-AdministrarTipoDepresion" class="btn btn-primary" data-bs-dismiss="modal" title="Modificar tipo depresión">Modificar</button>

                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    );
}

export default TiposDepresion;