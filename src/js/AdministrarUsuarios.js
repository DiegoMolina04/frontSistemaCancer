import '../css/AdministrarUsuarios.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'
import { Link } from "react-router-dom";

function AdministrarUsuarios() {

    return ( 

        <div id="fondo-AdministrarUsuarios">

            <div id="cabeceraTerminosBoton-AdministrarUsuarios">

                <div id="cajaLabelTerminos-AdministrarUsuarios">
                    <label>Administrar Usuarios</label>
                </div>
                

                <div id="cajaAgregarTermino-AdministrarUsuarios">
                    
                    <label id="labelAgregarTermino-AdministrarUsuarios">
                        ¿Desea agregar un nuevo usuario?
                    </label>

                    
                    <button id="agregarTermino-AdministrarUsuarios" type="button" className="btn btn-success" title="Agregar un nuevo termino" data-bs-toggle="modal" data-bs-target="#modalAgregarTermino-AdministrarUsuarios">
                        <i class="fas fa-plus-circle"></i>
                         Agregar Usuario
                    </button>


                    {/*Modal para el botón de Agregar Termino*/}

                    <div class="modal fade" id="modalAgregarTermino-AdministrarUsuarios" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

                        <div class="modal-dialog">
                            <div class="modal-content">

                                <div class="modal-header">


                                    <h5 class="modal-title" id="modalLabelAgregarTermino-AdministrarUsuarios">

                                        <i class="fas fa-plus-circle"></i>
                                        <label >Agregar Nuevo Usuario</label>

                                    </h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" title="Regresa el diciconario de terminos"></button>
                                </div>

                                <div class="modal-body">

                                    {/*Sección Termino*/}

                                    <div id="labelTerminoAgregarTermino-AdministrarUsuarios">

                                        <label>Nombre Usuario</label>

                                    </div>
                                    
                                    <div className="input-group">
                                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-font"></i></div>
                                        <input id="" type="text" className="form-control" placeholder="Ingrese el nombre de usuario completo" title="Nuevo usuario" />
                                    </div>

                                    <br />

                                    {/*Sección Descripción*/}

                                    <div id="labelcorreoAgregarTermino-AdministrarUsuarios">
                                        <label>Correo</label>
                                    </div>
                                    
                                    <div className="input-group">
                                        
                                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-envelope"></i></div>
                                        
                                        <input id="" type="email" className="form-control" placeholder="Ingrese el correo" title="Nuevo correo" />
                                        
                                        
                                    </div>

                                    <br />

                                    <label id="tipoCuenta-AgregarCuenta">Tipo de cuenta</label>

                                    <div id="cajaRadioButtons-AgregarCuenta">
                                
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="radioButtonAdministrador-AdministrarUsuarios" value="true" title="Cuenta para administrador"/>
                                            <p id="pAdministrador-AdministrarUsuarios" for="inlineRadio1">Administrador</p>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="radioButtonAdministrador-AdministrarUsuarios" value="option2" title="Cuenta para usuario"/>
                                            <p id="pUsuario-AdministrarUsuarios" for="inlineRadio2">Usuario</p>
                                        </div>

                                    </div>

                                </div>
                                <div class="modal-footer">

                                  <button type="button" id="botonModalCancelar-AdministrarUsuarios" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa al AdministrarUsuarios de terminos">Cancelar</button>
                                  <button type="button" id="botonModalModificar-AdministrarUsuarios" class="btn btn-primary" title="Agregar termino">Agregar</button>

                                </div>
                            </div>
                        </div>
                    </div>
                    

                </div>

            </div>

           
            
            <div id="cajaTabla-AdministrarUsuarios">
                <table id="tabla-AdministrarUsuarios" class="table table-bordered">
                    
                    <thead> {/*Cabeceras*/}
                        <tr>
                            <th id="idTablaCabecera-AdministrarUsuarios" scope="col" title="Identificador del termino">ID</th>
                            <th id="nombreUsuarioTablaCabecera-AdministrarUsuarios" scope="col" title="Nombre del termino">Nombre Usuario</th>
                            <th id="correoTablaCabecera-AdministrarUsuarios" scope="col" title="Descripción del termino">Correo</th>
                            <th id="rolTablaCabecera-AdministrarUsuarios" scope="col" title="Descripción del termino">Tipo De Cuenta</th>

                            {/*Columna para agregar o elimina*/}
                            <th id="modificarEliminarTablaCabecera-AdministrarUsuarios" scope="col" title="Descripción del termino">Modificar/Eliminar</th>
                          </tr>
                    </thead>
                    <tbody> {/*Filas*/}
                        <tr>
                            <th id="idTablaFila-AdministrarUsuarios" scope="row">1</th>
                            <td id="nombreUsuarioTablaFila-AdministrarUsuarios">Diego Andres Molina Romero</td>
                            <td id="correoTablaFila-AdministrarUsuarios">dmolinarome@uniminuto.edu.co</td>
                            <td id="rolTablaFila-AdministrarUsuarios">Administrador</td>
                            {/*Fila para los botones modificar o eliminar regla*/}
                            <td id="modificarEliminarTablaFila-AdministrarUsuarios">

                                <button id="botonModificar-AdministrarUsuarios" type="button" class="btn btn-success" title="Modificar termino" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarUsuarios">
                                    <i id="iconoModificar-AdministrarUsuarios" class="fas fa-cog"></i>
                                </button>
                                
                                <button id="botonEliminar-AdministrarUsuarios" type="button" class="btn btn-success" title="Eliminar termino" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarUsuarios">
                                    <i id="iconoEliminar-AdministrarUsuarios" class="fas fa-times-circle"></i>
                                </button>

                            </td>
                        </tr>

                        <tr>
                            <th id="idTablaFila-AdministrarUsuarios" scope="row">2</th>
                            <td id="nombreUsuarioTablaFila-AdministrarUsuarios">Alejandro Zapata Molina</td>
                            <td id="correoTablaFila-AdministrarUsuarios">azapatamoli@uniminuto.edu.co</td>
                            <td id="rolTablaFila-AdministrarUsuarios">Administrador</td>
                            {/*Fila para los botones modificar o eliminar regla*/}
                            <td id="modificarEliminarTablaFila-AdministrarUsuarios">

                                <button id="botonModificar-AdministrarUsuarios" type="button" class="btn btn-success" title="Modificar termino" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarUsuarios">
                                    <i id="iconoModificar-AdministrarUsuarios" class="fas fa-cog"></i>
                                </button>
                                
                                <button id="botonEliminar-AdministrarUsuarios" type="button" class="btn btn-success" title="Eliminar termino" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarUsuarios">
                                    <i id="iconoEliminar-AdministrarUsuarios" class="fas fa-times-circle"></i>
                                </button>
                                

                            </td>
                        </tr>

                        <tr>
                            <th id="idTablaFila-AdministrarUsuarios" scope="row">3</th>
                            <td id="nombreUsuarioTablaFila-AdministrarUsuarios">Juan Carlos Velez</td>
                            <td id="correoTablaFila-AdministrarUsuarios">correodeprueba@gmail.com</td>
                            <td id="rolTablaFila-AdministrarUsuarios">Usuario</td>
                            {/*Fila para los botones modificar o eliminar regla*/}
                            <td id="modificarEliminarTablaFila-AdministrarUsuarios">

                                <button id="botonModificar-AdministrarUsuarios" type="button" class="btn btn-success" title="Modificar termino" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarUsuarios">
                                    <i id="iconoModificar-AdministrarUsuarios" class="fas fa-cog"></i>
                                </button>
                                
                                <button id="botonEliminar-AdministrarUsuarios" type="button" class="btn btn-success" title="Eliminar termino" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarUsuarios">
                                    <i id="iconoEliminar-AdministrarUsuarios" class="fas fa-times-circle"></i>
                                </button>

                            </td>
                        </tr>

                        <tr>
                            <th id="idTablaFila-AdministrarUsuarios" scope="row">4</th>
                            <td id="nombreUsuarioTablaFila-AdministrarUsuarios">Estefania Rincon Tensa</td>
                            <td id="correoTablaFila-AdministrarUsuarios">estepuedeseruncorreodeprueba @hotmail.com</td>
                            <td id="rolTablaFila-AdministrarUsuarios">Usuario</td>
                            {/*Fila para los botones modificar o eliminar regla*/}
                            <td id="modificarEliminarTablaFila-AdministrarUsuarios">

                                <button id="botonModificar-AdministrarUsuarios" type="button" class="btn btn-success" title="Modificar termino" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarUsuarios">
                                    <i id="iconoModificar-AdministrarUsuarios" class="fas fa-cog"></i>
                                </button>
                                
                                <button id="botonEliminar-AdministrarUsuarios" type="button" class="btn btn-success" title="Eliminar termino" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarUsuarios">
                                    <i id="iconoEliminar-AdministrarUsuarios" class="fas fa-times-circle"></i>
                                </button>

                            </td>
                        </tr>

                        {/*Modal para el botón de Eliminar Termino*/}
                        <div class="modal fade" id="modalEliminar-AdministrarUsuarios" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">

                                  <h5 class="modal-title" id="modalLabelEliminar-AdministrarUsuarios">

                                    <i class="fas fa-exclamation-triangle"></i>
                                    <label >Advertencia</label>

                                  </h5>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" title="Regresa el diciconario de terminos"></button>
                                </div>
                                <div class="modal-body">
                                  
                                    <label>¿Realmente quiere eliminar esta cuenta?</label>
                                    <label id="labelRevertirCambios-AdministrarUsuarios">Los cambios no se podrán revertir.</label>

                                </div>
                                <div class="modal-footer">

                                  <button type="button" id="botonModalCancelar-AdministrarUsuarios" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa a administrar usuarios">Cancelar</button>
                                  <button type="button" id="botonModalEliminar-AdministrarUsuarios" class="btn btn-primary" title="Eliminar cuenta">Eliminar</button>

                                </div>
                              </div>
                            </div>
                        </div>

                        
                        {/*Modal para el botón de Modificar Termino*/}
                        <div class="modal fade" id="modalModificar-AdministrarUsuarios" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">

                                  <h5 class="modal-title" id="modalLabelModificar-AdministrarUsuarios">

                                    <i class="fas fa-cog"></i>
                                    <label >Modificar Termino</label>

                                  </h5>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" title="Regresar a administrar usuarios"></button>
                                </div>
                                <div class="modal-body">

                                    {/*Sección Termino*/}
                                    <label>Termino</label>
                                    
                                    <div className="input-group">
                                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-font"></i></div>
                                        <input id="" type="text" className="form-control" placeholder="Ingrese el nuevo termino" title="Termino actual" />
                                    </div>

                                    <br />

                                    {/*Sección Descripción*/}
                                    <label>Descripción</label>
                                    
                                    <div className="input-group">
                                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-book"></i></div>
                                        
                                        <textarea class="form-control" id="floatingTextarea" placeholder="Ingrese la nueva descripción" title="Descripción actual"></textarea>
                                        
                                        
                                    </div>

                                    <br />

                                </div>
                                <div class="modal-footer">

                                  <button type="button" id="botonModalCancelar-AdministrarUsuarios" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa al AdministrarUsuarios de terminos">Cancelar</button>
                                  <button type="button" id="botonModalModificar-AdministrarUsuarios" class="btn btn-primary" title="Modificar termino">Modificar</button>

                                </div>
                              </div>
                            </div>
                        </div>

                    </tbody>
                  </table>                  
            </div>

        </div>
    );
}

export default AdministrarUsuarios;