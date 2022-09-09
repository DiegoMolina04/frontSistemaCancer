import '../css/TiposDepresion.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'
import { Link } from "react-router-dom";
import React, { useState, useContext } from 'react';
import { UserContext } from "../context/UserContext.js";

function TiposDepresion() {

    const { respuestaServidor, setRespuestaServidor } = useContext(UserContext); //Se usa para guardar las respuestas del servidor
    const { token, setToken } = useContext(UserContext); //Se verifica si tiene sesión iniciada
    const { es_admin, setEs_admin } = useContext(UserContext); //Se verifica si se debe o no mostrar componentes para el usuario

    const [tipoDepresion, setTipoDepresion] = useState([]); //Se guardan todos los tipos de depresión
    const [codigo, setCodigo] = useState(null); //Se guarda identificador si se trata del boton para listar o filtrar
    const [filtro, setFiltro] = useState([]); //Se guarda la opción del dropdown y lo ingresado en el input

    const [editarTipoDepresion, setEditarTipoDepresion] = useState({ //Se guarda las modificaciones del modificar tipo depresión
        tipo_depresion: ""
    });

    const [tipoDepresionOriginal, setTipoDepresionOriginal] = useState({ //Se guarda el tipo depresión al quererlos modificar
        tipo_depresion: ""
        
    });

    const [id, setId] = useState({ //Se usa para guardar el id a modificar
        id: ''
    });

    let componenteListarTipoDepresion = null; //Se usa para cargar la tabla de preguntas

    let componenteAgregarTipoDepresion = null; //Se usa para cargar el botón agrega pregunta si es un admin

    let componenteMensajeTabla = null; //Se usa para mostrar el mensaje informativo al usuario

    let componenteNombreOpcion = null; //Se usa para mostrar el mensaje de la vista dependiendo si es admin o usuario

    let componenteCabeceraModificarEliminar = null; //Se usa para cargar la columna de modificar/eliminar si es un admin

    /*Se verifica si es admin para mostrar los componentes necesarios de este rol*/
    if (es_admin == true) { /*Si es admin*/

        componenteNombreOpcion = <label>Admin. Tipos Depresión</label>
        componenteAgregarTipoDepresion = <div><label id="labelAgregarTipoDepresion-AdministrarTipoDepresion">
            ¿Desea agregar un nuevo sintoma?
        </label>
            <Link to='/agregartipodepresion' >

                <button id="agregarTipoDepresion-AdministrarTipoDepresion" type="button" className="btn btn-success" title="Agregar nuevo tipo depresión">
                    <i class="fas fa-plus-circle"></i>
                    Agregar Tipo Depresión
                </button>
            </Link>
        </div>

        componenteCabeceraModificarEliminar = <th id="modificarEliminarTablaCabecera-AdministrarTipoDepresion" scope="col" title="Modificar/Eliminar tipo depresión">Modificar/Eliminar</th>

    } else { /*Si no lo es*/

        componenteNombreOpcion = <label>Tipo Depresión</label>
    }

    const handleInputChangeModificar = (event) => { //Para guardar los datos ingresados en el modificar
        console.log(event.target.name)
        console.log(event.target.value)
        setEditarTipoDepresion({
            ...editarTipoDepresion,
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

    async function consultarTiposDepresion() {
        setRespuestaServidor("");
        const data = await fetch("https://secure-brushlands-86892.herokuapp.com/v1/depresion-type/get-all", {
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
            setTipoDepresion(respuesta.result.items);
        } else {

        }
    }

    const modificarTipoDepresion = async (event) => {

        event.preventDefault();
        setRespuestaServidor("");

        if (editarTipoDepresion.tipo_depresion == "") { //Si alguno de los campos esta vacio

            setRespuestaServidor(408);

        } else if (editarTipoDepresion.tipo_depresion == tipoDepresionOriginal.tipo_depresion) { //Si el tipo depresión no se cambio

            setRespuestaServidor(207);

        } else if (editarTipoDepresion.tipo_depresion != tipoDepresionOriginal.tipo_depresion) { //Si hay que actualizar tipo depresión

            console.log("Este es el valor a enviar "+editarTipoDepresion.tipo_depresion);
            const arrayDatos = { 'tipo_depresion': editarTipoDepresion.tipo_depresion }

            const url = "https://secure-brushlands-86892.herokuapp.com/v1/depresion-type/" + editarTipoDepresion.id + "/update-one";

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

        setEditarTipoDepresion({ //Se reinician los valores al hacer click en modificar sintoma
            tipo_depresion: "",

        });

    }

    const filtrarTipoDepresion = async (event) => {

        event.preventDefault();
        setRespuestaServidor("");
        setCodigo("");

        const url = "https://secure-brushlands-86892.herokuapp.com/v1/depresion-type/get-all?tipo_depresion=" + filtro.inputFiltro;//+ 

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
            setTipoDepresion(respuesta.result.items);
            setCodigo("filtrar");
        }


    }

    const eliminarTipoDepresion = async (event) => {

        event.preventDefault();

        const url = "https://secure-brushlands-86892.herokuapp.com/v1/depresion-type/" + id + "/delete-one";

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
            componenteListarTipoDepresion = tipoDepresion.map(elemento => (
                <tr>
                    <th id="tipoDepresionTablaFila-AdministrarTipoDepresion" scope="row">{elemento.tipo_depresion}</th>
                    <td id="modificarEliminarTablaFila-AdministrarTipoDepresion">

                        <button id="botonModificar-AdministrarTipoDepresion" type="button" class="btn btn-success" onClick={() => { reiniciarSetearDatos(elemento) }} title="Modificar tipo depresión" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarTipoDepresion">
                            <i id="iconoModificar-AdministrarTipoDepresion" class="fas fa-cog"></i>
                        </button>

                        <button id="botonEliminar-AdministrarTipoDepresion" type="button" class="btn btn-success" onClick={() => { reiniciarSetearDatos(elemento) }} title="Eliminar tipo depresión" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarTipoDepresion">
                            <i id="iconoEliminar-AdministrarTipoDepresion" class="fas fa-times-circle"></i>
                        </button>

                    </td>
                </tr>
            ))
        } else { /*Si codigo == listar y rol = usuario, se muestra tabla sin botones de modificar y eliminar*/
            componenteListarTipoDepresion = tipoDepresion.map(elemento => (
                <tr>
                    <th id="tipoDepresionTablaFila-AdministrarTipoDepresion" scope="row">{elemento.tipo_depresion}</th>
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
                componenteListarTipoDepresion = tipoDepresion.map(elemento => (
                    <tr>
                        <th id="tipoDepresionTablaFila-AdministrarTipoDepresion" scope="row">{elemento.tipo_depresion}</th>

                        <td id="modificarEliminarTablaFila-AdministrarTipoDepresion">

                            <button id="botonModificar-AdministrarTipoDepresion" type="button" class="btn btn-success" onClick={() => { reiniciarSetearDatos(elemento) }} title="Modificar tipo depresión" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarTipoDepresion">
                                <i id="iconoModificar-AdministrarTipoDepresion" class="fas fa-cog"></i>
                            </button>

                            <button id="botonEliminar-AdministrarTipoDepresion" type="button" class="btn btn-success" onClick={() => { reiniciarSetearDatos(elemento) }} title="Eliminar tipo depresión" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarTipoDepresion">
                                <i id="iconoEliminar-AdministrarTipoDepresion" class="fas fa-times-circle"></i>
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
                componenteListarTipoDepresion = tipoDepresion.map(elemento => (
                    <tr>
                        <th id="tipoDepresionTablaFila-AdministrarTipoDepresion" scope="row">{elemento.tipo_depresion}</th>
                    </tr>
                ))

            } else { //Campos vacios
                setRespuestaServidor(408);
            }
        }

    } 

    const listarTiposDepresion = async (event) => {

        event.preventDefault();
        //console.log("Entre al listarUsuarios");
        setCodigo("listar");

        setRespuestaServidor("");
        consultarTiposDepresion();


    }

    function setearDatos(elemento) {
        setEditarTipoDepresion(elemento);
        setId(elemento.id);
        setRespuestaServidor("");
    }

    function reiniciarSetearDatos(elemento) {

        setearDatos(elemento); //Se guardan los valores originales a modificar
        setTipoDepresionOriginal(elemento); //Se guardan los valores originales

    }

    switch (respuestaServidor) {

        case 200:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarTiposDepresion">Tipo depresión modificado correctamente, recargue para ver cambios.</h5>

            break;

        case 201:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarTiposDepresion">Tipo depresión creado correctamente, recargue para ver cambios.</h5>
            break;

        case 204:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarTiposDepresion">Tipo depresión eliminado correctamente, recargue para ver cambios.</h5>
            break;

        case 207:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarTiposDepresion">No se realizaron modificaciones en el tipo depresión.</h5>
            break;

        case 401:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarTiposDepresion">Ocurrio un error, debe iniciar sesión.</h5> //Si no tiene token asignado
            break;

        case 403:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarTiposDepresion">Ocurrio un error, debe iniciar sesión.</h5> //Si se vence el token
            break;

        case 404:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarTiposDepresion">No se a encontrado el tipo depresión, detalle más la busqueda.</h5>
            break;

        case 408:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarTiposDepresion">Por favor llene todos los campos.</h5>
            break;

        case 500:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarTiposDepresion">Un error a sucedido, intente de nuevo.</h5>
            break;

        default:
            componenteMensajeTabla = null;
            break;
    }

    return (

        <div id="fondo-AdministrarTiposDepresion">

            <div id="cabeceraAdministrarTiposDepresion-AdministrarTiposDepresion">

                <div id="cajaNombreOpcion-AdministrarTiposDepresion">

                    {componenteNombreOpcion}

                </div>

                <div id="busqueda">

                    <form id="formato" onSubmit={filtrarTipoDepresion}>

                        <select class="form-select" onChange={handleDropdownChangeFiltrar} name="categoria" title="Seleccione categoria para buscar palabra" >

                            <option selected >Seleccione Categoria...</option> {/*disabled*/}
                            <option value="tipoDepresion">Tipo Depresión</option>

                        </select>

                        <input id="filtrar" type="text" className="form-control" onChange={handleInputChangeFiltrar} name="inputFiltro" placeholder="¿Busca algo puntual?" title="Ingrese valor a buscar" />

                        <button id="enviarBuscar-Plataforma" type="submit" className="btn btn-success" title="Buscar" >
                            <i class="fas fa-search"></i>
                        </button>

                    </form>
                </div>


                <div id="cajaAgregarAdministrarTiposDepresion-AdministrarTiposDepresion">

                    {componenteAgregarTipoDepresion}

                </div>

            </div>

            <form id="formato" onSubmit={listarTiposDepresion}>

                <div id="cajaTabla-AdministrarTiposDepresion">

                    <div id="cajaCabecera-AdministrarTiposDepresion">

                        <div id="cajamensajeRespuesta-AdministrarTiposDepresion">
                            {componenteMensajeTabla}
                        </div>
                        <div id="cajaBotonRecargar-AdministrarTiposDepresion">
                            <button id="botonRecargar-AdministrarTiposDepresion" type='submit' className="btn btn-success" title='Recargar tabla'><i class="fas fa-redo"></i></button>
                        </div>
                    </div>

                    <table id="tabla-AdministrarTiposDepresion" class="table table-bordered">
                        <thead> {/*Cabeceras*/}
                            <tr>
                                <th id="tipoDepresionTablaCabecera-AdministrarTiposDepresion" scope="col" title="Tipos de depresión">Tipo Depresión</th>

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
            {/*Modal para el botón de Eliminar AdministrarUsuarios*/}
            <form className="row" onSubmit={eliminarTipoDepresion}>
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

                                <label>¿Realmente desea eliminar el tipo de depresión "{editarTipoDepresion.tipo_depresion}" ?</label>
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

            {/*Modal para el botón de Modificar AdministrarUsuarios*/}
            <form className="row" onSubmit={modificarTipoDepresion}>
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
                                    <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-address-card"></i></div>
                                    <input id="" type="text" className="form-control" value={editarTipoDepresion.tipo_depresion} placeholder="Ingrese el tipo de depresión" onChange={handleInputChangeModificar} name="tipo_depresion" title="Sintoma a modificar" />

                                </div>

                                <br />

                                {/*Sección AdministrarUsuarios*/}

                                {/*Sección Descripción*/}

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