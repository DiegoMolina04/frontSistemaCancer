import '../css/Preguntas.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'
import { Link } from "react-router-dom";
import React, { Fragment, useState, useContext } from 'react';
import { Redirect } from "react-router-dom";
/*import { Link } from "react-router-dom";*/
import { UserContext } from "../context/UserContext.js";


function Preguntas() {

    const { respuestaServidor, setRespuestaServidor } = useContext(UserContext);
    const { token, setToken } = useContext(UserContext);
    const { es_admin, setEs_admin } = useContext(UserContext); //Se verifica si se debe o no mostrar componentes para el usuario
    /*console.log("Renderizado !);*/
    /*    const userData = [{}]*/

    const [pregunta, setPregunta] = useState([]); //Se guardan todos los usuarios
    const [codigo, setCodigo] = useState(null); //Se guarda identificador si se trata del boton para listar o filtrar
    const [filtro, setFiltro] = useState([]); //Se guarda la opción del dropdown y lo ingresado en el input

    const [editarPregunta, setEditarPregunta] = useState({
        pregunta: "",
        symptoms: { "": "" }
    });

    const [rol, setRol] = useState(null);

    console.log("El estado ! " + rol);
    console.log("Contenido del filtro " + JSON.stringify(filtro));

    const [id, setId] = useState({
        id: ''
    });

    let componenteListarPreguntas = null;

    let componenteAgregarPregunta = null;

    let componenteMensajeTabla = null;

    let componenteFiltro = null;

    let componenteNombreOpcion = null;

    let componenteCabeceraModificarEliminar = null;

    console.log("El token es " + token);

    /*let componenteMensajeModal = null;*/

    /*Se verifica si es admin para mostrar los componentes necesarios de este rol*/
    if (es_admin == true) { /*Si es admin*/

        componenteNombreOpcion = <p>Administrar Preguntas</p>
        componenteAgregarPregunta = <div><label id="labelAgregarPregunta-AdministrarPreguntas">
            ¿Desea agregar una nueva pregunta?
        </label>
            <Link to='/agregarpregunta' >
                {/* <button id="agregarPregunta-AdministrarPreguntas" type="button" className="btn btn-success" title="Agregar un nuevo usuario" data-bs-toggle="modal" data-bs-target="#modalAgregarAdministrarUsuarios-AdministrarUsuarios"> */}
                <button id="agregarPregunta-AdministrarPreguntas" type="button" className="btn btn-success" title="Agregar nueva pregunta">
                    <i class="fas fa-plus-circle"></i>
                    Agregar Pregunta
                </button>
            </Link>
        </div>

        componenteCabeceraModificarEliminar = <th id="modificarEliminarTablaCabecera-AdministrarPreguntas" scope="col" title="Modificar/Eliminar preguntas">Modificar/Eliminar</th>

    } else { /*Si no lo es*/

        componenteNombreOpcion = <p>Preguntas</p>
    }

    const handleInputChangeModificar = (event) => { //Para guardar los datos ingresados en el modificar
        console.log(event.target.name)
        console.log(event.target.value)
        setEditarPregunta({
            ...editarPregunta,
            [event.target.name]: event.target.value
        })

    }

    const handleRadioChangeModificar = (event) => { //Para guardar el tipo de usuario seleccionado en el modificar

        //console.log("Este es el valor de la seleccion " + event.currentTarget.value);
        /*const es_admin = event.currentTarget.value === 'true' ? true: false;*/

        /*setEs_Admin(event.currentTarget.value === true ? true : false);*/

        if (event.currentTarget.value === "true") {
            //console.log("Entre al true");
            setRol(true);
            //console.log("Este es el estado setteado " + rol);
        } else if (event.currentTarget.value === "false") {
            //console.log("Entre al false");
            setRol(false);
            //console.log("Este es el estado setteado " + rol);
        }

    }

    const handleInputChangeFiltrar = (event) => { //Para guardar los datos ingresados en el filtrar
        /*console.log(event.target.name)
        console.log(event.target.value)*/
        setFiltro({
            ...filtro,
            [event.target.name]: event.target.value
        })

    }

    const handleDropdownChangeFiltrar = (event) => { //Para guardar la categoria seleccionada en el filtrar
        /*console.log(event.target.name)
        console.log(event.target.value)
        console.log("Este es el valor de la seleccion " + event.currentTarget.value);*/

        const categoria = event.currentTarget.value;
        setFiltro({
            ...filtro,
            categoria
        })

    }

    async function consultarPreguntas() {
        setRespuestaServidor("");
        const data = await fetch("https://secure-brushlands-86892.herokuapp.com/v1/questions/get-all", {
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
            setPregunta(respuesta.result.items);
        }
    }

    const modificarUsuario = async (event) => {

        event.preventDefault();
        setRespuestaServidor("");

        if (editarPregunta.pregunta != "") {

            let datos = {
                pregunta: editarPregunta.pregunta
            };


            /*JSON.stringify(datos);*/
            //console.log(datos);

            const url = "https://secure-brushlands-86892.herokuapp.com/v1/questions/" + id + "/update-one";

            //console.log("Este es el usuario " + editarUsuario.email + " | el id " + editarUsuario.id + " | el rol " + rol);


            const data = await fetch(url, {
                method: "PUT",
                mode: "cors",
                headers: {

                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(datos)
            })
            /*console.log(JSON.stringify(datos));*/

            /*console.log("Creado correctamente");
            
            console.log("El correo es "+correo);*/

            const respuesta = await data.json();

            //console.log("Este es el status " + respuesta.status);
            /*setCorreo();*/

            if (respuesta.status === undefined) { //Si el correo ya existe -> Error 404
                //console.log("Es indefinido");
                setRespuestaServidor(respuesta.code);
                //console.log(respuesta.code);
            } else { //Si es diferente
                setRespuestaServidor(respuesta.status);
            }

            /*setRespuestaServidor(respuesta.status);*/

            //setRespuestaServidor(respuesta);

            /*setRespuestaServidor(respuesta);*/

            //setToken("Correcto");

            /*console.log(respuestaServidor);*/
            /*console.log("Esta es la respuesta "+JSON.stringify(respuestaServidor, null, 2));*/

            /*console.log("Estos son los datos correctos "+JSON.stringify(datos));*/
            /*editarUsuario.cedula != "" || editarUsuario.nombre != "" || editarUsuario.email != "" || */

            //console.log("Correcto");
            setRol(null);


        } else if (editarPregunta.cedula == "" || editarPregunta.nombre == "" || editarPregunta.email == "" || rol == null) { /*Se verifica que no existan campos vacios*/

            //setToken("Campos vacios");
            /*console.log(respuestaServidor);*/

            /*console.log("Estos son los datos erroneos "+datos);*/

            //console.log("Campos vacios");
            setRespuestaServidor(408);
            setRol(null);

        } else { /*Si las contraseñas son distintas*/

            /*console.log("Entre");*/
            /*setRespuestaServidor("Incorrecto");*/
            //setToken("Incorrecto");

            /*console.log(respuestaServidor);*/
            //console.log("Existe otro error");
        }

    }

    const filtrarPregunta = async (event) => {

        event.preventDefault();
        setRespuestaServidor("");
        setCodigo("");

        const url = "https://secure-brushlands-86892.herokuapp.com/v1/questions/get-all?pregunta=" + filtro.inputFiltro;//+ 

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
        //console.log(respuesta.status);
        console.log("Este es lo de filtrar pregunta");
        console.log(JSON.stringify(respuesta));
        /*console.log(respuesta);*/
        /*setRespuestaServidor(respuesta);
        setCodigo("filtrar");*/
        console.log("Esta es la respuesta");
        console.log();
        if (respuesta.code == 401) {
            setRespuestaServidor(401);
        } else if ((respuesta.result.items).length == 0) { /*Si no se tiene nada en el array del get*/
            console.log("Vector vacio");
            console.log(pregunta);
            setRespuestaServidor(404);
        } else {
            setPregunta(respuesta.result.items);
            setCodigo("filtrar");
        }


    }

    const eliminarUsuario = async (event) => {

        event.preventDefault();

        //console.log(editarUsuario.id);

        const url = "https://secure-brushlands-86892.herokuapp.com/v1/questions/" + id + "/delete-one";

        //console.log(url);

        //console.log("Este es el usuario " + editarUsuario.email + " | el id " + editarUsuario.id + " | el rol " + rol);

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
            componenteListarPreguntas = pregunta.map(elemento => (
                <tr>
                    <th id="preguntaTablaFila-AdministrarPreguntas" scope="row">{elemento.pregunta}</th>
                    <td id="sintomaTablaFila-AdministrarPreguntas">{<ol>{elemento.symptoms.map(sintomas => (<li>{sintomas.sintoma}</li>))}</ol>}</td> {/*elemento.symptoms*/}
                    {/*elemento.es_admin = null*/}
                    <td id="modificarEliminarTablaFila-AdministrarPreguntas">

                        <button id="botonModificar-AdministrarPreguntas" type="button" class="btn btn-success" onClick={() => { setearDatos(elemento) }} title="Modificar termino" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarPreguntas">
                            <i id="iconoModificar-AdministrarPreguntas" class="fas fa-cog"></i>
                        </button>

                        <button id="botonEliminar-AdministrarPreguntas" type="button" class="btn btn-success" onClick={() => { setearDatos(elemento) }} title="Eliminar termino" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarPreguntas">
                            <i id="iconoEliminar-AdministrarPreguntas" class="fas fa-times-circle"></i>
                        </button>

                    </td>
                </tr>
            ))
        } else { /*Si codigo == listar y rol = usuario, se muestra tabla sin botones de modificar y eliminar*/
            componenteListarPreguntas = pregunta.map(elemento => (
                <tr>
                    <th id="preguntaTablaFila-AdministrarPreguntas" scope="row">{elemento.pregunta}</th>
                    <td id="sintomaTablaFila-AdministrarPreguntas">{<ol>{elemento.symptoms.map(sintomas => (<li>{sintomas.sintoma}</li>))}</ol>}</td> {/*elemento.symptoms*/}
                </tr>
            ))
        }
    } else if (codigo == "filtrar") {

        if (es_admin == true) {/*Si codigo == filtrar y rol = admin, se muestra tabla con botones de modificar y eliminar*/

            console.log("Esto es lo del filtrar");
            console.log(filtro);
            if (filtro.categoria !== undefined && filtro.categoria !== "Seleccione Categoria..." && filtro.inputFiltro != undefined && filtro.inputFiltro !== "") {
                console.log("Entre al filtro");
                console.log(pregunta);
                componenteListarPreguntas = pregunta.map(elemento => (
                    <tr>
                        <th id="preguntaTablaFila-AdministrarPreguntas" scope="row">{elemento.pregunta}</th>
                        <td id="sintomaTablaFila-AdministrarPreguntas">{<ol>{elemento.symptoms.map(sintomas => (<li>{sintomas.sintoma}</li>))}</ol>}</td>

                        <td id="modificarEliminarTablaFila-AdministrarPreguntas">

                            <button id="botonModificar-AdministrarPreguntas" type="button" class="btn btn-success" onClick={() => { setearDatos(elemento) }} title="Modificar termino" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarPreguntas">
                                <i id="iconoModificar-AdministrarPreguntas" class="fas fa-cog"></i>
                            </button>

                            <button id="botonEliminar-AdministrarPreguntas" type="button" class="btn btn-success" onClick={() => { setearDatos(elemento) }} title="Eliminar termino" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarPreguntas">
                                <i id="iconoEliminar-AdministrarPreguntas" class="fas fa-times-circle"></i>
                            </button>

                        </td>
                    </tr>
                ))

            } else { //Campos vacios
                setRespuestaServidor(408);
            }

        } else {/*Si codigo == filtrar y rol = usuario, se muestra tabla sin botones de modificar y eliminar*/
            console.log("Esto es lo del filtrar");
            console.log(filtro);
            if (filtro.categoria !== undefined && filtro.categoria !== "Seleccione Categoria..." && filtro.inputFiltro != undefined && filtro.inputFiltro !== "") {
                console.log("Entre al filtro");
                console.log(pregunta);
                componenteListarPreguntas = pregunta.map(elemento => (
                    <tr>
                        <th id="preguntaTablaFila-AdministrarPreguntas" scope="row">{elemento.pregunta}</th>
                        <td id="sintomaTablaFila-AdministrarPreguntas">{<ol>{elemento.symptoms.map(sintomas => (<li>{sintomas.sintoma}</li>))}</ol>}</td>
                    </tr>
                ))

            } else { //Campos vacios
                setRespuestaServidor(408);
            }
        }

    }


    /*Mensaje para el usuario en cabecera de la tabla*/
    /*if(respuestaServidor === 201){
        componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarPreguntas">Usuario creado correctamente</h5>

    }else if(respuestaServidor === "Usuario modificado"){
        componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarPreguntas">Usuario modificado correctamente</h5>
    }*/

    const listarUsuarios = async (event) => {

        event.preventDefault();
        console.log("Entre al listarUsuarios");
        setCodigo("listar");
        //console.log("Este es el valor del form "+event.currentTarget.value);

        setRespuestaServidor("");
        consultarPreguntas();


    }

    const filtrarUsuarios = async (event) => {
        event.preventDefault();
        console.log("Entre al filtrarUsuarios");
        setCodigo("filtrar");
        //console.log("Este es el valor del form "+event.currentTarget.value);

        setRespuestaServidor("");
        consultarPreguntas();
    }

    function setearDatos(elemento) {
        setEditarPregunta(elemento);
        setId(elemento.id);
        setRespuestaServidor("");
    }

    function cargarSintomasModificar() {

        try {
            return editarPregunta.symptoms.map(elemento => (elemento.sintoma))

        } catch (error) {
            return "Error!"
        }
    }

    switch (respuestaServidor) {

        case 200:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarPreguntas">Pregunta modificada correctamente, recargue para ver cambios.</h5>

            break;

        case 201:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarPreguntas">Pregunta creada correctamente, recargue para ver cambios.</h5>
            break;

        case 204:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarPreguntas">Pregunta eliminada correctamente, recargue para ver cambios.</h5>
            break;

        case 401:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarPreguntas">Ocurrio un error, debe iniciar sesión.</h5>
            break;

        case 404:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarPreguntas">No se a encontrado la pregunta, detalle más la busqueda.</h5>
            break;

        case 408:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarPreguntas">Por favor llene todos los campos.</h5>
            break;

        case 500:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarPreguntas">El correo/cedula ya esta registrado.</h5>
            break;

        default:
            componenteMensajeTabla = null;
            break;
    }

    return (

        <div id="fondo-AdministrarPreguntas">

            <div id="cabeceraAdministrarPreguntas-AdministrarPreguntas">

                <div id="cajaNombreOpcion-AdministrarPreguntas">

                    {/*<p>Administrar Preguntas</p>*/}
                    {componenteNombreOpcion}

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

                {/*<div id="cajaLabelAdministrarUsuarioss-AdministrarUsuarios">
                    <label>Administrar Usuarios</label>
                </div>*/}


                <div id="cajaAgregarAdministrarPreguntas-AdministrarPreguntas">

                    {componenteAgregarPregunta}

                </div>

            </div>

            <form id="formato" onSubmit={listarUsuarios}> {/*listarUsuarios*/}

                <div id="cajaTabla-AdministrarPreguntas">

                    <div id="cajaCabecera-AdministrarPreguntas">

                        <div id="cajaMensajeRespuesta-AdministrarPreguntas">
                            {componenteMensajeTabla}
                        </div>
                        <div id="cajaBotonRecargar-AdministrarPreguntas">
                            <button id="botonRecargar-AdministrarPreguntas" type='submit' className="btn btn-success" title='Recargar tabla'><i class="fas fa-redo"></i></button>
                        </div>
                    </div>

                    <table id="tabla-AdministrarPreguntas" class="table table-bordered">
                        <thead> {/*Cabeceras*/}
                            <tr>
                                <th id="preguntaTablaCabecera-AdministrarPreguntas" scope="col" title="Preguntas del sistema">Pregunta</th>
                                <th id="sintomaTablaCabecera-AdministrarPreguntas" scope="col" title="Sintomas ligados a preguntas">Sintoma</th>
                                {/*<th id="correoTablaCabecera-AdministrarUsuarios" scope="col" title="Correo del usuario">Correo</th>
                                <th id="rolTablaCabecera-AdministrarUsuarios" scope="col" title="Tipo de cuenta de usuario">Tipo De Cuenta</th>*/}

                                {/*Columna para agregar o elimina*/}
                                {componenteCabeceraModificarEliminar}
                            </tr>
                        </thead>
                        <tbody> {/*Filas*/}
                            {/*usuario.map(elemento=>(
                            <tr>
                                <th id="preguntaTablaFila-AdministrarPreguntas" scope="row">{elemento.cedula}</th>
                                <td id="sintomaTablaFila-AdministrarPreguntas">{elemento.nombre}</td>
                                <td id="modificarEliminarTablaFila-AdministrarPreguntas">

                                    <button id="botonModificar-AdministrarPreguntas" type="button" class="btn btn-success" title="Modificar termino" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarPreguntas">
                                        <i id="iconoModificar-AdministrarPreguntas" class="fas fa-cog"></i>
                                    </button>
                                    
                                    <button id="botonEliminar-AdministrarPreguntas" type="button" class="btn btn-success" title="Eliminar termino" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarPreguntas">
                                        <i id="iconoEliminar-AdministrarPreguntas" class="fas fa-times-circle"></i>
                                    </button>

                                </td>
                            </tr>
                    ))*/}

                            {componenteListarPreguntas}

                        </tbody>
                    </table>
                </div>
            </form>
            {/*Modal para el botón de Eliminar AdministrarUsuarios*/}
            <form className="row" onSubmit={eliminarUsuario}>
                <div class="modal fade" id="modalEliminar-AdministrarPreguntas" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">

                                <h5 class="modal-title" id="modalLabelEliminar-AdministrarPreguntas">

                                    <i class="fas fa-exclamation-triangle"></i>
                                    <label >Advertencia</label>

                                </h5>
                                {/*<button type="button" class="btn-close" data-bs-dismiss="modal" title="Regresar a administrador de usuarios"></button>*/}
                            </div>
                            <div class="modal-body">

                                <label>¿Realmente desea eliminar la pregunta "{editarPregunta.pregunta}" ?</label>
                                <label id="labelRevertirCambios-AdministrarPreguntas">Los cambios no se podrán revertir.</label>

                            </div>
                            <div class="modal-footer">

                                <button type="button" id="botonModalCancelar-AdministrarPreguntas" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa a administrar preguntas">Cancelar</button>
                                <button type="submit" id="botonModalEliminar-AdministrarPreguntas" class="btn btn-primary" data-bs-dismiss="modal" title="Eliminar pregunta">Eliminar</button>

                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/*Modal para el botón de Modificar AdministrarUsuarios*/}
            <form className="row" onSubmit={modificarUsuario}>
                <div class="modal fade" id="modalModificar-AdministrarPreguntas" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">

                                <h5 class="modal-title" id="modalLabelModificar-AdministrarUsuarios">

                                    <i class="fas fa-cog"></i>
                                    <label >Modificar Pregunta</label>

                                </h5>
                                {/*<button type="button" class="btn-close" data-bs-dismiss="modal" title="Regresar a administrar usuarios"></button>*/}
                            </div>
                            <div class="modal-body">


                                {/*Sección Cedula*/}
                                {/*componenteMensajeModal*/}
                                
                                <div id="labelPreguntaModificar-AdministrarPreguntas">

                                    <label>Pregunta</label>

                                </div>

                                <div className="input-group">
                                    <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-address-card"></i></div>
                                    <input id="" type="text" className="form-control" value={editarPregunta.pregunta} placeholder="Ingrese la pregunta" onChange={handleInputChangeModificar} name="pregunta" title="Pregunta a modificar" />

                                </div>

                                <br />

                                {/*Sección AdministrarUsuarios*/}

                                <div id="labelSintomaModificar-AdministrarPreguntas">

                                    <label>Sintoma</label>

                                </div>

                                <div className="input-group">
                                    <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-font"></i></div> {/*editarPregunta.symptoms.map(elemento => (elemento.sintoma))*/}
                                    <input id="" type="text" className="form-control" value={cargarSintomasModificar()} placeholder="Seleccione sintomas" onChange={handleInputChangeModificar} name="nombre" title="Sintomas seleccionados" readonly="readonly"/>
                                </div>

                                <br />

                                {/*Sección Descripción*/}
                                <div id="cajaTablaModificar-AdministrarPreguntas">

                                    <div id="cajaBotonRecargarModificar-AdministrarPreguntas">
                                        <button id="botonRecargarModificar-AdministrarPreguntas" type='submit' className="btn btn-success" title='Recargar tabla'><i class="fas fa-redo"></i></button>
                                    </div>
                                    <table id="tablaSintomas-AdministrarPreguntas" class="table table-bordered">

                                        <thead> {/*Cabeceras*/}
                                            <tr>
                                                <th id="sintomaTablaCabeceraModificar-AdministrarPreguntas" scope="col" title="Sintomas">Sintoma</th>
                                                <th id="seleccionTablaCabeceraModificar-AdministrarPreguntas" scope="col" title="Selecciones">Elegir</th>
                                                {/*<th id="correoTablaCabecera-AdministrarUsuarios" scope="col" title="Correo del usuario">Correo</th>
                                <th id="rolTablaCabecera-AdministrarUsuarios" scope="col" title="Tipo de cuenta de usuario">Tipo De Cuenta</th>*/}

                                                {/*Columna para agregar o elimina*/}
                                                {/*<tr>
                                                <th id="preguntaTablaFila-AdministrarPreguntas" scope="row">{elemento.pregunta}</th>
                                                <td id="sintomaTablaFila-AdministrarPreguntas">{<ol>{elemento.symptoms.map(sintomas => (<li>{sintomas.sintoma}</li>))}</ol>}</td>
                                                
                                                <td id="modificarEliminarTablaFila-AdministrarPreguntas">

                                                    <button id="botonModificar-AdministrarPreguntas" type="button" class="btn btn-success" onClick={() => { setearDatos(elemento) }} title="Modificar termino" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarPreguntas">
                                                        <i id="iconoModificar-AdministrarPreguntas" class="fas fa-cog"></i>
                                                    </button>

                                                    <button id="botonEliminar-AdministrarPreguntas" type="button" class="btn btn-success" onClick={() => { setearDatos(elemento) }} title="Eliminar termino" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarPreguntas">
                                                        <i id="iconoEliminar-AdministrarPreguntas" class="fas fa-times-circle"></i>
                                                    </button>

                                                </td>
                                            </tr>*/}

                                            </tr>
                                            <tr>
                                                <td scope="row">Estado de ánimo irritable o bajo la mayoría de las veces.</td>
                                                <td id="columnaCheckbox-AdministrarPreguntas"><input class="form-check-input" type="checkbox" id="checkbox-AdministrarPreguntas"></input></td>
                                                
                                            </tr>
                                            <tr>
                                            <td scope="row">Dificultad para conciliar el sueño o exceso de sueño.</td>
                                                <td id="columnaCheckbox-AdministrarPreguntas"><input class="form-check-input" type="checkbox" id="checkbox-AdministrarPreguntas"></input></td>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>

                            </div>
                            <div class="modal-footer">

                                <button type="button" id="botonModalCancelar-AdministrarPreguntas" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa a administrar usuarios">Cancelar</button>
                                <button type="submit" id="botonModalModificar-AdministrarPreguntas" class="btn btn-primary" data-bs-dismiss="modal" title="Modificar usuario">Modificar</button>

                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    );
}
export default Preguntas;