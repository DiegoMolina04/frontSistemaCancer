import '../../css/AdministrarUsuarios.css';
import '../../css/fontawesome-free-5.15.4-web/css/all.css'
import { Link } from "react-router-dom";
import React, { Fragment, useState, useContext } from 'react';
import { Redirect } from "react-router-dom";
/*import { Link } from "react-router-dom";*/
import { UserContext } from "../../../../src/capaNegocio/context/UserContext.js";
import useChange from './useChange';
import useAdministrarUsuarios from '../../../capaNegocio/logicaNegocio/useAdministrarUsuarios';
import verificarNumeros from '../../../capaNegocio/logicaNegocio/LogicaComun/verificarNumeros';

import ComponenteTabla from './ComponenteTabla';

function AdministrarUsuarios() {

    const { respuestaServidor, setRespuestaServidor } = useContext(UserContext);
    const { token, setToken } = useContext(UserContext);
    const { datosGuardados, setDatosGuardados } = useContext(UserContext);
    const { datosOriginales, setDatosOriginales } = useContext(UserContext);
    const { filtro, setFiltro } = useContext(UserContext);
    

    //const [usuario, setUsuario] = useState([]); //Se guardan todos los usuarios
    const [codigo, setCodigo] = useState(null); //Se guarda identificador si se trata del boton para listar o filtrar
    //const [filtro, setFiltro] = useState([]); //Se guarda la opción del dropdown y lo ingresado en el input


    const { handleInputChangeModificar, handleFiltrarChange } = useChange();
    const { listarUsuarios, componenteListarUsuarios, componenteMostrarMensaje, editarUsuario, modificarUsuario, eliminarUsuario } = useAdministrarUsuarios();

    /*const [editarUsuario, setEditarUsuario] = useState({
        cedula: "",
        nombre: "",
        email: "",
        es_admin: ''
    });*/

    //const [rol, setRol] = useState(null);

    //console.log("El estado ! " + rol);
    console.log("Contenido del filtro " + JSON.stringify(filtro));

    const [correo, setCorreo] = useState({
        email: ''

    });

    //let componenteListarUsuarios = null;
    //let componenteListarUsuarios = <>{usuario}</>;

    let componenteAgregarUsuario = null;

    //let componenteMensajeTabla = null;
    //let componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarUsuario">{mostrarMensaje}</h5>;

    let componenteFiltro = null;

    console.log("El token es " + token);

    /*let componenteMensajeModal = null;*/

    //const handleInputChangeModificar = (event) => { //Para guardar los datos ingresados en el modificar
    //console.log(event.target.name)
    //console.log(event.target.value)
    //setEditarUsuario({
    //    ...editarUsuario,
    //    [event.target.name]: event.target.value
    //})

    //}

    // const handleRadioChangeModificar = (event) => { //Para guardar el tipo de usuario seleccionado en el modificar

    //     //console.log("Este es el valor de la seleccion " + event.currentTarget.value);
    //     /*const es_admin = event.currentTarget.value === 'true' ? true: false;*/

    //     /*setEs_Admin(event.currentTarget.value === true ? true : false);*/

    //     if (event.currentTarget.value === "true") {
    //         //console.log("Entre al true");
    //         setRol(true);
    //         //console.log("Este es el estado setteado " + rol);
    //     } else if (event.currentTarget.value === "false") {
    //         //console.log("Entre al false");
    //         setRol(false);
    //         //console.log("Este es el estado setteado " + rol);
    //     }

    // }

    const handleInputChangeFiltrar = (event) => { //Para guardar los datos ingresados en el filtrar
        /*console.log(event.target.name)
        console.log(event.target.value)*/
        setFiltro({
            ...filtro,
            [event.target.name]: event.target.value
        })

    }

    //const handleDropdownChangeFiltrar = (event) => { //Para guardar la categoria seleccionada en el filtrar
        //console.log(event.target.name)
        //console.log(event.target.value)
        //console.log("Este es el valor de la seleccion " + event.currentTarget.value);

        //const categoria = event.currentTarget.value;
        //setFiltro({
        //    ...filtro,
        //    categoria
        //})

    //}

    async function consultarUsuarios() {

        const data = await fetch("https://secure-brushlands-86892.herokuapp.com/v1/users/get-all", {
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
            //setUsuario(respuesta.result.items);
        }
    }

    // const modificarUsuario = async (event) => {

    //     event.preventDefault();
    //     setRespuestaServidor("");
    //     /*console.log("Entre al boton");
    //     console.log("Estos son los datos del boton " + JSON.stringify(editarUsuario));*/
    //     //console.log("Datos del radio button "+JSON.stringify(datos));
    //     /*let excluirClave = editarUsuario.filter(datosUsuario => datosUsuario.clave);
    //     console.log("Estos son los datos modificados "+JSON.stringify(excluirClave));*/
    //     /*let jsonObj = JSON.parse(editarUsuario);*/

    //     /*delete editarUsuario.contraseña;
    //     delete editarUsuario.es_admin;*/

    //     //console.log("Estos son los datos modificados " + JSON.stringify(editarUsuario));

    //     if (editarUsuario.cedula != "" && editarUsuario.nombre != "" && editarUsuario.email != "" && rol != null) {

    //         let datos = {
    //             cedula: editarUsuario.cedula,
    //             nombre: editarUsuario.nombre,
    //             email: editarUsuario.email,
    //             es_admin: rol
    //         };


    //         /*JSON.stringify(datos);*/
    //         //console.log(datos);

    //         const url = "https://secure-brushlands-86892.herokuapp.com/v1/users/" + correo + "/update-one";

    //         //console.log("Este es el usuario " + editarUsuario.email + " | el id " + editarUsuario.id + " | el rol " + rol);


    //         const data = await fetch(url, {
    //             method: "PUT",
    //             mode: "cors",
    //             headers: {

    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(datos)
    //         })
    //         /*console.log(JSON.stringify(datos));*/

    //         /*console.log("Creado correctamente");

    //         console.log("El correo es "+correo);*/

    //         const respuesta = await data.json();

    //         //console.log("Este es el status " + respuesta.status);
    //         /*setCorreo();*/

    //         if (respuesta.status === undefined) { //Si el correo ya existe -> Error 404
    //             //console.log("Es indefinido");
    //             setRespuestaServidor(respuesta.code);
    //             //console.log(respuesta.code);
    //         } else { //Si es diferente
    //             setRespuestaServidor(respuesta.status);
    //         }

    //         /*setRespuestaServidor(respuesta.status);*/

    //         //setRespuestaServidor(respuesta);

    //         /*setRespuestaServidor(respuesta);*/

    //         //setToken("Correcto");

    //         /*console.log(respuestaServidor);*/
    //         /*console.log("Esta es la respuesta "+JSON.stringify(respuestaServidor, null, 2));*/

    //         /*console.log("Estos son los datos correctos "+JSON.stringify(datos));*/
    //         /*editarUsuario.cedula != "" || editarUsuario.nombre != "" || editarUsuario.email != "" || */

    //         //console.log("Correcto");
    //         setRol(null);


    //     } else if (editarUsuario.cedula == "" || editarUsuario.nombre == "" || editarUsuario.email == "" || rol == null) { /*Se verifica que no existan campos vacios*/

    //         //setToken("Campos vacios");
    //         /*console.log(respuestaServidor);*/

    //         /*console.log("Estos son los datos erroneos "+datos);*/

    //         //console.log("Campos vacios");
    //         setRespuestaServidor(408);
    //         setRol(null);

    //     } else { /*Si las contraseñas son distintas*/

    //         /*console.log("Entre");*/
    //         /*setRespuestaServidor("Incorrecto");*/
    //         //setToken("Incorrecto");

    //         /*console.log(respuestaServidor);*/
    //         //console.log("Existe otro error");
    //     }

    // }

    /*const eliminarUsuario = async (event) => {

        event.preventDefault();

        //console.log(editarUsuario.id);

        const url = "https://secure-brushlands-86892.herokuapp.com/v1/users/" + editarUsuario.id + "/delete-one";

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

    }*/

    const aux = true;
    /*Es admin ?*/
    if (aux == true) {
        componenteAgregarUsuario = <div><label id="labelAgregarAdministrarUsuarios-AdministrarUsuarios">
            ¿Desea agregar un nuevo usuario?
        </label>
            <Link to='/agregarusuario' >
                {/* <button id="agregarAdministrarUsuarios-AdministrarUsuarios" type="button" className="btn btn-success" title="Agregar un nuevo usuario" data-bs-toggle="modal" data-bs-target="#modalAgregarAdministrarUsuarios-AdministrarUsuarios"> */}
                <button id="agregarAdministrarUsuarios-AdministrarUsuarios" type="button" className="btn btn-success" title="Agregar un nuevo usuario">
                    <i class="fas fa-plus-circle"></i>
                    Agregar Usuario
                </button>
            </Link>
        </div>

    } else {

    }

    /*console.log("Este es el elemento a editar: " + JSON.stringify(editarUsuario));*/

    /*Si no se tiene nada en el array del get*/
    /*if (usuario.length == 0) {
        console.log(usuario);
        //componente = <div>Entre al if</div>
    } else {
        console.log(usuario);

        if (codigo == "listar") {
            componenteListarUsuarios = usuario.map(elemento => (
                <tr>
                    <th id="cedulaTablaFila-AdministrarUsuarios" scope="row">{elemento.cedula}</th>
                    <td id="nombreUsuarioTablaFila-AdministrarUsuarios">{elemento.nombre}</td>
                    <td id="correoTablaFila-AdministrarUsuarios">{elemento.email}</td>
                    <td id="rolTablaFila-AdministrarUsuarios">{elemento.es_admin === true ? "Admin" : "Usuario"}</td>
                    
                    <td id="modificarEliminarTablaFila-AdministrarUsuarios">

                        <button id="botonModificar-AdministrarUsuarios" type="button" class="btn btn-success" onClick={() => { setearDatos(elemento) }} title="Modificar termino" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarUsuarios">
                            <i id="iconoModificar-AdministrarUsuarios" class="fas fa-cog"></i>
                        </button>

                        <button id="botonEliminar-AdministrarUsuarios" type="button" class="btn btn-success" onClick={() => { setearDatos(elemento) }} title="Eliminar termino" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarUsuarios">
                            <i id="iconoEliminar-AdministrarUsuarios" class="fas fa-times-circle"></i>
                        </button>

                    </td>
                </tr>
            ))
        } else if (codigo == "filtrar") {

            //undefined
            //Se verifican que campos no esten vacios
            if (filtro.categoria !== undefined && filtro.categoria !== "Seleccione Categoria..." && filtro.inputFiltro !== undefined && filtro.inputFiltro !== "") {

                switch (filtro.categoria) {
                    case "cedula":
                        //const cedulaBuscar = filtro.inputFiltro;
                        //console.log("El valor de la cedula "+cedulaBuscar);
                        let filtroCedula = usuario.filter(user => user.cedula == filtro.inputFiltro);
                        console.log("Este es el filtro " + JSON.stringify(filtroCedula));
                        if (filtroCedula == "") {
                            componenteFiltro = "cedula";
                            setRespuestaServidor(404);
                        } else {
                            componenteMensajeTabla = null;
                            setRespuestaServidor(null);
                            componenteListarUsuarios = filtroCedula.map(elemento => (
                                <tr>
                                    <th id="cedulaTablaFila-AdministrarUsuarios" scope="row">{elemento.cedula}</th>
                                    <td id="nombreUsuarioTablaFila-AdministrarUsuarios">{elemento.nombre}</td>
                                    <td id="correoTablaFila-AdministrarUsuarios">{elemento.email}</td>
                                    <td id="rolTablaFila-AdministrarUsuarios">{elemento.es_admin === true ? "Admin" : "Usuario"}</td>
                                    
                                    <td id="modificarEliminarTablaFila-AdministrarUsuarios">

                                        <button id="botonModificar-AdministrarUsuarios" type="button" class="btn btn-success" onClick={() => { setearDatos(elemento) }} title="Modificar termino" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarUsuarios">
                                            <i id="iconoModificar-AdministrarUsuarios" class="fas fa-cog"></i>
                                        </button>

                                        <button id="botonEliminar-AdministrarUsuarios" type="button" class="btn btn-success" onClick={() => { setearDatos(elemento) }} title="Eliminar termino" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarUsuarios">
                                            <i id="iconoEliminar-AdministrarUsuarios" class="fas fa-times-circle"></i>
                                        </button>

                                    </td>
                                </tr>
                            ))
                        }

                        break;

                    case "nombre":

                        let filtroNombre = usuario.filter(user => user.nombre.toLowerCase() == filtro.inputFiltro.toLowerCase());
                        //console.log("Este es el filtro "+JSON.stringify(filtroCedula));
                        if (filtroNombre == "") {
                            componenteFiltro = "nombre";
                            setRespuestaServidor(404);
                        } else {
                            componenteMensajeTabla = null;
                            setRespuestaServidor(null);
                            componenteListarUsuarios = filtroNombre.map(elemento => (
                                <tr>
                                    <th id="cedulaTablaFila-AdministrarUsuarios" scope="row">{elemento.cedula}</th>
                                    <td id="nombreUsuarioTablaFila-AdministrarUsuarios">{elemento.nombre}</td>
                                    <td id="correoTablaFila-AdministrarUsuarios">{elemento.email}</td>
                                    <td id="rolTablaFila-AdministrarUsuarios">{elemento.es_admin === true ? "Admin" : "Usuario"}</td>
                                    
                                    <td id="modificarEliminarTablaFila-AdministrarUsuarios">

                                        <button id="botonModificar-AdministrarUsuarios" type="button" class="btn btn-success" onClick={() => { setearDatos(elemento) }} title="Modificar termino" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarUsuarios">
                                            <i id="iconoModificar-AdministrarUsuarios" class="fas fa-cog"></i>
                                        </button>

                                        <button id="botonEliminar-AdministrarUsuarios" type="button" class="btn btn-success" onClick={() => { setearDatos(elemento) }} title="Eliminar termino" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarUsuarios">
                                            <i id="iconoEliminar-AdministrarUsuarios" class="fas fa-times-circle"></i>
                                        </button>

                                    </td>
                                </tr>
                            ))
                        }

                        break;

                    case "correo":
                        let filtroCorreo = usuario.filter(user => user.email === filtro.inputFiltro);
                        //console.log("Este es el filtro "+JSON.stringify(filtroCedula));
                        console.log(usuario.correo);
                        if (filtroCorreo == "") {
                            componenteFiltro = "correo";
                            setRespuestaServidor(404);
                        } else {
                            componenteMensajeTabla = null;
                            setRespuestaServidor(null);
                            componenteListarUsuarios = filtroCorreo.map(elemento => (
                                <tr>
                                    <th id="cedulaTablaFila-AdministrarUsuarios" scope="row">{elemento.cedula}</th>
                                    <td id="nombreUsuarioTablaFila-AdministrarUsuarios">{elemento.nombre}</td>
                                    <td id="correoTablaFila-AdministrarUsuarios">{elemento.email}</td>
                                    <td id="rolTablaFila-AdministrarUsuarios">{elemento.es_admin === true ? "Admin" : "Usuario"}</td>
                                    
                                    <td id="modificarEliminarTablaFila-AdministrarUsuarios">

                                        <button id="botonModificar-AdministrarUsuarios" type="button" class="btn btn-success" onClick={() => { setearDatos(elemento) }} title="Modificar termino" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarUsuarios">
                                            <i id="iconoModificar-AdministrarUsuarios" class="fas fa-cog"></i>
                                        </button>

                                        <button id="botonEliminar-AdministrarUsuarios" type="button" class="btn btn-success" onClick={() => { setearDatos(elemento) }} title="Eliminar termino" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarUsuarios">
                                            <i id="iconoEliminar-AdministrarUsuarios" class="fas fa-times-circle"></i>
                                        </button>

                                    </td>
                                </tr>
                            ))
                        }
                        break;
                }

            } else { //Campos vacios
                setRespuestaServidor(408);
            }
        }

    }*/

    /*Mensaje para el usuario en cabecera de la tabla*/
    /*if(respuestaServidor === 201){
        componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarUsuario">Usuario creado correctamente</h5>

    }else if(respuestaServidor === "Usuario modificado"){
        componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarUsuario">Usuario modificado correctamente</h5>
    }*/

    /*const listarUsuarios = async (event) => {

        event.preventDefault();
        console.log("Entre al listarUsuarios");
        setCodigo("listar");
        //console.log("Este es el valor del form "+event.currentTarget.value);

        setRespuestaServidor("");
        consultarUsuarios();


    }*/

    const filtrarUsuarios = async (event) => {
        event.preventDefault();
        console.log("Entre al filtrarUsuarios");
        setCodigo("filtrar");
        //console.log("Este es el valor del form "+event.currentTarget.value);

        setRespuestaServidor("");
        consultarUsuarios();
    }

    function setearDatos(elemento) {
        //setEditarUsuario(elemento);
        setCorreo(elemento.email);
        setRespuestaServidor("");
    }

    /*switch (respuestaServidor) {

        case 200:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarUsuario">Usuario modificado correctamente, recargue para ver cambios.</h5>

            break;

        case 201:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarUsuario">Usuario creado correctamente, recargue para ver cambios.</h5>
            break;

        case 204:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarUsuario">Usuario eliminado correctamente, recargue para ver cambios.</h5>
            break;

        case 401:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarUsuario">Ocurrio un error, debe iniciar sesión.</h5>
            break;

        case 404:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarUsuario">No se a encontrado usuario por {componenteFiltro}, detalle más la busqueda.</h5>
            break;

        case 408:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarUsuario">Por favor llene todos los campos.</h5>
            break;

        case 500:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarUsuario">El correo/cedula ya esta registrado.</h5>
            break;

        default:
            componenteMensajeTabla = null;
            break;
    }*/

    return (

        <div id="fondo-AdministrarUsuarios">

            <div id="cabeceraAdministrarUsuarios-AdministrarUsuarios">

                <div id="cajaNombreOpcion-AdministrarUsuarios">

                    <label>Administrar Usuarios</label>

                </div>

                <div id="busqueda">

                    <form id="formato" onSubmit={(e) => listarUsuarios(e, "filtrar", filtro)}>

                        <select class="form-select" onChange={handleFiltrarChange} name="categoria" title="Seleccione categoria para buscar palabra" >

                            {/*<option selected >Seleccione Categoria...</option>
                            <option value="cedula">Cedula</option>
                            <option value="nombre">Nombre Completo</option>
                            <option value="correo">Correo</option>*/}

                            <option selected >Seleccione Categoria...</option>
                            <option value="correo">Correo</option>
                            <option value="cuenta">Tipo Cuenta</option>

                        </select>

                        {/*<input type="text" placeholder="¿Busca algo puntual?" title="Ingrese la palabra a buscar"/>*/}
                        <input id="filtrar" type="text" className="form-control" onChange={handleFiltrarChange} name="inputFiltro" placeholder="¿Busca algo puntual?" title="Ingrese valor a buscar" />

                        {/*<Link to='/plataforma/buscar'></Link>*/}
                        <button id="enviarBuscar-Plataforma" type="submit" className="btn btn-success" title="Buscar" >
                            <i class="fas fa-search"></i>
                        </button>

                    </form>
                </div>

                {/*<div id="cajaLabelAdministrarUsuarioss-AdministrarUsuarios">
                    <label>Administrar Usuarios</label>
                </div>*/}


                <div id="cajaAgregarAdministrarUsuarios-AdministrarUsuarios">

                    {componenteAgregarUsuario}
                    {/*<label id="labelAgregarAdministrarUsuarios-AdministrarUsuarios">
                        ¿Desea agregar un nuevo usuario?
                    </label>

                    <Link to='/agregarusuario' >
                    {/* <button id="agregarAdministrarUsuarios-AdministrarUsuarios" type="button" className="btn btn-success" title="Agregar un nuevo usuario" data-bs-toggle="modal" data-bs-target="#modalAgregarAdministrarUsuarios-AdministrarUsuarios"> }
                    <button id="agregarAdministrarUsuarios-AdministrarUsuarios" type="button" className="btn btn-success" title="Agregar un nuevo usuario">
                        <i class="fas fa-plus-circle"></i>
                         Agregar Usuario
                    </button>
                    </Link>*/}

                </div>

            </div>

            {/*<tr>
                            <th id="cedulaTablaFila-AdministrarUsuarios" scope="row">1026307314</th>
                            <td id="nombreUsuarioTablaFila-AdministrarUsuarios">Diego Andres Molina Romero</td>
                            <td id="correoTablaFila-AdministrarUsuarios">dmolinarome@uniminuto.edu.co</td>
                            <td id="rolTablaFila-AdministrarUsuarios">Administrador</td>
                            //Fila para los botones modificar o eliminar regla
                            <td id="modificarEliminarTablaFila-AdministrarUsuarios">

                                <button id="botonModificar-AdministrarUsuarios" type="button" class="btn btn-success" title="Modificar termino" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarUsuarios">
                                    <i id="iconoModificar-AdministrarUsuarios" class="fas fa-cog"></i>
                                </button>
                                
                                <button id="botonEliminar-AdministrarUsuarios" type="button" class="btn btn-success" title="Eliminar termino" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarUsuarios">
                                    <i id="iconoEliminar-AdministrarUsuarios" class="fas fa-times-circle"></i>
                                </button>

                            </td>
            </tr>*/}

            <form id="formato" onSubmit={(e) => listarUsuarios(e, "listar")}> {/*listarUsuarios*/}

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
                                <th id="cedulaTablaCabecera-AdministrarUsuarios" scope="col" title="Cedula del usuario">Cedula</th>
                                <th id="nombreUsuarioTablaCabecera-AdministrarUsuarios" scope="col" title="Nombre del usuario">Nombre Usuario</th>
                                <th id="correoTablaCabecera-AdministrarUsuarios" scope="col" title="Correo del usuario">Correo</th>
                                <th id="rolTablaCabecera-AdministrarUsuarios" scope="col" title="Tipo de cuenta de usuario">Tipo De Cuenta</th>

                                {/*Columna para agregar o elimina*/}
                                <th id="modificarEliminarTablaCabecera-AdministrarUsuarios" scope="col" title="Modificar/Eliminar el usuario">Modificar/Eliminar</th>
                            </tr>
                        </thead>
                        <tbody> {/*Filas*/}
                            {/*usuario.map(elemento=>(
                            <tr>
                                <th id="cedulaTablaFila-AdministrarUsuarios" scope="row">{elemento.cedula}</th>
                                <td id="nombreUsuarioTablaFila-AdministrarUsuarios">{elemento.nombre}</td>
                                <td id="correoTablaFila-AdministrarUsuarios">{elemento.email}</td>
                                <td id="rolTablaFila-AdministrarUsuarios">{elemento.es_admin}</td>
                                <td id="modificarEliminarTablaFila-AdministrarUsuarios">

                                    <button id="botonModificar-AdministrarUsuarios" type="button" class="btn btn-success" title="Modificar termino" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarUsuarios">
                                        <i id="iconoModificar-AdministrarUsuarios" class="fas fa-cog"></i>
                                    </button>
                                    
                                    <button id="botonEliminar-AdministrarUsuarios" type="button" class="btn btn-success" title="Eliminar termino" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarUsuarios">
                                        <i id="iconoEliminar-AdministrarUsuarios" class="fas fa-times-circle"></i>
                                    </button>

                                </td>
                            </tr>
                    ))*/}

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
                                {/*<button type="button" class="btn-close" data-bs-dismiss="modal" title="Regresar a administrador de usuarios"></button>*/}
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
                                {/*<button type="button" class="btn-close" data-bs-dismiss="modal" title="Regresar a administrar usuarios"></button>*/}
                            </div>
                            <div class="modal-body">


                                {/*Sección Cedula*/}
                                {/*componenteMensajeModal*/}
                                <br />
                                <div id="labelCedulaAgregarAdministrarUsuarios-AdministrarUsuarios">

                                    <label>Cedula del usuario</label>

                                </div>

                                <div className="input-group">
                                    <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-address-card"></i></div> {/*value={editarUsuario.cedula}*/}
                                    <input id="" type="text" className="form-control" value={datosGuardados.cedula} placeholder="Ingrese la cedula del usuario" onChange={handleInputChangeModificar}
                                        onKeyDown={verificarNumeros} name="cedula" title="Ingrese cedula"/>


                                </div>

                                <br />

                                {/*Sección AdministrarUsuarios*/}

                                <div id="labelAdministrarUsuariosAgregarAdministrarUsuarios-AdministrarUsuarios">

                                    <label>Nombre Usuario</label>

                                </div>

                                <div className="input-group">
                                    <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-font"></i></div>
                                    <input id="" type="text" className="form-control" value={datosGuardados.nombre} placeholder="Ingrese el nombre de usuario completo" onChange={handleInputChangeModificar} name="nombre" title="Nuevo usuario"/>
                                </div>

                                <br />

                                {/*Sección Descripción*/}

                                <div id="labelcorreoAgregarAdministrarUsuarios-AdministrarUsuarios">
                                    <label>Correo</label>
                                </div>

                                <div className="input-group">

                                    <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-envelope"></i></div>

                                    <input id="" type="email" className="form-control" value={datosGuardados.email} placeholder="Ingrese el correo" onChange={handleInputChangeModificar} name="email" title="Nuevo correo"/>


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