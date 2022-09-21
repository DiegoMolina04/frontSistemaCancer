import '../css/Buscar.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'
import { Link } from "react-router-dom";

function Buscar() {

    return ( 

        <div id="fondo-Buscar">

            <div id="cabeceraBuscarBoton-Buscar">

                <div id="cajaLabelBuscar-Buscar">
                    <label>Palabra buscada ""</label>
                </div>
                
                {/* 
                <div id="cajaAgregarTermino-Buscar">
                    
                    
                    <label id="labelAgregarTermino-Buscar">
                        ¿Desea agregar un termino?
                    </label>

                    
                    <button id="agregarTermino-Buscar" type="button" className="btn btn-success" title="Agregar un nuevo termino" data-bs-toggle="modal" data-bs-target="#modalAgregarTermino-Buscar">
                        <i class="fas fa-plus-circle"></i>
                         Agregar Termino
                    </button>

                    */}
                    
                    {/*Modal para el botón de Agregar Termino

                    <div class="modal fade" id="modalAgregarTermino-Buscar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

                        <div class="modal-dialog">
                            <div class="modal-content">

                                <div class="modal-header">


                                    <h5 class="modal-title" id="modalLabelAgregarTermino-Buscar">

                                        <i class="fas fa-plus-circle"></i>
                                        <label >Agregar Nuevo Termino</label>

                                    </h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" title="Regresa el diciconario de terminos"></button>
                                </div>

                                <div class="modal-body">

                                    {/*Sección Termino*

                                    <div id="labelTerminoAgregarTermino-Buscar">

                                        <label>Termino</label>

                                    </div>
                                    
                                    <div className="input-group">
                                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-font"></i></div>
                                        <input id="" type="text" className="form-control" placeholder="Ingrese el termino" title="Nuevo termino" />
                                    </div>

                                    <br />

                                    {/*Sección Descripción*

                                    <div id="labelDescripcionAgregarTermino-Buscar">
                                        <label>Descripción</label>
                                    </div>
                                    
                                    <div className="input-group">
                                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-book"></i></div>
                                        
                                        <textarea class="form-control" id="floatingTextarea" placeholder="Ingrese la descripción" title="Nueva descripción"></textarea>
                                        
                                        
                                    </div>

                                    <br />

                                </div>
                                <div class="modal-footer">

                                  <button type="button" id="botonModalCancelar-Buscar" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa al Buscar de terminos">Cancelar</button>
                                  <button type="button" id="botonModalModificar-Buscar" class="btn btn-primary" title="Agregar termino">Agregar</button>

                                </div>
                            </div>
                        </div>
                    </div>
                    

                </div>
                */}

            </div>

            <div id="cajaTabla-Buscar">
                <table id="tabla-Buscar" class="table table-bordered">
                    
                    <thead> {/*Cabeceras*/}
                        <tr>
                            <th id="idTablaCabecera-Buscar" scope="col" title="Identificador del termino">ID</th>
                            <th id="palabraTablaCabecera-Buscar" scope="col" title="Nombre del termino">Expresión encontrada</th>
                            <th id="descripcionTablaCabecera-Buscar" scope="col" title="Descripción del termino">Descripción / Clasificación</th>

                            {/*Columna para agregar o elimina*/}
                            <th id="modificarEliminarTablaCabecera-Buscar" scope="col" title="Descripción del termino">Modificar/Eliminar</th>
                          </tr>
                    </thead>
                    <tbody> {/*Filas*/}
                        <tr>
                            <th id="idTablaFila-Buscar" scope="row">1</th>
                            <td id="palabraTablaFila-Buscar">Cancer de piel</td>
                            <td id="descripcionTablaFila-Buscar">El cáncer de piel —el crecimiento anormal de las células de la piel— se suele desarrollar en la piel expuesta al sol. Pero esta forma frecuente de cáncer también puede ocurrir en zonas de piel que normalmente no están expuestas a la luz solar.</td>

                            {/*Fila para los botones modificar o eliminar regla*/}
                            <td id="modificarEliminarTablaFila-Buscar">

                                <button id="botonModificar-Buscar" type="button" class="btn btn-success" title="Modificar" data-bs-toggle="modal" data-bs-target="#modalModificar-Buscar">
                                    <i id="iconoModificar-Buscar" class="fas fa-cog"></i>
                                </button>
                                
                                <button id="botonEliminar-Buscar" type="button" class="btn btn-success" title="Eliminar" data-bs-toggle="modal" data-bs-target="#modalEliminar-Buscar">
                                    <i id="iconoEliminar-Buscar" class="fas fa-times-circle"></i>
                                </button>

                            </td>
                        </tr>

                        <tr>
                            <th id="idTablaFila-Buscar" scope="row">2</th>
                            <td id="palabraTablaFila-Buscar">¿Un lunar existente ha cambiado de forma?</td>
                            <td id="descripcionTablaFila-Buscar">Síntoma</td>

                            {/*Fila para los botones modificar o eliminar regla*/}
                            <td id="modificarEliminarTablaFila-Buscar">

                                <button id="botonModificar-Buscar" type="button" class="btn btn-success" title="Modificar" data-bs-toggle="modal" data-bs-target="#modalModificar-Buscar">
                                    <i id="iconoModificar-Buscar" class="fas fa-cog"></i>
                                </button>
                                
                                <button id="botonEliminar-Buscar" type="button" class="btn btn-success" title="Eliminar" data-bs-toggle="modal" data-bs-target="#modalEliminar-Buscar">
                                    <i id="iconoEliminar-Buscar" class="fas fa-times-circle"></i>
                                </button>
                                

                            </td>
                        </tr>

                        <tr>
                            <th id="idTablaFila-Buscar" scope="row">3</th>
                            <td id="palabraTablaFila-Buscar">Carcinoma basocelular</td>
                            <td id="descripcionTablaFila-Buscar">Las células basales producen nuevas células de la piel a medida que las anteriores mueren. Limitar la exposición al sol puede prevenir que estas células se tornen cancerosas.Este tipo de cáncer generalmente se manifiesta como una protuberancia cerosa blanquecina o un área escamosa amarronada en las zonas que se exponen al sol, como el rostro y el cuello.</td>

                            {/*Fila para los botones modificar o eliminar regla*/}
                            <td id="modificarEliminarTablaFila-Buscar">

                                <button id="botonModificar-Buscar" type="button" class="btn btn-success" title="Modificar" data-bs-toggle="modal" data-bs-target="#modalModificar-Buscar">
                                    <i id="iconoModificar-Buscar" class="fas fa-cog"></i>
                                </button>
                                
                                <button id="botonEliminar-Buscar" type="button" class="btn btn-success" title="Eliminar" data-bs-toggle="modal" data-bs-target="#modalEliminar-Buscar">
                                    <i id="iconoEliminar-Buscar" class="fas fa-times-circle"></i>
                                </button>

                            </td>
                        </tr>

                        <tr>
                            <th id="idTablaFila-Buscar" scope="row">4</th>
                            <td id="palabraTablaFila-Buscar">Carcinoma espinocelular</td>
                            <td id="descripcionTablaFila-Buscar">Las células escamosas (queratinocitos) son las principales células estructurales de la epidermis (la capa externa de la piel). El carcinoma de células escamosas es un cáncer de estas células. En Estados Unidos, más de un millón de personas son diagnosticadas anualmente de carcinoma de células escamosas y 2500 mueren a causa de este tipo de cáncer.El carcinoma de células escamosas, el segundo tipo de cáncer de piel más frecuente después del carcinoma de células basales, generalmente se desarrolla en áreas expuestas al sol, pero puede crecer en cualquier parte de la piel o en la boca, donde la exposición al sol es mínima. Sin embargo, las personas cuya piel ha sufrido mayor exposición solar corren un riesgo más alto de desarrollar cáncer de piel de células escamosas. Las personas de piel clara son mucho más susceptibles al carcinoma de células escamosas que las personas de piel más oscura.</td>

                            {/*Fila para los botones modificar o eliminar regla*/}
                            <td id="modificarEliminarTablaFila-Buscar">

                                <button id="botonModificar-Buscar" type="button" class="btn btn-success" title="Modificar" data-bs-toggle="modal" data-bs-target="#modalModificar-Buscar">
                                    <i id="iconoModificar-Buscar" class="fas fa-cog"></i>
                                </button>
                                
                                <button id="botonEliminar-Buscar" type="button" class="btn btn-success" title="Eliminar" data-bs-toggle="modal" data-bs-target="#modalEliminar-Buscar">
                                    <i id="iconoEliminar-Buscar" class="fas fa-times-circle"></i>
                                </button>

                            </td>
                        </tr>

                        {/*Modal para el botón de Eliminar Termino*/}
                        <div class="modal fade" id="modalEliminar-Buscar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">

                                  <h5 class="modal-title" id="modalLabelEliminar-Buscar">

                                    <i class="fas fa-exclamation-triangle"></i>
                                    <label >Advertencia</label>

                                  </h5>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" title="Regresa el diciconario de terminos"></button>
                                </div>
                                <div class="modal-body">
                                  
                                    <label>¿Realmente quiere eliminar este termino/sintoma?</label>
                                    <label id="labelRevertirCambios-Buscar">Los cambios no se podrán revertir.</label>

                                </div>
                                <div class="modal-footer">

                                  <button type="button" id="botonModalCancelar-Buscar" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa al Buscar de terminos">Cancelar</button>
                                  <button type="button" id="botonModalEliminar-Buscar" class="btn btn-primary" title="Eliminar termino">Eliminar</button>

                                </div>
                              </div>
                            </div>
                        </div>

                        
                        {/*Modal para el botón de Modificar Termino*/}
                        <div class="modal fade" id="modalModificar-Buscar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">

                                  <h5 class="modal-title" id="modalLabelModificar-Buscar">

                                    <i class="fas fa-cog"></i>
                                    <label >Modificar expresión encontrada</label>

                                  </h5>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" title="Regresa el diciconario de terminos"></button>
                                </div>
                                <div class="modal-body">

                                    {/*Sección Termino*/}
                                    <label>Expresión encontrada</label>
                                    
                                    <div className="input-group">
                                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-font"></i></div>
                                        <input id="" type="text" className="form-control" placeholder="Ingrese la nueva expresión" title="Termino actual" />
                                    </div>

                                    <br />

                                    {/*Sección Descripción*/}
                                    <label>Descripción / Clasificación</label>
                                    
                                    <div className="input-group">
                                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-book"></i></div>
                                        
                                        <textarea class="form-control" id="floatingTextarea" placeholder="Ingrese la nueva descripción / clasificación" title="Descripción actual"></textarea>
                                        
                                        
                                    </div>

                                    <br />

                                </div>
                                <div class="modal-footer">

                                  <button type="button" id="botonModalCancelar-Buscar" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa al Buscar de terminos">Cancelar</button>
                                  <button type="button" id="botonModalModificar-Buscar" class="btn btn-primary" title="Modificar termino">Modificar</button>

                                </div>
                              </div>
                            </div>
                        </div>

                        {/*Modal para el botón de Modificar Sintoma*/}
                        <div class="modal fade" id="modalModificar-" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">

                                  <h5 class="modal-title" id="modalLabelModificar-Reglas">

                                    <i class="fas fa-cog"></i>
                                    <label >Modificar síntoma</label>

                                  </h5>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" title="Regresa a la tabla de síntomas"></button>
                                </div>
                                <div class="modal-body">

                                   {/*Sección Sintoma*/}
                                   <label>Síntoma</label>
                                    
                                    <div className="input-group">
                                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-book"></i></div>
                                        
                                        <textarea class="form-control" id="floatingTextarea" placeholder="Ingrese el nuevo síntoma" title="Síntoma actual"></textarea>
                                        
                                        
                                    </div>

                                    <br />

                                     {/*Sección Sintoma*/}
                                     <label>Clasificación</label>
                                    
                                    {/*<div className="input-group">
                                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-font"></i></div>
                                        <input id="" type="text" className="form-control" placeholder="Ingrese el nuevo síntoma" title="Síntoma actual" />
                                    </div>*/}

                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="radioButton" value="option1" title="Es una señal"/>
                                        <p id="labelSeñalModalModificar-Reglas" for="inlineRadio1">Señal</p>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="radioButton" value="option2" title="Es un sintoma"/>
                                        <p id="labelSintomaModalModificar-Reglas" for="inlineRadio2">Síntoma</p>
                                    </div>

                                    <br />

                                </div>
                                <div class="modal-footer">

                                  <button type="button" id="botonModalCancelar-Reglas" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa a la tabla de síntomas">Cancelar</button>
                                  <button type="button" id="botonModalModificar-Reglas" class="btn btn-primary" title="Modificar síntoma">Modificar</button>

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

export default Buscar;