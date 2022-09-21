import '../css/Sintomas.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'
import { Link } from "react-router-dom";
import React, { useState, useContext } from 'react';
import { UserContext } from "../../../src/capaNegocio/context/UserContext.js";

function Sintomas() {
    
    const { respuestaServidor, setRespuestaServidor } = useContext(UserContext); //Se usa para guardar las respuestas del servidor
    const { token, setToken } = useContext(UserContext); //Se verifica si tiene sesión iniciada
    const { es_admin, setEs_admin } = useContext(UserContext); //Se verifica si se debe o no mostrar componentes para el usuario

    const [sintomas, setSintomas] = useState([]); //Se guardan todos los usuarios
    const [codigo, setCodigo] = useState(null); //Se guarda identificador si se trata del boton para listar o filtrar
    const [filtro, setFiltro] = useState([]); //Se guarda la opción del dropdown y lo ingresado en el input
    const [tipoDepresion, setTipoDepresion] = useState(null); //Se guardan todos los sintomas
    const [tipoDepresionId, setTipoDepresionId] = useState([]); //Se guardan los id para crear el registro en la base de datos
    const [tipoDepresionMensaje, setTipoDepresionMensaje] = useState([]); //Se guarda el mensaje del id para mostrarlo en el textarea

    const [editarSintoma, setEditarSintoma] = useState({ //Se guarda las modificaciones del modificar pregunta
        sintoma: "",
        tipos_depresion: { "": "" }
    });

    const [sintomaOriginal, setSintomaOriginal] = useState({ //Se guarda la pregunta y sintomas original al quererlos modificar
        sintoma: "",
        tipos_depresion: { "": "" }
    });

    const [id, setId] = useState({ //Se usa para guardar el id a modificar
        id: ''
    });

    let componenteListarSintomas = null; //Se usa para cargar la tabla de preguntas

    let componenteListarTiposDepresion = null; //Se usa para cargar la tabla de sintomas en modificar pregunta

    let componenteAgregarSintoma = null; //Se usa para cargar el botón agrega pregunta si es un admin

    let componenteMensajeTabla = null; //Se usa para mostrar el mensaje informativo al usuario

    let componenteNombreOpcion = null; //Se usa para mostrar el mensaje de la vista dependiendo si es admin o usuario

    let componenteCabeceraModificarEliminar = null; //Se usa para cargar la columna de modificar/eliminar si es un admin

    /*Se verifica si es admin para mostrar los componentes necesarios de este rol*/
    if (es_admin == true) { /*Si es admin*/

        componenteNombreOpcion = <label>Administrar Sintomas</label>
        componenteAgregarSintoma = <div><label id="labelAgregarSintoma-AdministrarSintomas">
            ¿Desea agregar un nuevo sintoma?
        </label>
            <Link to='/agregarsintoma' >

                <button id="agregarSintoma-AdministrarSintomas" type="button" className="btn btn-success" title="Agregar nuevo sintoma">
                    <i class="fas fa-plus-circle"></i>
                    Agregar Sintoma
                </button>
            </Link>
        </div>

        componenteCabeceraModificarEliminar = <th id="modificarEliminarTablaCabecera-AdministrarSintomas" scope="col" title="Modificar/Eliminar sintomas">Modificar/Eliminar</th>

    } else { /*Si no lo es*/

        componenteNombreOpcion = <label>Sintomas</label>
    }

    const handleInputChangeModificar = (event) => { //Para guardar los datos ingresados en el modificar
        console.log(event.target.name)
        console.log(event.target.value)
        setEditarSintoma({
            ...editarSintoma,
            [event.target.name]: event.target.value
        })

    }

    function handleCheckboxChange(event, elemento) {//Para guardar los cambios de los checkbox

        //console.log(event.currentTarget);
        //console.log(event.target.checked);
        console.log(event.target.checked);
        //console.log(elemento);

        //let elementoSintoma = elemento.sintoma;
        let elementoTipoDepresionId = elemento.id;
        let elementoTipoDepresionMensaje = elemento.tipo_depresion;

        if (event.target.checked == true) { //Si el checkbox es seleccionado

            setTipoDepresionId([
                ...tipoDepresionId,
                elementoTipoDepresionId
            ]);

            setTipoDepresionMensaje([
                ...tipoDepresionMensaje,
                elementoTipoDepresionMensaje
            ]);

        } else { //Si el checkbox es deseleccionado

            const arrayFiltradoId = tipoDepresionId.filter((item) => item !== elementoTipoDepresionId); //Se saca del array el id del sintoma guardado
            setTipoDepresionId(arrayFiltradoId);

            const arrayFiltradoMensaje = tipoDepresionMensaje.filter((item) => item !== elementoTipoDepresionMensaje); //Se saca del array el id del sintoma guardado
            setTipoDepresionMensaje(arrayFiltradoMensaje);

        }

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

    async function consultarSintomas() {
        setRespuestaServidor("");
        const data = await fetch("https://secure-brushlands-86892.herokuapp.com/v1/symptoms/get-all", {
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
            setSintomas(respuesta.result.items);
        } else {

        }
    }

    async function enviarModificarSintoma(arrayDatos) {

        const url = "https://secure-brushlands-86892.herokuapp.com/v1/symptoms/" + editarSintoma.id + "/update-one";

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

    const modificarSintoma = async (event) => {

        event.preventDefault();
        setRespuestaServidor("");

        let sintomasNuevosOrganizados = JSON.stringify(tipoDepresionId.sort());
        let sintomasOriginalesOrganizados = JSON.stringify((sintomaOriginal.tipos_depresion).sort());

        if (editarSintoma.sintoma == "" || tipoDepresionId.length == 0) { //Si alguno de los campos esta vacio

            setRespuestaServidor(408);

        } else if ((editarSintoma.sintoma == sintomaOriginal.sintoma) && (sintomasNuevosOrganizados == sintomasOriginalesOrganizados)) { //Si la pregunta y sintomas no se modificaron

            setRespuestaServidor(207);

        } else if ((editarSintoma.sintoma == sintomaOriginal.sintoma) && (sintomasNuevosOrganizados != sintomasOriginalesOrganizados)) { //Si la pregunta es igual y los sintomas cambian

            /*console.log("Pregunta igual y sintomas diferentes");
            console.log("Este es el ID de la pregunta "+editarPregunta.id);*/
            console.log("Antes !!");
            let tiposDepresionOriginales = sintomaOriginal.tipos_depresion;
            const tiposDepresionNuevos = [];
            console.log("Sintomas originales "+sintomasOriginalesOrganizados);
            //console.log("Sintomas organizados "+sintomasOriginales.sort());
            console.log("Sintomas nuevos "+sintomasNuevosOrganizados);

            tipoDepresionId.map(elemento => (

                (sintomaOriginal.tipos_depresion.includes(elemento)) ? (tiposDepresionOriginales = tiposDepresionOriginales.filter(id => id !== elemento)) : tiposDepresionNuevos.push(elemento)//(sintomasOriginales = sintomasOriginales.filter(id => id !== elemento) && sintomasNuevos.push(elemento))
            ));

            /*console.log("Despues !!");*/
            console.log("Sintomas a borrar "+tiposDepresionOriginales);
            console.log("Sintomas nuevos "+tiposDepresionNuevos);
            if (tiposDepresionOriginales.length == 0) { //Si solo hay que insertar sintomas
                //console.log("solo hay que insertar sintomas");
                const arrayDatos = { 'tipos_depresion': tiposDepresionNuevos }

                enviarModificarSintoma(arrayDatos);

            } else if (tiposDepresionNuevos.length == 0) { //Si solo hay que borrar sintomas
                //console.log("solo hay que borrar sintomas");
                const arrayDatos = { 'remover_tipos_depresion': tiposDepresionOriginales }
                enviarModificarSintoma(arrayDatos);

            } else if (tiposDepresionNuevos.length != 0 && tiposDepresionOriginales.length != 0) { //Si hay que insertar sintomas y borrar sintomas
                //console.log("hay que insertar sintomas y borrar sintomas");

                const arrayDatos = { 'tipos_depresion': tiposDepresionNuevos, 'remover_tipos_depresion': tiposDepresionOriginales }//const arrayDatos = {'sintomas':sintomasNuevos, 'remover_sintomas':sintomasOriginales}

                enviarModificarSintoma(arrayDatos);
            }

        } else if ((editarSintoma.sintoma !== sintomaOriginal.sintoma) && (sintomasNuevosOrganizados == sintomasOriginalesOrganizados)) { //Si pregunta diferente y sintomas iguales

            //console.log("Pregunta diferente y sintomas iguales");
            const arrayDatos = { 'sintoma': editarSintoma.sintoma }
            enviarModificarSintoma(arrayDatos);

        } else if ((editarSintoma.sintoma != sintomaOriginal.sintoma) && (sintomasNuevosOrganizados != sintomasOriginalesOrganizados)) { //Si Pregunta y sintomas diferentes

            console.log("Pregunta y sintomas diferente");
            console.log("Antes !!");
            let tiposDepresionOriginales = sintomaOriginal.tipos_depresion;
            const tiposDepresionNuevos = [];
            console.log("Sintomas originales "+tiposDepresionOriginales);
            console.log("Sintomas nuevos "+sintomasNuevosOrganizados);

            tipoDepresionId.map(elemento => (

                (sintomaOriginal.tipos_depresion.includes(elemento)) ? (tiposDepresionOriginales = tiposDepresionOriginales.filter(id => id !== elemento)) : tiposDepresionNuevos.push(elemento)//(sintomasOriginales = sintomasOriginales.filter(id => id !== elemento) && sintomasNuevos.push(elemento))
            ));

            console.log("Despues !!");
            console.log("Sintomas a borrar "+tiposDepresionOriginales);
            console.log("Sintomas nuevos "+tiposDepresionNuevos);
            if (tiposDepresionOriginales.length == 0) { //Si solo hay que insertar sintomas e insertar pregunta

                //console.log("solo hay que insertar sintomas e insertar pregunta");
                const arrayDatos = { 'sintoma': editarSintoma.sintoma, 'tipos_depresion': tiposDepresionNuevos }
                enviarModificarSintoma(arrayDatos);

            } else if (tiposDepresionNuevos.length == 0) { //Si solo hay que borrar sintomas e insertar pregunta

                //console.log("solo hay que borrar sintomas e insertar pregunta");
                const arrayDatos = { 'sintoma': editarSintoma.sintoma, 'remover_tipos_depresion': tiposDepresionOriginales }
                enviarModificarSintoma(arrayDatos);

            } else if (tiposDepresionNuevos.length != 0 && tiposDepresionOriginales.length != 0) { //Si hay que insertar sintomas, borrar sintomas y pregunta

                console.log("hay que insertar sintomas, borrar sintomas y pregunta");
                const arrayDatos = { 'sintoma': editarSintoma.sintoma, 'tipos_depresion': tiposDepresionNuevos, 'remover_tipos_depresion': tiposDepresionOriginales }
                enviarModificarSintoma(arrayDatos);
            }
        }

        setEditarSintoma({ //Se reinician los valores al hacer click en modificar sintoma
            sintoma: "",
            tipos_depresion: { "": "" }
        });

    }

    const filtrarSintoma = async (event) => {

        event.preventDefault();
        setRespuestaServidor("");
        setCodigo("");

        const url = "https://secure-brushlands-86892.herokuapp.com/v1/symptoms/get-all?sintoma=" + filtro.inputFiltro;//+ 

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
            setSintomas(respuesta.result.items);
            setCodigo("filtrar");
        }


    }

    const eliminarSintoma = async (event) => {

        event.preventDefault();

        const url = "https://secure-brushlands-86892.herokuapp.com/v1/symptoms/" + id + "/delete-one";

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

    async function cargarTiposDepresion() { //const cargarSintomas = async (event) => {

        /*event.preventDefault();*/
        const data = await fetch("https://secure-brushlands-86892.herokuapp.com/v1/depresion-type/get-all", {
            method: "GET",
            mode: "cors",
            headers: {

                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

        })

        const respuesta = await data.json();
        //console.log(respuesta);

        if (respuesta.code == 401) {
            setRespuestaServidor(401);
        } else {
            setTipoDepresion(respuesta.result.items);
            setCodigo("listarSintomas");
        }


    }


    /*Se verfica si se hizo click en botón recargar tabla o buscar en el filtro*/
    if (codigo == "listar") {
        if (es_admin == true) { /*Si codigo == listar y rol = admin, se muestra tabla con botones de modificar y eliminar*/
            componenteListarSintomas = sintomas.map(elemento => (
                <tr>
                    <th id="sintomaTablaFila-AdministrarSintomas" scope="row">{elemento.sintoma}</th>
                    <td id="tipoDepresionTablaFila-AdministrarSintomas">{<ol>{elemento.depresion_types.map(tipoDepresion => (<li>{tipoDepresion.tipo_depresion}</li>))}</ol>}</td> {/*Se cargan los items listandolos*/}{/*{<ol>{elemento.symptoms.map(sintomas => (<li>{sintomas.sintoma}</li>))}</ol>}*/}{/*{<ol>{elemento.symptoms.map(sintomas => (<li>{sintomas.sintoma}</li>))}</ol>}*/}
                    <td id="modificarEliminarTablaFila-AdministrarSintomas">

                        <button id="botonModificar-AdministrarSintomas" type="button" class="btn btn-success" onClick={() => { reiniciarSetearDatos(elemento) }} title="Modificar sintoma" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarSintomas">
                            <i id="iconoModificar-AdministrarSintomas" class="fas fa-cog"></i>
                        </button>

                        <button id="botonEliminar-AdministrarSintomas" type="button" class="btn btn-success" onClick={() => { reiniciarSetearDatos(elemento) }} title="Eliminar sintoma" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarSintomas">
                            <i id="iconoEliminar-AdministrarSintomas" class="fas fa-times-circle"></i>
                        </button>

                    </td>
                </tr>
            ))
        } else { /*Si codigo == listar y rol = usuario, se muestra tabla sin botones de modificar y eliminar*/
            componenteListarSintomas = sintomas.map(elemento => (
                <tr>
                    <th id="sintomaTablaFila-AdministrarSintomas" scope="row">{elemento.sintoma}</th>
                    <td id="tipoDepresionTablaFila-AdministrarSintomas">{<ol>{elemento.depresion_types.map(tipoDepresion => (<li>{tipoDepresion.tipo_depresion}</li>))}</ol>}</td>{/*Se cargan los items listandolos*/}{/*{<ol>{elemento.symptoms.map(sintomas => (<li>{sintomas.sintoma}</li>))}</ol>}*/}
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
                componenteListarSintomas = sintomas.map(elemento => (
                    <tr>
                        <th id="sintomaTablaFila-AdministrarSintomas" scope="row">{elemento.sintoma}</th>
                        <td id="tipoDepresionTablaFila-AdministrarSintomas">{<ol>{elemento.depresion_types.map(tipoDepresion => (<li>{tipoDepresion.tipo_depresion}</li>))}</ol>}</td>{/*Se cargan los items listandolos*/}{/*{<ol>{elemento.symptoms.map(sintomas => (<li>{sintomas.sintoma}</li>))}</ol>}*/}

                        <td id="modificarEliminarTablaFila-AdministrarSintomas">

                            <button id="botonModificar-AdministrarSintomas" type="button" class="btn btn-success" onClick={() => { reiniciarSetearDatos(elemento) }} title="Modificar sintoma" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarSintomas">
                                <i id="iconoModificar-AdministrarSintomas" class="fas fa-cog"></i>
                            </button>

                            <button id="botonEliminar-AdministrarSintomas" type="button" class="btn btn-success" onClick={() => { reiniciarSetearDatos(elemento) }} title="Eliminar sintoma" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarSintomas">
                                <i id="iconoEliminar-AdministrarSintomas" class="fas fa-times-circle"></i>
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
                componenteListarSintomas = sintomas.map(elemento => (
                    <tr>
                        <th id="sintomaTablaFila-AdministrarSintomas" scope="row">{elemento.sintoma}</th>
                        <td id="tipoDepresionTablaFila-AdministrarSintomas">{<ol>{elemento.depresion_types.map(tipoDepresion => (<li>{tipoDepresion.tipo_depresion}</li>))}</ol>}</td>{/*{<ol>{elemento.symptoms.map(sintomas => (<li>{sintomas.sintoma}</li>))}</ol>}*/}
                    </tr>
                ))

            } else { //Campos vacios
                setRespuestaServidor(408);
            }
        }

    } else if (codigo == "listarSintomas") { //Se listan los sintomas en modificar pregunta

        componenteListarTiposDepresion = tipoDepresion.map(elemento => (
            <tr>
                <td scope="row">{elemento.tipo_depresion}</td>
                <td id="columnaCheckbox-AgregarSintomas">
                    <input id="checkbox-AgregarSintomas" class="form-check-input" type="checkbox" onChange={(e) => handleCheckboxChange(e, elemento)}></input>
                </td>
            </tr>
        ))

    }

    const listarSintomas = async (event) => {

        event.preventDefault();
        //console.log("Entre al listarUsuarios");
        setCodigo("listar");

        setRespuestaServidor("");
        consultarSintomas();


    }

    function setearDatos(elemento) {
        setEditarSintoma(elemento);
        setId(elemento.id);
        setRespuestaServidor("");
    }

    function cargarTiposDepresionModificar() {//Se devuelven los sintomas a los que se les hace click y se muestran en textarea

        try {

            return tipoDepresionMensaje.map(elemento => (elemento));

        } catch (error) {
            return "Error!"
        }
    }

    function reiniciarSetearDatos(elemento) {

        setearDatos(elemento); //Se guardan los valores originales a modificar
        setSintomaOriginal(elemento); //Se guardan los valores originales

        //Se reinician los datos guardados en el textarea
        setTipoDepresionId([]);
        setTipoDepresionMensaje([]);
    }

    switch (respuestaServidor) {

        case 200:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarSintomas">Sintoma modificado correctamente, recargue para ver cambios.</h5>

            break;

        case 201:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarSintomas">Sintoma creado correctamente, recargue para ver cambios.</h5>
            break;

        case 204:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarSintomas">Sintoma eliminado correctamente, recargue para ver cambios.</h5>
            break;

        case 207:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarSintomas">No se realizaron modificaciones en el sintoma.</h5>
            break;

        case 401:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarSintomas">Ocurrio un error, debe iniciar sesión.</h5> //Si no tiene token asignado
            break;

        case 403:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarSintomas">Ocurrio un error, debe iniciar sesión.</h5> //Si se vence el token
            break;

        case 404:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarSintomas">No se a encontrado el sintoma, detalle más la busqueda.</h5>
            break;

        case 408:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarSintomas">Por favor llene todos los campos.</h5>
            break;

        case 500:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarSintomas">Un error a sucedido, intente de nuevo.</h5>
            break;

        default:
            componenteMensajeTabla = null;
            break;
    }

    return (

        <div id="fondo-AdministrarSintomas">

            <div id="cabeceraAdministrarPreguntas-AdministrarSintomas">

                <div id="cajaNombreOpcion-AdministrarSintomas">

                    {componenteNombreOpcion}

                </div>

                <div id="busqueda">

                    <form id="formato" onSubmit={filtrarSintoma}>

                        <select class="form-select" onChange={handleDropdownChangeFiltrar} name="categoria" title="Seleccione categoria para buscar palabra" >

                            <option selected >Seleccione Categoria...</option> {/*disabled*/}
                            <option value="sintoma">Sintoma</option>

                        </select>

                        <input id="filtrar" type="text" className="form-control" onChange={handleInputChangeFiltrar} name="inputFiltro" placeholder="¿Busca algo puntual?" title="Ingrese valor a buscar" />

                        <button id="enviarBuscar-Plataforma" type="submit" className="btn btn-success" title="Buscar" >
                            <i class="fas fa-search"></i>
                        </button>

                    </form>
                </div>


                <div id="cajaAgregarAdministrarSintomas-AdministrarSintomas">

                    {componenteAgregarSintoma}

                </div>

            </div>

            <form id="formato" onSubmit={listarSintomas}>

                <div id="cajaTabla-AdministrarSintomas">

                    <div id="cajaCabecera-AdministrarSintomas">

                        <div id="cajaMensajeRespuesta-AdministrarSintomas">
                            {componenteMensajeTabla}
                        </div>
                        <div id="cajaBotonRecargar-AdministrarSintomas">
                            <button id="botonRecargar-AdministrarSintomas" type='submit' className="btn btn-success" title='Recargar tabla'><i class="fas fa-redo"></i></button>
                        </div>
                    </div>

                    <table id="tabla-AdministrarSintomas" class="table table-bordered">
                        <thead> {/*Cabeceras*/}
                            <tr>
                                <th id="sintomaTablaCabecera-AdministrarSintomas" scope="col" title="Sintomas ligados a tipo depresión">Sintoma</th>
                                <th id="tipoDepresionTablaCabecera-AdministrarSintomas" scope="col" title="Clasificación depresión">Tipo Depresión</th>

                                {/*Columna para agregar o elimina*/}
                                {componenteCabeceraModificarEliminar}
                            </tr>
                        </thead>
                        <tbody> {/*Filas*/}

                            {componenteListarSintomas}

                        </tbody>
                    </table>
                </div>
            </form>
            {/*Modal para el botón de Eliminar AdministrarUsuarios*/}
            <form className="row" onSubmit={eliminarSintoma}>
                <div class="modal fade" id="modalEliminar-AdministrarSintomas" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">

                                <h5 class="modal-title" id="modalLabelEliminar-AdministrarSintomas">

                                    <i class="fas fa-exclamation-triangle"></i>
                                    <label >Advertencia</label>

                                </h5>
                            </div>
                            <div class="modal-body">

                                <label>¿Realmente desea eliminar el sintoma "{editarSintoma.sintoma}" ?</label>
                                <label id="labelRevertirCambios-AdministrarSintomas">Los cambios no se podrán revertir.</label>

                            </div>
                            <div class="modal-footer">

                                <button type="button" id="botonModalCancelar-AdministrarSintomas" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa a sintomas">Cancelar</button>
                                <button type="submit" id="botonModalEliminar-AdministrarSintomas" class="btn btn-primary" data-bs-dismiss="modal" title="Eliminar sintoma">Eliminar</button>

                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/*Modal para el botón de Modificar AdministrarUsuarios*/}
            <form className="row" onSubmit={modificarSintoma}>
                <div class="modal fade" id="modalModificar-AdministrarSintomas" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">

                                <h5 class="modal-title" id="modalLabelModificar-AdministrarSintomas">

                                    <i class="fas fa-cog"></i>
                                    <label >Modificar Sintomas</label>

                                </h5>
                            </div>
                            <div class="modal-body">

                                <div id="labelSintomaModificar-AdministrarSintomas">

                                    <label>Sintoma</label>

                                </div>

                                <div className="input-group">
                                    <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-address-card"></i></div>
                                    <input id="" type="text" className="form-control" value={editarSintoma.sintoma} placeholder="Ingrese el sintoma" onChange={handleInputChangeModificar} name="sintoma" title="Sintoma a modificar" />

                                </div>

                                <br />

                                {/*Sección AdministrarUsuarios*/}

                                <div id="labelTipoDepresionModificar-AdministrarSintomas">

                                    <label>Seleccione el/los tipos de depresión</label>

                                </div>

                                <div className="input-group">
                                    <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-font"></i></div> {/*editarPregunta.symptoms.map(elemento => (elemento.sintoma))*/}
                                    <textarea class="form-control" placeholder="Seleccione el/los tipos de depresión" readonly="readonly" value={cargarTiposDepresionModificar()} onChange={handleInputChangeModificar} title="Tipos depresión seleccionados"></textarea>
                                </div>

                                <br />

                                {/*Sección Descripción*/}

                                <div id="cajaTablaModificar-AdministrarSintomas">

                                    <div id="cajaBotonRecargarModificar-AdministrarSintomas">

                                        <button id="botonRecargarModificar-AdministrarSintomas" type='button' onClick={() => cargarTiposDepresion()} className="btn btn-success" title='Recargar tabla'><i class="fas fa-redo"></i></button>

                                    </div>
                                    <table id="tablaTiposDepresion-AdministrarSintomas" class="table table-bordered">

                                        <thead> {/*Cabeceras*/}
                                            <tr>
                                                <th id="tipoDepresionTablaCabeceraModificar-AdministrarSintomas" scope="col" title="Tipo Depresión">Tipo Depresión</th>
                                                <th id="seleccionTablaCabeceraModificar-AdministrarSintomas" scope="col" title="Selecciones">Elegir</th>

                                            </tr>
                                            {componenteListarTiposDepresion}

                                        </thead>
                                    </table>
                                </div>

                            </div>
                            <div class="modal-footer">

                                <button type="button" id="botonModalCancelar-AdministrarSintomas" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa a sintomas">Cancelar</button>
                                <button type="submit" id="botonModalModificar-AdministrarSintomas" class="btn btn-primary" data-bs-dismiss="modal" title="Modificar sintoma">Modificar</button>

                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    );
}

export default Sintomas;