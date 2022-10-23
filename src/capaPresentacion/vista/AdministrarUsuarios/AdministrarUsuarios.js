//Css
import '../../css/AdministrarUsuarios.css';
import '../../css/fontawesome-free-5.15.4-web/css/all.css'
//React
import React, { useContext } from 'react';
//Context
import { UserContext } from "../../../../src/capaNegocio/context/UserContext.js";
//Capturador datos ingresados
import useChange from './useChange';
//Logica negocio
import useAdministrarUsuarios from '../../../capaNegocio/logicaNegocio/AdministrarUsuarios/useAdministrarUsuarios';
import verificarNumeros from '../../../capaNegocio/logicaNegocio/LogicaComun/verificarNumeros';

function AdministrarUsuarios() {

    //Contexto
    const { datosGuardados } = useContext(UserContext);
    const { datosOriginales } = useContext(UserContext);
    const { filtro } = useContext(UserContext);
    //Capturador datos ingresados
    const { handleInputChangeModificar, handleFiltrarChange } = useChange();
    //Logica negocio
    const { listarUsuarios, componenteListarUsuarios, componenteMostrarMensaje, componenteAgregarUsuario, modificarUsuario, eliminarUsuario } = useAdministrarUsuarios();

    return (

        <div id="fondo-AdministrarUsuarios">

            <div id="cabeceraAdministrarUsuarios-AdministrarUsuarios">

                <div id="cajaNombreOpcion-AdministrarUsuarios">

                    <label>Administrar Usuarios</label>

                </div>

                <div id="busqueda">

                    <form id="formato" onSubmit={(e) => listarUsuarios(e, "filtrar", filtro)}>

                        <select class="form-select" onChange={handleFiltrarChange} name="categoria" title="Seleccione categoria para buscar palabra" >

                            <option selected >Seleccione Categoría...</option>
                            <option value="correo">Correo</option>
                            <option value="cuenta">Tipo Cuenta</option>

                        </select>

                        <input id="filtrar" type="text" className="form-control" onChange={handleFiltrarChange} name="inputFiltro" placeholder="¿Busca algo puntual?" title="Ingrese valor a buscar" />

                        <button id="enviarBuscar-Plataforma" type="submit" className="btn btn-success" title="Buscar" >
                            <i class="fas fa-search"></i>
                        </button>

                    </form>
                </div>

                <div id="cajaAgregarAdministrarUsuarios-AdministrarUsuarios">

                    {componenteAgregarUsuario}

                </div>

            </div>

            <form id="formato" onSubmit={(e) => listarUsuarios(e, "listar")}>

                <div id="cajaTabla-AdministrarUsuarios">

                    <div id="cajaCabecera-AdministrarUsuarios">

                        <div id="cajaMensajeRespuesta-AdministrarUsuario">
                            <h5 id="mensajeRespuesta-AdministrarUsuario">{componenteMostrarMensaje}</h5>
                        </div>
                        <div id="cajaBotonRecargar-AdministrarUsuario">
                            <button id="botonRecargar-AdministrarUsuario" value="Formatooooo" type='submit' className="btn btn-success" title='Recargar tabla'><i class="fas fa-redo"></i></button>
                        </div>
                    </div>

                    <table id="tabla-AdministrarUsuarios" class="table table-bordered">
                        <thead> {/*Cabeceras*/}
                            <tr>
                                <th id="cedulaTablaCabecera-AdministrarUsuarios" scope="col" title="Cedula del usuario">Cédula</th>
                                <th id="nombreUsuarioTablaCabecera-AdministrarUsuarios" scope="col" title="Nombre del usuario">Nombre Usuario</th>
                                <th id="correoTablaCabecera-AdministrarUsuarios" scope="col" title="Correo del usuario">Correo</th>
                                <th id="rolTablaCabecera-AdministrarUsuarios" scope="col" title="Tipo de cuenta de usuario">Tipo De Cuenta</th>

                                {/*Columna para agregar o elimina*/}
                                <th id="modificarEliminarTablaCabecera-AdministrarUsuarios" scope="col" title="Modificar/Eliminar el usuario">Modificar/Eliminar</th>
                            </tr>
                        </thead>
                        <tbody> {/*Filas*/}

                            {componenteListarUsuarios}

                        </tbody>
                    </table>
                </div>
            </form>

            {/*Modal para el botón de Eliminar AdministrarUsuarios*/}
            <form className="row" onSubmit={(e) => eliminarUsuario(e, datosOriginales)}>
                <div class="modal fade" id="modalEliminar-AdministrarUsuarios" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">

                                <h5 class="modal-title" id="modalLabelEliminar-AdministrarUsuarios">

                                    <i class="fas fa-exclamation-triangle"></i>
                                    <label >Advertencia</label>

                                </h5>

                            </div>
                            <div class="modal-body">

                                <label>¿Realmente desea eliminar a "{datosGuardados.nombre}"?</label>
                                <label id="labelRevertirCambios-AdministrarUsuarios">Los cambios no se podrán revertir.</label>

                            </div>
                            <div class="modal-footer">

                                <button type="button" id="botonModalCancelar-AdministrarUsuarios" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa a administrar usuarios">Cancelar</button>
                                <button type="submit" id="botonModalEliminar-AdministrarUsuarios" class="btn btn-primary" data-bs-dismiss="modal" title="Eliminar cuenta">Eliminar</button>

                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/*Modal para el botón de Modificar AdministrarUsuarios*/}
            <form className="row" onSubmit={(e) => modificarUsuario(e, datosGuardados, datosOriginales)}>
                <div class="modal fade" id="modalModificar-AdministrarUsuarios" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">

                                <h5 class="modal-title" id="modalLabelModificar-AdministrarUsuarios">

                                    <i class="fas fa-cog"></i>
                                    <label >Modificar Cuenta</label>

                                </h5>

                            </div>
                            <div class="modal-body">

                                <br />
                                <div id="labelCedulaAgregarAdministrarUsuarios-AdministrarUsuarios">

                                    <label>Cédula del usuario</label>

                                </div>

                                <div className="input-group">
                                    <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-address-card"></i></div>
                                    <input id="" type="text" className="form-control" value={datosGuardados.cedula} placeholder="Ingrese la cédula del usuario" onChange={handleInputChangeModificar}
                                        onKeyDown={verificarNumeros} name="cedula" title="Ingrese cedula" />


                                </div>

                                <br />

                                <div id="labelAdministrarUsuariosAgregarAdministrarUsuarios-AdministrarUsuarios">

                                    <label>Nombre Usuario</label>

                                </div>

                                <div className="input-group">
                                    <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-font"></i></div>
                                    <input id="" type="text" className="form-control" value={datosGuardados.nombre} placeholder="Ingrese el nombre de usuario completo" onChange={handleInputChangeModificar} name="nombre" title="Nuevo usuario" />
                                </div>

                                <br />

                                <div id="labelcorreoAgregarAdministrarUsuarios-AdministrarUsuarios">
                                    <label>Correo</label>
                                </div>

                                <div className="input-group">

                                    <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-envelope"></i></div>

                                    <input id="" type="email" className="form-control" value={datosGuardados.email} placeholder="Ingrese el correo" onChange={handleInputChangeModificar} name="email" title="Nuevo correo" />


                                </div>

                                <br />

                                <label id="tipoCuenta-AgregarCuenta">Tipo de cuenta</label>

                                <div id="cajaRadioButtons-AgregarCuenta">

                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="radioButtonAdministrador-AdministrarUsuarios" value="true" onChange={handleInputChangeModificar} name="es_admin" title="Cuenta para administrador" />
                                        <p id="pAdministrador-AdministrarUsuarios" for="inlineRadio1">Administrador</p>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="radioButtonAdministrador-AdministrarUsuarios" value="false" onChange={handleInputChangeModificar} name="es_admin" title="Cuenta para usuario" />
                                        <p id="pUsuario-AdministrarUsuarios" for="inlineRadio2">Usuario</p>
                                    </div>

                                </div>

                            </div>
                            <div class="modal-footer">

                                <button type="button" id="botonModalCancelar-AdministrarUsuarios" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa a administrar usuarios">Cancelar</button>
                                <button type="submit" id="botonModalModificar-AdministrarUsuarios" class="btn btn-primary" data-bs-dismiss="modal" title="Modificar usuario">Modificar</button>

                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    );
}

export default AdministrarUsuarios;