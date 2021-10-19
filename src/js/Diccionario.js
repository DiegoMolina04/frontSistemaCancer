import '../css/Diccionario.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'

function Diccionario() {

    return ( 

        <div id="fondo-Diccionario">

            <div id="cabeceraTerminosBoton-Diccionario">

                <div id="cajaLabelTerminos-Diccionario">
                    <label>Terminos</label>
                </div>
                

                <div id="cajaAgregarTermino-Diccionario">
                    
                    <label>
                        ¿Desea agregar un termino?
                    </label>

                    <button id="agregarTermino-Diccionario" type="button" className="btn btn-success" title="Agregar un nuevo termino" >
                        <i class="fas fa-plus-circle"></i>
                         Agregar Termino
                    </button>

                </div>

            </div>

           
            
            <div id="cajaTabla-Diccionario">
                <table id="tabla-Diccionario" class="table table-bordered">
                    
                    <thead> {/*Cabeceras*/}
                        <tr>
                            <th id="idTablaCabecera-Diccionario" scope="col" title="Identificador del termino">ID</th>
                            <th id="palabraTablaCabecera-Diccionario" scope="col" title="Nombre del termino">Termino</th>
                            <th id="descripcionTablaCabecera-Diccionario" scope="col" title="Descripción del termino">Descripción</th>

                            {/*Columna para agregar o elimina*/}
                            <th id="modificarEliminarTablaCabecera-Diccionario" scope="col" title="Descripción del termino">Modificar/Eliminar</th>
                          </tr>
                    </thead>
                    <tbody> {/*Filas*/}
                        <tr>
                            <th id="idTablaFila-Diccionario" scope="row">1</th>
                            <td id="palabraTablaFila-Diccionario">Cancer de piel</td>
                            <td id="descripcionTablaFila-Diccionario">El cáncer de piel —el crecimiento anormal de las células de la piel— se suele desarrollar en la piel expuesta al sol. Pero esta forma frecuente de cáncer también puede ocurrir en zonas de piel que normalmente no están expuestas a la luz solar.</td>

                            {/*Fila para los botones modificar o eliminar regla*/}
                            <td id="modificarEliminarTablaFila-Diccionario">

                                <button id="botonModificar-Diccionario" type="button" class="btn btn-success" title="Modificar termino" data-bs-toggle="modal" data-bs-target="#modalModificar-Diccionario">
                                    <i id="iconoModificar-Diccionario" class="fas fa-cog"></i>
                                </button>
                                
                                <button id="botonEliminar-Diccionario" type="button" class="btn btn-success" title="Eliminar regla" data-bs-toggle="modal" data-bs-target="#modalEliminar-Diccionario">
                                    <i id="iconoEliminar-Diccionario" class="fas fa-times-circle"></i>
                                </button>

                            </td>
                        </tr>

                        <tr>
                            <th id="idTablaFila-Diccionario" scope="row">2</th>
                            <td id="palabraTablaFila-Diccionario">Melanoma</td>
                            <td id="descripcionTablaFila-Diccionario">El melanoma ocurre cuando las células productoras de pigmento que dan color a la piel se vuelven cancerosas.Los síntomas incluyen neoplasias inusuales y nuevas, o cambios en un lunar ya existente. Los melanomas pueden aparecer en cualquier lugar del cuerpo.</td>

                            {/*Fila para los botones modificar o eliminar regla*/}
                            <td id="modificarEliminarTablaFila-Diccionario">

                                <button id="botonModificar-Diccionario" type="button" class="btn btn-success" title="Modificar termino" data-bs-toggle="modal" data-bs-target="#modalModificar-Diccionario">
                                    <i id="iconoModificar-Diccionario" class="fas fa-cog"></i>
                                </button>
                                
                                <button id="botonEliminar-Diccionario" type="button" class="btn btn-success" title="Eliminar regla" data-bs-toggle="modal" data-bs-target="#modalEliminar-Diccionario">
                                    <i id="iconoEliminar-Diccionario" class="fas fa-times-circle"></i>
                                </button>
                                

                            </td>
                        </tr>

                        <tr>
                            <th id="idTablaFila-Diccionario" scope="row">3</th>
                            <td id="palabraTablaFila-Diccionario">Carcinoma basocelular</td>
                            <td id="descripcionTablaFila-Diccionario">Las células basales producen nuevas células de la piel a medida que las anteriores mueren. Limitar la exposición al sol puede prevenir que estas células se tornen cancerosas.Este tipo de cáncer generalmente se manifiesta como una protuberancia cerosa blanquecina o un área escamosa amarronada en las zonas que se exponen al sol, como el rostro y el cuello.</td>

                            {/*Fila para los botones modificar o eliminar regla*/}
                            <td id="modificarEliminarTablaFila-Diccionario">

                                <button id="botonModificar-Diccionario" type="button" class="btn btn-success" title="Modificar termino" data-bs-toggle="modal" data-bs-target="#modalModificar-Diccionario">
                                    <i id="iconoModificar-Diccionario" class="fas fa-cog"></i>
                                </button>
                                
                                <button id="botonEliminar-Diccionario" type="button" class="btn btn-success" title="Eliminar regla" data-bs-toggle="modal" data-bs-target="#modalEliminar-Diccionario">
                                    <i id="iconoEliminar-Diccionario" class="fas fa-times-circle"></i>
                                </button>

                            </td>
                        </tr>

                        <tr>
                            <th id="idTablaFila-Diccionario" scope="row">4</th>
                            <td id="palabraTablaFila-Diccionario">Carcinoma espinocelular</td>
                            <td id="descripcionTablaFila-Diccionario">Las células escamosas (queratinocitos) son las principales células estructurales de la epidermis (la capa externa de la piel). El carcinoma de células escamosas es un cáncer de estas células. En Estados Unidos, más de un millón de personas son diagnosticadas anualmente de carcinoma de células escamosas y 2500 mueren a causa de este tipo de cáncer.El carcinoma de células escamosas, el segundo tipo de cáncer de piel más frecuente después del carcinoma de células basales, generalmente se desarrolla en áreas expuestas al sol, pero puede crecer en cualquier parte de la piel o en la boca, donde la exposición al sol es mínima. Sin embargo, las personas cuya piel ha sufrido mayor exposición solar corren un riesgo más alto de desarrollar cáncer de piel de células escamosas. Las personas de piel clara son mucho más susceptibles al carcinoma de células escamosas que las personas de piel más oscura.</td>

                            {/*Fila para los botones modificar o eliminar regla*/}
                            <td id="modificarEliminarTablaFila-Diccionario">

                                <button id="botonModificar-Diccionario" type="button" class="btn btn-success" title="Modificar termino" data-bs-toggle="modal" data-bs-target="#modalModificar-Diccionario">
                                    <i id="iconoModificar-Diccionario" class="fas fa-cog"></i>
                                </button>
                                
                                <button id="botonEliminar-Diccionario" type="button" class="btn btn-success" title="Eliminar regla" data-bs-toggle="modal" data-bs-target="#modalEliminar-Diccionario">
                                    <i id="iconoEliminar-Diccionario" class="fas fa-times-circle"></i>
                                </button>

                            </td>
                        </tr>

                        {/*Modal para el botón de Eliminar Termino*/}
                        <div class="modal fade" id="modalEliminar-Diccionario" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">

                                  <h5 class="modal-title" id="modalLabelEliminar-Diccionario">

                                    <i class="fas fa-exclamation-triangle"></i>
                                    <label >Advertencia</label>

                                  </h5>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" title="Regresa el diciconario de terminos"></button>
                                </div>
                                <div class="modal-body">
                                  
                                    <label>¿Realmente quiere eliminar este termino?</label>
                                    <label id="labelRevertirCambios-Diccionario">Los cambios no se podrán revertir.</label>

                                </div>
                                <div class="modal-footer">

                                  <button type="button" id="botonModalCancelar-Diccionario" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa al diccionario de terminos">Cancelar</button>
                                  <button type="button" id="botonModalEliminar-Diccionario" class="btn btn-primary" title="Eliminar termino">Eliminar</button>

                                </div>
                              </div>
                            </div>
                        </div>

                        
                        {/*Modal para el botón de Modificar Termino*/}
                        <div class="modal fade" id="modalModificar-Diccionario" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">

                                  <h5 class="modal-title" id="modalLabelModificar-Diccionario">

                                    <i class="fas fa-cog"></i>
                                    <label >Modificar Termino</label>

                                  </h5>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" title="Regresa el diciconario de terminos"></button>
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

                                  <button type="button" id="botonModalCancelar-Diccionario" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa al diccionario de terminos">Cancelar</button>
                                  <button type="button" id="botonModalModificar-Diccionario" class="btn btn-primary" title="Modificar termino">Modificar</button>

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

export default Diccionario;