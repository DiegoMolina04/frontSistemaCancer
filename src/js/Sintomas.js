import '../css/Sintomas.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'
import { Link } from "react-router-dom";

function Reglas() {

    const filtrarPregunta = async (event) => {

    }

    const handleDropdownChangeFiltrar = (event) => { //Para guardar la categoria seleccionada en el filtrar
       
    }

    const handleInputChangeFiltrar = (event) => { //Para guardar los datos ingresados en el filtrar
        
    }

    return ( 

        <div id="fondo-AdministrarSintomas">

            <div id="cabeceraSintomasBoton-AdministrarSintomas">

                <div id="cajaLabelSintoma-AdministrarSintomas">
                    <label>Administrar Síntomas</label>
                </div>
                
                <div id="busqueda">

                    <form id="formato" onSubmit={filtrarPregunta}>

                        <select class="form-select" onChange={handleDropdownChangeFiltrar} name="categoria" title="Seleccione categoria para buscar palabra" >

                            <option selected >Seleccione Categoria...</option> {/*disabled*/}
                            <option value="pregunta">Pregunta</option>
                            {/*<option value="sintoma">Sintoma</option>*/}

                        </select>

                        {/*<input type="text" placeholder="¿Busca algo puntual?" title="Ingrese la palabra a buscar"/>*/}
                        <input id="filtrar" type="text" className="form-control" onChange={handleInputChangeFiltrar} name="inputFiltro" placeholder="¿Busca algo puntual?" title="Ingrese valor a buscar" />

                        {/*<Link to='/plataforma/buscar'></Link>*/}
                        <button id="enviarBuscar-Plataforma" type="submit" className="btn btn-success" title="Buscar" >
                            <i class="fas fa-search"></i>
                        </button>

                    </form>
                </div>

                <div id="cajaAgregarSintoma-AdministrarSintomas">
                    
                    <label id="labelAgregarSintoma-AdministrarSintomas">
                        ¿Desea agregar un nuevo síntoma?
                    </label>

                    
                    <button id="agregarSintoma-AdministrarSintomas" type="button" className="btn btn-success" title="Agregar un nuevo sintoma" data-bs-toggle="modal" data-bs-target="#modalAgregarSintoma-AdministrarSintomas">
                        <i class="fas fa-plus-circle"></i>
                         Agregar Síntoma
                    </button>


                    {/*Modal para el botón de Agregar Sintoma*/}

                    <div class="modal fade" id="modalAgregarSintoma-AdministrarSintomas" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

                        <div class="modal-dialog">
                            <div class="modal-content">

                                <div class="modal-header">


                                    <h5 class="modal-title" id="modalLabelAgregarSintoma-AdministrarSintomas">

                                        <i class="fas fa-plus-circle"></i>
                                        <label >Agregar Nuevo Síntoma</label>

                                    </h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" title="Regresa a la tabla de síntomas"></button>
                                </div>

                                <div class="modal-body">

                                    {/*Sección Sintoma*/}

                                    
                                    <div id="labelDescripcionAgregarSintoma-AdministrarSintomas">
                                        <label>Sintoma</label>
                                    </div>
                                    
                                    <div className="input-group">
                                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-book"></i></div>
                                        
                                        <textarea class="form-control" id="floatingTextarea" placeholder="Ingrese el síntoma" title="Nuevo síntoma"></textarea>
                                        
                                        
                                    </div>

                                    <br />

                                    {/*Sección Descripción*/}


                                    <div id="labelSintomaAgregarSintoma-AdministrarSintomas">

                                        <label>Clasificación</label>

                                    </div>
                                    
                                    <div id="cajaRadioButtonModalAgregar-AdministrarSintomas">

                                    <div class="form-check form-check-inline"> {/**/}
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="radioButton" value="option1" title="Es una señal"/>
                                        <p id="labelSeñalModalAgregar-AdministrarSintomas" for="inlineRadio1">Señal</p>
                                    </div>
                                    <div class="form-check form-check-inline"> {/*form-check-inline*/}
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="radioButton" value="option2" title="Es un síntoma"/>
                                        <p id="labelSintomaModalAgregar-AdministrarSintomas" for="inlineRadio2">Síntoma</p>
                                    </div>
                                    </div>

                                    <br />

                                </div>
                                <div class="modal-footer">

                                  <button type="button" id="botonModalCancelar-AdministrarSintomas" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa a la tabla de síntomas">Cancelar</button>
                                  <button type="button" id="botonModalModificar-AdministrarSintomas" class="btn btn-primary" title="Modificar síntoma">Modificar</button>

                                </div>
                            </div>
                        </div>
                    </div>
                    

                </div>

            </div>

           
            
            <div id="cajaTabla-AdministrarSintomas">
                <table id="tabla-AdministrarSintomas" class="table table-bordered">
                    
                    <thead> {/*Cabeceras*/}
                        <tr>
                            {/*<th id="idTablaCabecera-Reglas" scope="col" title="Identificador del sintoma">ID</th>*/}
                            <th id="sintomaTablaCabecera-AdministrarSintomas" scope="col" title="Pregunta del sintoma">Síntoma</th>
                            <th id="clasificacionTablaCabecera-AdministrarSintomas" scope="col" title="Clasificación de la acción a tomar">Tipo De Depresión</th>

                            {/*Columna para agregar o elimina*/}
                            <th id="modificarEliminarTablaCabecera-AdministrarSintomas" scope="col" title="Descripción del sintoma">Modificar/Eliminar</th>
                          </tr>
                    </thead>
                    <tbody> {/*Filas*/}
                        <tr>
                            {/*<th id="idTablaFila-Reglas" scope="row">1</th>*/}
                            <td id="sintomaTablaFila-AdministrarSintomas">¿Apareció un nuevo lunar en la piel?</td>
                            <td id="clasificacionTablaFila-AdministrarSintomas">Señal</td>

                            {/*Fila para los botones modificar o eliminar regla*/}
                            <td id="modificarEliminarTablaFila-AdministrarSintomas">

                                <button id="botonModificar-AdministrarSintomas" type="button" class="btn btn-success" title="Modificar síntoma" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarSintomas">
                                    <i id="iconoModificar-AdministrarSintomas" class="fas fa-cog"></i>
                                </button>
                                
                                <button id="botonEliminar-AdministrarSintomas" type="button" class="btn btn-success" title="Eliminar síntoma" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarSintomas">
                                    <i id="iconoEliminar-AdministrarSintomas" class="fas fa-times-circle"></i>
                                </button>

                            </td>
                        </tr>

                        {/*Modal para el botón de Eliminar Sintoma*/}
                        <div class="modal fade" id="modalEliminar-AdministrarSintomas" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">

                                  <h5 class="modal-title" id="modalLabelEliminar-AdministrarSintomas">

                                    <i class="fas fa-exclamation-triangle"></i>
                                    <label >Advertencia</label>

                                  </h5>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" title="Regresa el diciconario de sintomas"></button>
                                </div>
                                <div class="modal-body">
                                  
                                    <label>¿Realmente quiere eliminar este síntoma?</label>
                                    <label id="labelRevertirCambios-AdministrarSintomas">Los cambios no se podrán revertir.</label>

                                </div>
                                <div class="modal-footer">

                                  <button type="button" id="botonModalCancelar-AdministrarSintomas" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa a la tabla de síntomas">Cancelar</button>
                                  <button type="button" id="botonModalEliminar-AdministrarSintomas" class="btn btn-primary" title="Eliminar síntoma">Eliminar</button>

                                </div>
                              </div>
                            </div>
                        </div>

                        
                        {/*Modal para el botón de Modificar Sintoma*/}
                        <div class="modal fade" id="modalModificar-AdministrarSintomas" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">

                                  <h5 class="modal-title" id="modalLabelModificar-AdministrarSintomas">

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
                                        <p id="labelSintomaModalModificar-AdministrarSintomas" for="inlineRadio2">Síntoma</p>
                                    </div>

                                    <br />

                                </div>
                                <div class="modal-footer">

                                  <button type="button" id="botonModalCancelar-AdministrarSintomas" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa a la tabla de síntomas">Cancelar</button>
                                  <button type="button" id="botonModalModificar-AdministrarSintomas" class="btn btn-primary" title="Modificar síntoma">Modificar</button>

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