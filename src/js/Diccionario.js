import '../css/Diccionario.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'
import { Link } from "react-router-dom";
import React, { useState, useContext } from 'react';
import { UserContext } from "../context/UserContext.js";

function Diccionario() {
    
    const { respuestaServidor, setRespuestaServidor } = useContext(UserContext); //Se usa para guardar las respuestas del servidor
    const { token, setToken } = useContext(UserContext); //Se verifica si tiene sesión iniciada
    const { es_admin, setEs_admin } = useContext(UserContext); //Se verifica si se debe o no mostrar componentes para el usuario

    const [terminos, setTerminos] = useState([]); //Se guardan todos los usuarios
    const [codigo, setCodigo] = useState(null); //Se guarda identificador si se trata del boton para listar o filtrar
    const [filtro, setFiltro] = useState({
        categoria: "Seleccione Categoria...",
        inputFiltro: ""
    }); //Se guarda la opción del dropdown y lo ingresado en el input

    const [editarTermino, setEditarTermino] = useState({ //Se guarda las modificaciones del modificar termino
        termino: "",
        descripcion: ""
    });

    const [terminoOriginal, setTerminoOriginal] = useState({ //Se guarda el termino y descripción original al quererlos modificar
        termino: "",
        descripcion: ""
    });

    const [id, setId] = useState({ //Se usa para guardar el id a modificar y eliminar
        id: ''
    });

    //console.log(filtro);

    let componenteListarTerminos = null; //Se usa para cargar la tabla de preguntas

    let componenteAgregarTermino = null; //Se usa para cargar el botón agrega pregunta si es un admin

    let componenteMensajeTabla = null; //Se usa para mostrar el mensaje informativo al usuario

    let componenteNombreOpcion = null; //Se usa para mostrar el mensaje de la vista dependiendo si es admin o usuario

    let componenteCabeceraModificarEliminar = null; //Se usa para cargar la columna de modificar/eliminar si es un admin

    /*Se verifica si es admin para mostrar los componentes necesarios de este rol*/
    if (es_admin == true) { /*Si es admin*/

        componenteNombreOpcion = <label>Administrar Terminos</label>
        componenteAgregarTermino = <div><label id="labelAgregarTermino-AdministrarTerminos">
            ¿Desea agregar un nuevo termino?
        </label>
            <Link to='/agregardiccionario' >

                <button id="agregarTermino-AdministrarTerminos" type="button" className="btn btn-success" title="Agregar nuevo termino">
                    <i class="fas fa-plus-circle"></i>
                    Agregar Termino
                </button>
            </Link>
        </div>

        componenteCabeceraModificarEliminar = <th id="modificarEliminarTablaCabecera-AdministrarTerminos" scope="col" title="Modificar/Eliminar terminos">Modificar/Eliminar</th>

    } else { /*Si no lo es*/

        componenteNombreOpcion = <label>Terminos</label>
    }

    const handleInputChangeModificar = (event) => { //Para guardar los datos ingresados en el modificar
        console.log(event.target.name)
        console.log(event.target.value)
        setEditarTermino({
            ...editarTermino,
            [event.target.name]: event.target.value
        })

    }

    const handleInputChangeFiltrar = (event) => { //Para guardar los datos ingresados en el filtrar

        setFiltro({
            ...filtro,
            [event.target.name]: event.target.value
        })

    }

    const handleDropdownChangeFiltrar = (event) => { //Para guardar la categoria seleccionada en el filtrar

        const categoria = event.currentTarget.value;
        setFiltro({
            ...filtro,
            categoria
        })

    }

    async function consultarTerminos() {
        setRespuestaServidor("");
        const data = await fetch("https://secure-brushlands-86892.herokuapp.com/v1/dictionary/get-all", {
            method: "GET",
            mode: "cors",
            headers: {

                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

        })

        const respuesta = await data.json();

        if (respuesta.code == 401) {
            setRespuestaServidor(401);
        } else if (respuesta.status == 200) {
            setTerminos(respuesta.result.items);
        } else {

        }
    }

    async function enviarModificarTermino(arrayDatos) {

        const url = "https://secure-brushlands-86892.herokuapp.com/v1/dictionary/" + editarTermino.id + "/update-one";

        const data = await fetch(url, {
            method: "PUT",
            mode: "cors",
            headers: {

                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(arrayDatos)
        })

        const respuesta = await data.json();
        console.log(respuesta);

        if (respuesta.status === undefined) {

            setRespuestaServidor(respuesta.code);

        } else { //Si es diferente
            setRespuestaServidor(respuesta.status);
        }

    }

    const modificarTermino = async (event) => {

        event.preventDefault();
        setRespuestaServidor("");

        if (editarTermino.termino == "" || terminoOriginal.descripcion == "") { //Si alguno de los campos esta vacio

            setRespuestaServidor(408);

        } else if ((editarTermino.termino == terminoOriginal.termino) && (editarTermino.descripcion == terminoOriginal.descripcion)) { //Si el termino y descripcion no se modificaron

            setRespuestaServidor(207);

        }else if((editarTermino.termino == terminoOriginal.termino) && (editarTermino.descripcion != terminoOriginal.descripcion)){ //Si hay que actualizar la descripción unicamente
            
            const arrayDatos = { 'descripcion': editarTermino.descripcion }

            enviarModificarTermino(arrayDatos);

        }else if((editarTermino.termino != terminoOriginal.termino) && (editarTermino.descripcion == terminoOriginal.descripcion)){ //Si hay que actualizar el termino unicamente
            
            const arrayDatos = { 'termino': editarTermino.termino }

            enviarModificarTermino(arrayDatos);

        }else if((editarTermino.termino != terminoOriginal.termino) && (editarTermino.descripcion != terminoOriginal.descripcion)){ //Si hay que actualizar termino y descripcion
            
            const arrayDatos = { 'termino': editarTermino.termino, 'descripcion': editarTermino.descripcion }

            enviarModificarTermino(arrayDatos);
        }

        setEditarTermino({ //Se reinician los valores al hacer click en modificar termino
            termino: "",
            descripcion: ""
        });

    }

    const filtrarTermino = async (event) => {

        event.preventDefault();
        setRespuestaServidor("");
        setCodigo("");

        let url = null;

        if(filtro.categoria == "termino"){
            url = "https://secure-brushlands-86892.herokuapp.com/v1/dictionary/get-all?termino=" + filtro.inputFiltro;//+ 
        }else if(filtro.categoria == "descripcion"){
            url = "https://secure-brushlands-86892.herokuapp.com/v1/dictionary/get-all?descripcion=" + filtro.inputFiltro;//+ 
        }else{
            url = "https://secure-brushlands-86892.herokuapp.com/v1/dictionary/get-all";
        }

        const data = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {

                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            //body: JSON.stringify(datos)
        })

        const respuesta = await data.json();
        /*console.log("Este es lo de filtrar pregunta");
        console.log(JSON.stringify(respuesta));*/

        if (respuesta.code == 401) {
            setRespuestaServidor(401);
        } else if ((respuesta.result.items).length == 0) { //Si no se tiene nada en el array del get
            /*console.log("Vector vacio");
            console.log(preguntas);*/
            setRespuestaServidor(404);
        } else {
            setTerminos(respuesta.result.items);
            setCodigo("filtrar");
        }


    }

    const eliminarTermino = async (event) => {

        event.preventDefault();

        const url = "https://secure-brushlands-86892.herokuapp.com/v1/dictionary/" + id + "/delete-one";

        const data = await fetch(url, {
            method: "DELETE",
            mode: "cors",
            headers: {

                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            //body: JSON.stringify(datos)
        })

        const respuesta = await data;
        //console.log(respuesta.status);
        setRespuestaServidor(respuesta.status);

    }

    /*Se verfica si se hizo click en botón recargar tabla o buscar en el filtro*/
    if (codigo == "listar") {
        if (es_admin == true) { /*Si codigo == listar y rol = admin, se muestra tabla con botones de modificar y eliminar*/
            componenteListarTerminos = terminos.map(elemento => (
                <tr>
                    <th id="terminoTablaFila-AdministrarTerminos" scope="row">{elemento.termino}</th>
                    <td id="descripcionTablaFila-AdministrarTerminos">{elemento.descripcion}</td> {/*Se cargan los items listandolos*/}{/*{<ol>{elemento.symptoms.map(sintomas => (<li>{sintomas.sintoma}</li>))}</ol>}*/}{/*{<ol>{elemento.symptoms.map(sintomas => (<li>{sintomas.sintoma}</li>))}</ol>}*/}
                    <td id="modificarEliminarTablaFila-AdministrarTerminos">

                        <button id="botonModificar-AdministrarTerminos" type="button" class="btn btn-success" onClick={() => { reiniciarSetearDatos(elemento) }} title="Modificar termino" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarTerminos">
                            <i id="iconoModificar-AdministrarTerminos" class="fas fa-cog"></i>
                        </button>

                        <button id="botonEliminar-AdministrarTerminos" type="button" class="btn btn-success" onClick={() => { reiniciarSetearDatos(elemento) }} title="Eliminar termino" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarTerminos">
                            <i id="iconoEliminar-AdministrarTerminos" class="fas fa-times-circle"></i>
                        </button>

                    </td>
                </tr>
            ))
        } else { /*Si codigo == listar y rol = usuario, se muestra tabla sin botones de modificar y eliminar*/
            componenteListarTerminos = terminos.map(elemento => (
                <tr>
                    <th id="terminoTablaFila-AdministrarTerminos" scope="row">{elemento.termino}</th>
                    <td id="descripcionTablaFila-AdministrarTerminos">{elemento.descripcion}</td>{/*Se cargan los items listandolos*/}{/*{<ol>{elemento.symptoms.map(sintomas => (<li>{sintomas.sintoma}</li>))}</ol>}*/}
                </tr>
            ))
        }
    } else if (codigo == "filtrar") {

        if (es_admin == true) {/*Si codigo == filtrar y rol = admin, se muestra tabla con botones de modificar y eliminar*/

            /*console.log("Esto es lo del filtrar");
            console.log(filtro);*/
            if (filtro.categoria !== undefined && filtro.categoria !== "Seleccione Categoria..." && filtro.inputFiltro != undefined && filtro.inputFiltro !== "") {
                /*console.log("Entre al filtro");
                console.log(preguntas);*/
                componenteListarTerminos = terminos.map(elemento => (
                    <tr>
                        <th id="terminoTablaFila-AdministrarTerminos" scope="row">{elemento.termino}</th>
                        <td id="descripcionTablaFila-AdministrarTerminos">{elemento.descripcion}</td>{/*Se cargan los items listandolos*/}{/*{<ol>{elemento.symptoms.map(sintomas => (<li>{sintomas.sintoma}</li>))}</ol>}*/}

                        <td id="modificarEliminarTablaFila-AdministrarTerminos">

                            <button id="botonModificar-AdministrarTerminos" type="button" class="btn btn-success" onClick={() => { reiniciarSetearDatos(elemento) }} title="Modificar sintoma" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarTerminos">
                                <i id="iconoModificar-AdministrarTerminos" class="fas fa-cog"></i>
                            </button>

                            <button id="botonEliminar-AdministrarTerminos" type="button" class="btn btn-success" onClick={() => { reiniciarSetearDatos(elemento) }} title="Eliminar sintoma" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarTerminos">
                                <i id="iconoEliminar-AdministrarTerminos" class="fas fa-times-circle"></i>
                            </button>

                        </td>
                    </tr>
                ))

            } else { //Campos vacios
                setRespuestaServidor(408);
            }

        } else {/*Si codigo == filtrar y rol = usuario, se muestra tabla sin botones de modificar y eliminar*/
            /*console.log("Esto es lo del filtrar");
            console.log(filtro);*/
            if (filtro.categoria !== undefined && filtro.categoria !== "Seleccione Categoria..." && filtro.inputFiltro != undefined && filtro.inputFiltro !== "") {
                /*console.log("Entre al filtro");
                console.log(preguntas);*/
                componenteListarTerminos = terminos.map(elemento => (
                    <tr>
                        <th id="terminoTablaFila-AdministrarTerminos" scope="row">{elemento.termino}</th>
                        <td id="descripcionTablaFila-AdministrarTerminos">{elemento.descripcion}</td>{/*{<ol>{elemento.symptoms.map(sintomas => (<li>{sintomas.sintoma}</li>))}</ol>}*/}
                    </tr>
                ))

            } else { //Campos vacios
                setRespuestaServidor(408);
            }
        }

    } else if (codigo == "listarSintomas") { //Se listan los sintomas en modificar pregunta

    }

    const listarTerminos = async (event) => {

        event.preventDefault();
        //console.log("Entre al listarUsuarios");
        setCodigo("listar");

        setRespuestaServidor("");
        consultarTerminos();


    }

    function setearDatos(elemento) {
        setEditarTermino(elemento);
        setId(elemento.id);
        setRespuestaServidor("");
    }

    function reiniciarSetearDatos(elemento) {

        setearDatos(elemento); //Se guardan los valores originales a modificar
        setTerminoOriginal(elemento); //Se guardan los valores originales

    }

    switch (respuestaServidor) {

        case 200:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarTerminos">Termino modificado correctamente, recargue para ver cambios.</h5>

            break;

        case 201:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarTerminos">Termino creado correctamente, recargue para ver cambios.</h5>
            break;

        case 204:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarTerminos">Termino eliminado correctamente, recargue para ver cambios.</h5>
            break;

        case 207:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarTerminos">No se realizaron modificaciones en el termino.</h5>
            break;

        case 401:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarTerminos">Ocurrio un error, debe iniciar sesión.</h5> //Si no tiene token asignado
            break;

        case 403:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarTerminos">Ocurrio un error, debe iniciar sesión.</h5> //Si se vence el token
            break;

        case 404:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarTerminos">No se a encontrado un resultado, detalle más la busqueda.</h5>
            break;

        case 408:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarTerminos">Por favor llene todos los campos.</h5>
            break;

        case 500:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarTerminos">Un error a sucedido, intente de nuevo.</h5>
            break;

        default:
            componenteMensajeTabla = null;
            break;
    }

    return (

        <div id="fondo-AdministrarTerminos">

            <div id="cabeceraAdministrarTerminos-AdministrarTerminos">

                <div id="cajaNombreOpcion-AdministrarTerminos">

                    {componenteNombreOpcion}

                </div>

                <div id="busqueda">

                    <form id="formato" onSubmit={filtrarTermino}>

                        <select class="form-select" onChange={handleDropdownChangeFiltrar} name="categoria" title="Seleccione categoria para buscar palabra" >

                            <option selected >Seleccione Categoria...</option> {/*disabled*/}
                            <option value="termino">Termino</option>
                            <option value="descripcion">Descripción</option>

                        </select>

                        <input id="filtrar" type="text" className="form-control" onChange={handleInputChangeFiltrar} name="inputFiltro" placeholder="¿Busca algo puntual?" title="Ingrese valor a buscar" />

                        <button id="enviarBuscar-Plataforma" type="submit" className="btn btn-success" title="Buscar" >
                            <i class="fas fa-search"></i>
                        </button>

                    </form>
                </div>


                <div id="cajaAgregarAdministrarTerminos-AdministrarTerminos">

                    {componenteAgregarTermino}

                </div>

            </div>

            <form id="formato" onSubmit={listarTerminos}>

                <div id="cajaTabla-AdministrarTerminos">

                    <div id="cajaCabecera-AdministrarTerminos">

                        <div id="cajaMensajeRespuesta-AdministrarTerminos">
                            {componenteMensajeTabla}
                        </div>
                        <div id="cajaBotonRecargar-AdministrarTerminos">
                            <button id="botonRecargar-AdministrarTerminos" type='submit' className="btn btn-success" title='Recargar tabla'><i class="fas fa-redo"></i></button>
                        </div>
                    </div>

                    <table id="tabla-AdministrarTerminos" class="table table-bordered">
                        <thead> {/*Cabeceras*/}
                            <tr>
                                <th id="terminoTablaCabecera-AdministrarTerminos" scope="col" title="Palabras">Termino</th>
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
            {/*Modal para el botón de Eliminar AdministrarUsuarios*/}
            <form className="row" onSubmit={eliminarTermino}>
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

                                <label>¿Realmente desea eliminar el sintoma "{editarTermino.termino}" ?</label>
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

            {/*Modal para el botón de Modificar AdministrarUsuarios*/}
            <form className="row" onSubmit={modificarTermino}>
                <div class="modal fade" id="modalModificar-AdministrarTerminos" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">

                                <h5 class="modal-title" id="modalLabelModificar-AdministrarTerminos">

                                    <i class="fas fa-cog"></i>
                                    <label >Modificar Termino</label>

                                </h5>
                            </div>
                            <div class="modal-body">

                                <div id="labelTerminoModificar-AdministrarTerminos">

                                    <label>Termino</label>

                                </div>

                                <div className="input-group">
                                    <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-address-card"></i></div>
                                    <input id="" type="text" className="form-control" value={editarTermino.termino} placeholder="Ingrese el termino" onChange={handleInputChangeModificar} name="termino" title="Termino a modificar" />

                                </div>

                                <br />

                                {/*Sección AdministrarUsuarios*/}

                                <div id="labelDescripcionModificar-AdministrarTerminos">

                                    <label>Descripción</label>

                                </div>

                                <div className="input-group">
                                    <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-font"></i></div> {/*editarPregunta.symptoms.map(elemento => (elemento.sintoma))*/}
                                    <textarea class="form-control" placeholder="Ingrese la descripción del termino" value={editarTermino.descripcion} onChange={handleInputChangeModificar} name="descripcion" title="Descripción del termino"></textarea>
                                </div>

                                <br />

                                {/*Sección Descripción*/}

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