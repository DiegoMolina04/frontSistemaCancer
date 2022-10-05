//Css
import '../../css/ResultadoDiagnostico.css';
import '../../css/fontawesome-free-5.15.4-web/css/all.css'
//React
import React, { useContext } from 'react';
//Context
import { UserContext } from "../../../../src/capaNegocio/context/UserContext.js";
//Capturador datos ingresados
import useChange from './useChange';
//Logica negocio
import useResultadoDiagnostico from '../../../capaNegocio/logicaNegocio/ResultadoDiagnostico/useResultadoDiagnostico';
import verificarNumeros from '../../../capaNegocio/logicaNegocio/LogicaComun/verificarNumeros';

function ResultadoDiagnostico() {

    //Contexto
    const { datosGuardados, setDatosGuardados } = useContext(UserContext);
    const { datosOriginales, setDatosOriginales } = useContext(UserContext);
    const { filtro, setFiltro } = useContext(UserContext);
    //Capturador datos ingresados
    const { handleInputChangeModificar, handleFiltrarChange } = useChange();
    //Logica negocio
    const { listarResultados, componenteListarResultados, componenteNombreOpcion, componenteCabeceraModificarEliminar, componenteMostrarMensaje, modificarResultados, eliminarResultados } = useResultadoDiagnostico();

    return (

        <div id="fondo-ResultadoDiagnostico">

            <div id="cabecera-ResultadoDiagnostico">

                <div id="cajaNombreOpcion-ResultadoDiagnostico">

                    {componenteNombreOpcion}

                </div>

                <div id="busqueda">

                    <form id="formato" onSubmit={(e) => listarResultados(e, "filtrar", filtro)}>

                        <select class="form-select" onChange={handleFiltrarChange} name="categoria" title="Seleccione categoria para buscar palabra" >

                            <option selected >Seleccione Categoría...</option>
                            <option value="cedula">Cedula Paciente</option>
                            <option value="nombre">Nombre Paciente</option>

                        </select>

                        <input id="filtrar" type="text" className="form-control" onChange={handleFiltrarChange} name="inputFiltro" placeholder="¿Busca algo puntual?" title="Ingrese valor a buscar" />

                        <button id="enviarBuscar-Plataforma" type="submit" className="btn btn-success" title="Buscar" >
                            <i class="fas fa-search"></i>
                        </button>

                    </form>
                </div>

            </div>

            <form id="formato" onSubmit={(e) => listarResultados(e, "listar")}>

                <div id="cajaTabla-ResultadoDiagnostico">

                    <div id="cajaCabecera-ResultadoDiagnostico">

                        <div id="cajaMensajeRespuesta-ResultadoDiagnostico">
                            <h5 id="mensajeRespuesta-ResultadoDiagnostico">{componenteMostrarMensaje}</h5>
                        </div>
                        <div id="cajaBotonRecargar-ResultadoDiagnostico">
                            <button id="botonRecargar-ResultadoDiagnostico" type='submit' className="btn btn-success" title='Recargar tabla'><i class="fas fa-redo"></i></button>
                        </div>
                    </div>

                    <table id="tabla-ResultadoDiagnostico" class="table table-bordered">
                        <thead> {/*Cabeceras*/}
                            <tr>
                                <th id="cedulaTablaCabecera-ResultadoDiagnostico" scope="col" title="Cedula del paciente">Cédula Paciente</th>
                                <th id="nombrePacienteTablaCabecera-ResultadoDiagnostico" scope="col" title="Nombre del paciente">Nombre Paciente</th>
                                <th id="resultadoTablaCabecera-ResultadoDiagnostico" scope="col" title="Resultado guardado">Resultado</th>

                                {/*Columna para agregar o elimina*/}
                                {componenteCabeceraModificarEliminar}
                                
                            </tr>
                        </thead>
                        <tbody> {/*Filas*/}

                            {componenteListarResultados}

                        </tbody>
                    </table>
                </div>
            </form>

            {/*Modal para el botón de Eliminar*/}
            <form className="row" onSubmit={(e) => eliminarResultados(e, datosOriginales)}>
                <div class="modal fade" id="modalEliminar-ResultadoDiagnostico" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">

                                <h5 class="modal-title" id="modalLabelEliminar-ResultadoDiagnostico">

                                    <i class="fas fa-exclamation-triangle"></i>
                                    <label >Advertencia</label>

                                </h5>

                            </div>
                            <div class="modal-body">

                                <label>¿Realmente desea eliminar el diagnóstico de "{datosGuardados.nombre}"?</label>
                                <label id="labelRevertirCambios-ResultadoDiagnostico">Los cambios no se podrán revertir.</label>

                            </div>
                            <div class="modal-footer">

                                <button type="button" id="botonModalCancelar-ResultadoDiagnostico" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa a administrar resultados">Cancelar</button>
                                <button type="submit" id="botonModalEliminar-ResultadoDiagnostico" class="btn btn-primary" data-bs-dismiss="modal" title="Eliminar resultado">Eliminar</button>

                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/*Modal para el botón de Modificar*/}
            <form className="row" onSubmit={(e) => modificarResultados(e, datosGuardados, datosOriginales)}>
                <div class="modal fade" id="modalModificar-ResultadoDiagnostico" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">

                                <h5 class="modal-title" id="modalLabelModificar-ResultadoDiagnostico">

                                    <i class="fas fa-cog"></i>
                                    <label >Modificar Resultado Diagnóstico</label>

                                </h5>

                            </div>
                            <div class="modal-body">

                                <br />
                                <div id="labelCedulaModificarAdministrarResultado-ResultadoDiagnostico">

                                    <label>Cédula del paciente</label>

                                </div>

                                <div className="input-group">
                                    <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-address-card"></i></div>
                                    <input id="" type="text" className="form-control" value={datosGuardados.cedula} placeholder="Ingrese la cedula del paciente" onChange={handleInputChangeModificar}
                                        onKeyDown={verificarNumeros} name="cedula" title="Ingrese cedula" />


                                </div>

                                <br />

                                <div id="labelNombrePacienteModificarAdministrarResultado-ResultadoDiagnostico">

                                    <label>Nombre del paciente</label>

                                </div>

                                <div className="input-group">
                                    <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-user"></i></div>
                                    <input id="" type="text" className="form-control" value={datosGuardados.nombre} placeholder="Ingrese el nombre del paciente" onChange={handleInputChangeModificar} name="nombre" title="Nombre paciente" />
                                </div>

                                <br />

                            </div>
                            <div class="modal-footer">

                                <button type="button" id="botonModalCancelar-ResultadoDiagnostico" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa a administrar resultados">Cancelar</button>
                                <button type="submit" id="botonModalModificar-ResultadoDiagnostico" class="btn btn-primary" data-bs-dismiss="modal" title="Modificar resultado">Modificar</button>

                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    );
}

export default ResultadoDiagnostico;