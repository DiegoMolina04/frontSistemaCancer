import '../css/Reglas.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'
import { Link } from "react-router-dom";

function Reglas() {

    return ( 

        <div id="fondo-Reglas">

            <div id="cabeceraSintomasBoton-Reglas">

                <div id="cajaLabelSintoma-Reglas">
                    <label>Sintomas</label>
                </div>
                

                <div id="cajaAgregarSintoma-Reglas">
                    
                    <label id="labelAgregarSintoma-Reglas">
                        ¿Desea agregar un nuevo sintoma?
                    </label>

                    
                    <button id="agregarSintoma-Reglas" type="button" className="btn btn-success" title="Agregar un nuevo sintoma" data-bs-toggle="modal" data-bs-target="#modalAgregarSintoma-Reglas">
                        <i class="fas fa-plus-circle"></i>
                         Agregar Sintoma
                    </button>


                    {/*Modal para el botón de Agregar Sintoma*/}

                    <div class="modal fade" id="modalAgregarSintoma-Reglas" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

                        <div class="modal-dialog">
                            <div class="modal-content">

                                <div class="modal-header">


                                    <h5 class="modal-title" id="modalLabelAgregarSintoma-Reglas">

                                        <i class="fas fa-plus-circle"></i>
                                        <label >Agregar Nuevo Sintoma</label>

                                    </h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" title="Regresa el diccionario de sintomas"></button>
                                </div>

                                <div class="modal-body">

                                    {/*Sección Sintoma*/}

                                    
                                    <div id="labelDescripcionAgregarSintoma-Reglas">
                                        <label>Sintoma</label>
                                    </div>
                                    
                                    <div className="input-group">
                                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-book"></i></div>
                                        
                                        <textarea class="form-control" id="floatingTextarea" placeholder="Ingrese el sintoma" title="Nuevo sintoma"></textarea>
                                        
                                        
                                    </div>

                                    <br />

                                    {/*Sección Descripción*/}


                                    <div id="labelSintomaAgregarSintoma-Reglas">

                                        <label>Clasificación</label>

                                    </div>
                                    
                                    <div className="input-group">
                                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-font"></i></div>
                                        <input id="" type="text" className="form-control" placeholder="Ingrese la clasificación" title="Nuevo clasificación" />
                                    </div>

                                    <br />

                                </div>
                                <div class="modal-footer">

                                  <button type="button" id="botonModalCancelar-Reglas" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa a la tabla de sintomas">Cancelar</button>
                                  <button type="button" id="botonModalModificar-Reglas" class="btn btn-primary" title="Modificar sintoma">Modificar</button>

                                </div>
                            </div>
                        </div>
                    </div>
                    

                </div>

            </div>

           
            
            <div id="cajaTabla-Reglas">
                <table id="tabla-Reglas" class="table table-bordered">
                    
                    <thead> {/*Cabeceras*/}
                        <tr>
                            <th id="idTablaCabecera-Reglas" scope="col" title="Identificador del sintoma">ID</th>
                            <th id="sintomaTablaCabecera-Reglas" scope="col" title="Pregunta del sintoma">Sintoma</th>
                            <th id="clasificacionTablaCabecera-Reglas" scope="col" title="Clasificación de la acción a tomar">Clasificación</th>

                            {/*Columna para agregar o elimina*/}
                            <th id="modificarEliminarTablaCabecera-Reglas" scope="col" title="Descripción del sintoma">Modificar/Eliminar</th>
                          </tr>
                    </thead>
                    <tbody> {/*Filas*/}
                        <tr>
                            <th id="idTablaFila-Reglas" scope="row">1</th>
                            <td id="sintomaTablaFila-Reglas">¿Apareció un nuevo lunar en la piel?</td>
                            <td id="clasificacionTablaFila-Reglas">Señal</td>

                            {/*Fila para los botones modificar o eliminar regla*/}
                            <td id="modificarEliminarTablaFila-Reglas">

                                <button id="botonModificar-Reglas" type="button" class="btn btn-success" title="Modificar sintoma" data-bs-toggle="modal" data-bs-target="#modalModificar-Reglas">
                                    <i id="iconoModificar-Reglas" class="fas fa-cog"></i>
                                </button>
                                
                                <button id="botonEliminar-Reglas" type="button" class="btn btn-success" title="Eliminar sintoma" data-bs-toggle="modal" data-bs-target="#modalEliminar-Reglas">
                                    <i id="iconoEliminar-Reglas" class="fas fa-times-circle"></i>
                                </button>

                            </td>
                        </tr>

                        <tr>
                            <th id="idTablaFila-Reglas" scope="row">2</th>
                            <td id="sintomaTablaFila-Reglas">¿Un lunar existente ha cambiado de forma?</td>
                            <td id="clasificacionTablaFila-Reglas">Sintoma</td>

                            {/*Fila para los botones modificar o eliminar regla*/}
                            <td id="modificarEliminarTablaFila-Reglas">

                                <button id="botonModificar-Reglas" type="button" class="btn btn-success" title="Modificar sintoma" data-bs-toggle="modal" data-bs-target="#modalModificar-Reglas">
                                    <i id="iconoModificar-Reglas" class="fas fa-cog"></i>
                                </button>
                                
                                <button id="botonEliminar-Reglas" type="button" class="btn btn-success" title="Eliminar sintoma" data-bs-toggle="modal" data-bs-target="#modalEliminar-Reglas">
                                    <i id="iconoEliminar-Reglas" class="fas fa-times-circle"></i>
                                </button>
                                

                            </td>
                        </tr>

                        <tr>
                            <th id="idTablaFila-Reglas" scope="row">3</th>
                            <td id="sintomaTablaFila-Reglas">¿La mitad de un lunar de nacimiento no es igual a la otra mitad?</td>
                            <td id="clasificacionTablaFila-Reglas">Sintoma</td>

                            {/*Fila para los botones modificar o eliminar regla*/}
                            <td id="modificarEliminarTablaFila-Reglas">

                                <button id="botonModificar-Reglas" type="button" class="btn btn-success" title="Modificar sintoma" data-bs-toggle="modal" data-bs-target="#modalModificar-Reglas">
                                    <i id="iconoModificar-Reglas" class="fas fa-cog"></i>
                                </button>
                                
                                <button id="botonEliminar-Reglas" type="button" class="btn btn-success" title="Eliminar sintoma" data-bs-toggle="modal" data-bs-target="#modalEliminar-Reglas">
                                    <i id="iconoEliminar-Reglas" class="fas fa-times-circle"></i>
                                </button>

                            </td>
                        </tr>

                        <tr>
                            <th id="idTablaFila-Reglas" scope="row">4</th>
                            <td id="sintomaTablaFila-Reglas">¿Los bordes del lunar son irregulares o dentados?</td>
                            <td id="clasificacionTablaFila-Reglas">Sintoma</td>

                            {/*Fila para los botones modificar o eliminar regla*/}
                            <td id="modificarEliminarTablaFila-Reglas">

                                <button id="botonModificar-Reglas" type="button" class="btn btn-success" title="Modificar sintoma" data-bs-toggle="modal" data-bs-target="#modalModificar-Reglas">
                                    <i id="iconoModificar-Reglas" class="fas fa-cog"></i>
                                </button>
                                
                                <button id="botonEliminar-Reglas" type="button" class="btn btn-success" title="Eliminar sintoma" data-bs-toggle="modal" data-bs-target="#modalEliminar-Reglas">
                                    <i id="iconoEliminar-Reglas" class="fas fa-times-circle"></i>
                                </button>

                            </td>
                        </tr>

                        {/*Modal para el botón de Eliminar Sintoma*/}
                        <div class="modal fade" id="modalEliminar-Reglas" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">

                                  <h5 class="modal-title" id="modalLabelEliminar-Reglas">

                                    <i class="fas fa-exclamation-triangle"></i>
                                    <label >Advertencia</label>

                                  </h5>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" title="Regresa el diciconario de sintomas"></button>
                                </div>
                                <div class="modal-body">
                                  
                                    <label>¿Realmente quiere eliminar este sintoma?</label>
                                    <label id="labelRevertirCambios-Reglas">Los cambios no se podrán revertir.</label>

                                </div>
                                <div class="modal-footer">

                                  <button type="button" id="botonModalCancelar-Reglas" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa a la tabla de sintomas">Cancelar</button>
                                  <button type="button" id="botonModalEliminar-Reglas" class="btn btn-primary" title="Eliminar sintoma">Eliminar</button>

                                </div>
                              </div>
                            </div>
                        </div>

                        
                        {/*Modal para el botón de Modificar Sintoma*/}
                        <div class="modal fade" id="modalModificar-Reglas" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">

                                  <h5 class="modal-title" id="modalLabelModificar-Reglas">

                                    <i class="fas fa-cog"></i>
                                    <label >Modificar sintoma</label>

                                  </h5>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" title="Regresa a la tabla de sintomas"></button>
                                </div>
                                <div class="modal-body">

                                   {/*Sección Sintoma*/}
                                   <label>Sintoma</label>
                                    
                                    <div className="input-group">
                                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-book"></i></div>
                                        
                                        <textarea class="form-control" id="floatingTextarea" placeholder="Ingrese la nueva descripción" title="Descripción actual"></textarea>
                                        
                                        
                                    </div>

                                    <br />

                                     {/*Sección Sintoma*/}
                                     <label>Clasificación</label>
                                    
                                    <div className="input-group">
                                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-font"></i></div>
                                        <input id="" type="text" className="form-control" placeholder="Ingrese el nuevo sintoma" title="Sintoma actual" />
                                    </div>

                                    <br />

                                </div>
                                <div class="modal-footer">

                                  <button type="button" id="botonModalCancelar-Reglas" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa al Reglas de sintoma">Cancelar</button>
                                  <button type="button" id="botonModalModificar-Reglas" class="btn btn-primary" title="Modificar sintoma">Modificar</button>

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

export default Reglas;